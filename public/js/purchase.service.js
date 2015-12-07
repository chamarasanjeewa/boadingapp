
angular.module('boadingBudgetApp').factory('PurchaseService',PurchaseService);
PurchaseService.$inject = ['$http'];
function PurchaseService($http) {
    return {
      get : function() {
        return $http.get('/api/purchased');
      },
      create : function(todoData) {
        return $http.post('/api/sendMessage', todoData);
      },
      delete : function(id) {
        return $http.delete('/api/purchased/' + id);
      }
    }
  }