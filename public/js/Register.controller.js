angular.module('boadingBudgetApp').controller('RegisterCtrl',RegisterCtrl);
RegisterCtrl.$inject = ['$scope','$state','PurchaseService'];

function RegisterCtrl($scope, $state,PurchaseService) {
  
  $scope.register = function(user) {
  	debugger;
    PurchaseService.register(user)
			.success(function(data) {
				debugger;
				 $state.go('tabs.home');
			}).error(function(data) {
				console.log('error')
			});
   
  };
  
};