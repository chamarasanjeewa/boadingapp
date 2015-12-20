//(function () {
//    'use strict';
//angular.module('boadingBudgetApp').controller('purchasedListController',purchasedListController);
//purchasedListController.$inject = ['$scope','$state','PurchaseService'];
//
//function purchasedListController($scope,$state,PurchaseService) {
//
//    $scope.loading = true;
//    $scope.totalSum=0;
//
//    PurchaseService.get()
//     .success(function(data) {
//       $scope.itemList = data;
//        $scope.loading = false;
//             $scope.totalSum = Object.keys($scope.itemList).map(function(k){
//                 return +$scope.itemList[k].amount;
//             }).reduce(function(a,b){ return a + b },0);
//
//      });
//
//     }
//
//
//
//  })();
//
