var purchasedGood = require('./models/todo');
var UserModel = require('./models/user.js');
var UserProfileModel = require('./models/userProfile.js');

var requestify = require('requestify');
var logincontroller=require('./controllers/account.js');


function getPurchased(res){
    purchasedGood.find(function(err, purchased) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(purchased); // return all todos in JSON format
		});
};

function signInUser(req,res){
var signInUser=req.body;
    console.log(signInUser.username);

    UserModel.findOne({ userName: signInUser.username }, function(err, selectedUser) {
        if (err) {

            throw err
        };

        if(selectedUser!=null && selectedUser.passwordHash==signInUser.password){
            req.session.regenerate(function(){


                req.session.user = selectedUser;

            });
        console.log(req.session)
            console.log(req.session.user)

            res.json(signInUser);

}else{

    var passwordMissMatchError = new Error('user name or password does not match') ;
    console.log('passwordMissMatchError')
    //throw passwordMissMatchError
    res.status(401);
    res.json(passwordMissMatchError);
}

    });

}
function registerUser(user,res){

var newUser=new UserModel({
    email: user.email,
    userName:user.username,
    passwordHash: user.password,// todo hash it
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
            userId:userId
        });

        newUserProfile.save(function(err) {
            if (err) {
             res.send(err);
             return res;
            }
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
        signInUser(req,res);

	});

	app.post('/api/register', function(req, res) {
		console.log('serverside login')
        registerUser(req.body,res)	;	
	});



	app.get('/api/purchased', function(req, res) {

		// use mongoose to get all todos in the database
		getPurchased(res);
	});

	// create todo and send back all todos after creation

	app.post('/api/purchased', function(req, res) {
		// create a todo, information comes from AJAX request from Angular
        purchasedGood.create({
			text : req.body.text,
			amount: req.body.amount,
			purchasedDate:req.body.date
			
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