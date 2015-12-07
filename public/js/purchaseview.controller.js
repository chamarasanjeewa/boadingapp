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