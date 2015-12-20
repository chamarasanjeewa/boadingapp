(function () {
    'use strict';
angular.module('boadingBudgetApp').controller('HomeTabCtrl',HomeTabCtrl);
HomeTabCtrl.$inject = ['$scope','$state','PurchaseService'];

function HomeTabCtrl($scope,$state,PurchaseService) {
  $scope.formData = {};
    $scope.loading = false;
    $scope.formData.categoryId="1";
   // $scope.formData.categoryId=1;

    $scope.createPurchaseItem = function() {

			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				PurchaseService.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
                       $state.go("tabs.list");
					}).error(function(err){
                        $scope.loading = false;
                        console.log('error in saving data'+err)
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
    $scope.loading=false;
  $scope.signIn = function(user) {
      $scope.loading=true;
    PurchaseService.signIn(user)
			.success(function(data) {

				 $state.go('tabs.home');
            $scope.loading=false;
			}).error(function(data) {
            $scope.loginError="User name or password invalid or not connected to internet";
				console.log('unauthorized ')
            $scope.loading=false;
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
  $scope.loading=false;
  $scope.register = function(user) {
      $scope.loading=true;
    PurchaseService.register(user)
			.success(function(data) {

				$state.go('signin');
           $scope.loading=false;
			}).error(function(data) {
				console.log('error')
            $scope.loading=false;
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

    $scope.getPurchasedInfo=function(){
        PurchaseService.get()
            .success(function(data) {
                $scope.itemList = data;
                $scope.loading = false;
                $scope.totalSum = Object.keys($scope.itemList).map(function(k){
                    return +$scope.itemList[k].amount;
                }).reduce(function(a,b){ return a + b },0);

            });

    }

    $scope.$on('$ionicView.afterEnter', function(){

        $scope.getPurchasedInfo();

    });





}



  })();




