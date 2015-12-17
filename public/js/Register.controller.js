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
