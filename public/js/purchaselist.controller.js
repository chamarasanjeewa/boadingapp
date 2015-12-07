(function () {
    'use strict';
angular.module('boadingBudgetApp').controller('purchasedListController',purchasedListController);
purchasedListController.$inject = ['$scope','$state','PurchaseService'];

function purchasedListController($scope,$state,PurchaseService) {
  
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
    
  
  };

  })();

