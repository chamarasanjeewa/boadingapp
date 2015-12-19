var purchasedGood = require('./models/todo');
var UserModel = require('./models/user.js');
var UserProfileModel = require('./models/userProfile.js');
//var nodemailer = require('nodemailer');
var passwordHash = require('password-hash');

var requestify = require('requestify');
var logincontroller=require('./controllers/account.js');


function getPurchased(res){

    purchasedGood.find({})
        .populate('userProfileId')
        .exec(function(error, purchasedItemList) {
            res.json(purchasedItemList);
            console.log(JSON.stringify(purchasedItemList, null, "\t"))
        })

};

function signInUser(req,res){

}


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'budgetmanagerapp@gmail.com',
            pass: 'budgetmanager1234'
        }
    }, {
        // default values for sendMail method
        from: 'chamara.sanjeewa@gmail.com',
        headers: {
            'My-Awesome-Header': '123'
        }
    });
    transporter.sendMail({
        to: 'chamara.sanjeewa@gmail.com',
        subject: 'hello',
        text: 'budgetmanager message'
    });

var mailOptions = {
    from: 'Budget manager <budgetmanagerapp@gmail.com.com>', // sender address
    to: 'chamara.sanjeewa@gmail.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Hello world</b>' // html body
};

var sendMail=function(to,subject,message){
var mailOptions = {
    from: 'Budget manager <budgetmanagerapp@gmail.com.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: message, // plaintext body
    html: '<b>'+message+'</b>' // html body
};

transporter.sendMail(mailOptions, function(error, info){
       if(error){
           return console.log(error);
        }
        console.log('Message sent: ' + info.response);
   });

}

function registerUser(user,res){
    console.log('username------'+user.username)
    
      console.log('password before hashing'+user.password);

    var hashedPassword = passwordHash.generate( user.password);
    console.log('hashed password'+hashedPassword);

var newUser=new UserModel({
    email: user.email,
    userName:user.username,
    passwordHash: hashedPassword,
    passwordSalt: 'dd'});

newUser.save(function(err) {
    console.log('log user'+newUser._id)
    if (err) {
       res.send(err);
        return;
    } else{
        registerUserProfile(newUser._id);
       // res.json(user);
    }

  console.log('User created!');
});

    function registerUserProfile(userId){
        console.log('inside register userprofile'+userId)
        var newUserProfile=new UserProfileModel({
            email: user.email,
            firstName: user.firstName,// todo hash it
            lastName: user.lastName,
            phoneNumber:user.phoneNumber,
            user:userId
        });

        newUserProfile.save(function(err) {
            if (err) {
             res.send(err);
             return res;
            }
            var subject="Welcome to B-Man"
var message="<p> B-man is your budget management solution.</p><p> With comprehensive features to automatically calculate
monthly budget, to take reports, to view as graphs and charts</p>";
            sendMail(newUserProfile.email,message)
            res.json(user);

            console.log('User profile created!');
        });


    }

}

var sendNotificationMessage=function(){

	console.log('purchse')
	requestify.get('http://smsc.vianett.no/V3/CPA/MT/MT.ashx?username=ktvgroup&password=sms7524&tel=+94712188862&msg=testbudgetmanager&msgid=1&SenderAddress=chamara&SenderAddressType=5')
  	.then(function(response) {
      // Get the response body (JSON parsed or jQuery object for XMLs)
     var response= response.getBody();
     console.log(response)
  });
	}


module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos

	app.post('/api/login', function(req, res) {
        console.log('serverside login')
        var signInUser=req.body;

        UserModel.findOne({ userName: signInUser.username })
            .exec(function(err, selectedUser) {
                if (err) {

                    throw err
                };
             
                if(selectedUser!=null){
console.log('signedd in user user password'+signInUser.password)
                  //var signedInuserHashedPassword= passwordHash.generate(signInUser.password);
                  var isVerified=passwordHash.verify(signInUser.password, selectedUser.passwordHash); // true
                  
                    if(isVerified){
                        UserProfileModel.findOne({user:selectedUser._id}).exec(function(error, selectedUserProfile) {
                            if (err) {
                                console.log('error retrieving user profile')

                                // throw err
                            };
                            console.log(signInUser.username);
                            req.session.username=signInUser.username;
                            req.session.firstName=selectedUserProfile.firstName;
                            console.log('selected userprofile'+selectedUserProfile)
                            req.session.userProfileId=selectedUserProfile._id;
                            console.log(  req.session.userProfileId);
                            console.log( req.session.firstName);

                            return res.json(signInUser);

                        })

                }
                else{

                    var passwordMissMatchError = new Error('user name or password does not match') ;
                    console.log('passwordMissMatchError')
                    //throw passwordMissMatchError
                    res.status(401);
                    return res.json(passwordMissMatchError);
                }
            }
            })

    });

	app.post('/api/register', function(req, res) {

		console.log('USER'+req.body.username)
        registerUser(req.body,res)	;
	});

	app.get('/api/purchased', function(req, res) {
        console.log('loginUserProfileId'+  req.session.userProfileId);
        console.log('login user first name'+ req.session.firstName);
		// use mongoose to get all todos in the database
		getPurchased(res);
	});

    app.post('/api/userNameExists', function(req, res) {

       var userName =req.body.userName;
        UserModel.findOne({userName: userName})
            .exec(function (err, selectedUser) {
                if (err) {
                    console.log('error finding username')
                    throw err
                }
                ;
                if (selectedUser == null) {
                    console.log('user exists-------'+true)

                    return res.json(true);
                } else {
                    console.log('user exists-------'+false)

                    return res.json(false);

                }

            });

    });

	// create todo and send back all todos after creation

	app.post('/api/purchased', function(req, res) {
		// create a todo, information comes from AJAX request from Angular
        purchasedGood.create({
			text : req.body.text,
			amount: req.body.amount,
			purchasedDate:req.body.date,
            userProfileId:req.session.userProfileId

		}, function(err, purchased) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getPurchased(res);
		});

	});

	// delete a todo
	app.delete('/api/purchased/:purchased_id', function(req, res) {
		purchased.remove({
			_id : req.params.purchased_id
		}, function(err, purchased) {
			if (err)
				res.send(err);

			getPurchased(res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};