angular.module('boadingBudgetApp').controller('SignInCtrl',SignInCtrl);
SignInCtrl.$inject = ['$scope','$state','PurchaseService'];

function SignInCtrl($scope, $state,PurchaseService) {
  $scope.loginError=null;
  $scope.signIn = function(user) {

    PurchaseService.signIn(user)
			.success(function(data) {
				 $state.go('tabs.home');
			}).error(function(data) {
            $scope.loginError="User name or password invalid";
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