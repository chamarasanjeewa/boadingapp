(function () {
    'use strict';
angular.module('boadingBudgetApp').controller('purchasedListController',purchasedListController);
purchasedListController.$inject = ['$scope','$state','PurchaseService'];

function purchasedListController($scope,$state,PurchaseService) {
    $scope.loading = true;
$scope.totalSum=0;
    // GET =====================================================================
    // when landing on the page, get all purchased items and show them
    // use the service to get all the todos
   

     var getPurchased=function(){


  PurchaseService.get()
     .success(function(data) {
       $scope.itemList = data;
        $scope.loading = false;
             $scope.totalSum = Object.keys($scope.itemList).map(function(k){
                 return +$scope.itemList[k].amount;
             }).reduce(function(a,b){ return a + b },0);
            
      });

     }

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    getPurchased();
  
  };

  })();

