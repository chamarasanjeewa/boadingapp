
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

        return $http.post('/api/login', signInData);

      },

        IsUserNameAvailable:function(userName) {
            return $http.post('/api/userNameExists',{userName:userName});

        },

       register:function(registerData) {

        return $http.post('/api/register', registerData);

      }
    }
  }


