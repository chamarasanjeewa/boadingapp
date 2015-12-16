
angular.module('boadingBudgetApp').factory('PurchaseService',PurchaseService);
PurchaseService.$inject = ['$http'];
function PurchaseService($http) {
    return {
      get : function() {
        return $http.get('/api/purchased');
      },
      create : function(todoData) {
        return $http.post('/api/purchased', todoData);
        //ret return $http.post('/api/purchased', todoData);

      },
      delete : function(id) {
        return $http.delete('/api/purchased/' + id);
      },
      signIn:function(signInData) {
          debugger;
        return $http.post('/api/login', signInData);

      },

       register:function(registerData) {
           debugger;
        return $http.post('/api/register', registerData);

      }
    }
  }


