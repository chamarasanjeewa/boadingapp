(function () {
    'use strict';
angular.module('boadingBudgetApp').controller('HomeTabCtrl',HomeTabCtrl);
HomeTabCtrl.$inject = ['$scope','$state','PurchaseService'];

function HomeTabCtrl($scope,$state,PurchaseService) {
  $scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		PurchaseService.get()
			.success(function(data) {
				$scope.itemList = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createPurchaseItem = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				PurchaseService.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
					//	$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.itemList = data; // assign our new list of todos
						
            $state.go("tabs.list");
					});
			}
		};
	};
})();

(function () {
    'use strict';
angular.module('boadingBudgetApp').controller('SignInCtrl',SignInCtrl);
SignInCtrl.$inject = ['$scope','$state','PurchaseService'];

function SignInCtrl($scope, $state,PurchaseService) {
  $scope.loginError=null;
  $scope.signIn = function(user) {

    PurchaseService.signIn(user)
			.success(function(data) {
				 $state.go('tabs.home');
			}).error(function(data) {
            $scope.loginError="User name or password invalid or not connected to internet";
				console.log('unauthorized ')
			});

  };

  $scope.register = function(user) {
    PurchaseService.register(user)
			.success(function(data) {
				 $state.go('tabs.home');
			}).error(function(data) {

			});

  };
  
};
})();

(function () {
    'use strict';
angular.module('boadingBudgetApp').controller('RegisterCtrl',RegisterCtrl);
RegisterCtrl.$inject = ['$scope','$state','PurchaseService'];

function RegisterCtrl($scope, $state,PurchaseService) {
  
  $scope.register = function(user) {

    PurchaseService.register(user)
			.success(function(data) {

				 $state.go('signin');
			}).error(function(data) {
				console.log('error')
			});
   
  };
  
};
})();

(function () {
    'use strict';
angular.module('boadingBudgetApp').controller('purchasedListController',purchasedListController);
purchasedListController.$inject = ['$scope','$state','PurchaseService'];

function purchasedListController($scope,$state,PurchaseService) {
    $scope.loading = true;
$scope.totalSum=0;
    // GET =====================================================================
    // when landing on the page, get all todos and show them
    // use the service to get all the todos
     PurchaseService.get()
     .success(function(data) {
        
       $scope.itemList = data;
        $scope.loading = false;
             $scope.totalSum = Object.keys($scope.itemList).map(function(k){
                 return +$scope.itemList[k].amount;
             }).reduce(function(a,b){ return a + b },0);
             debugger;
      });

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    
  
  };

  })();




