(function () {
    'use strict';
angular.module('boadingBudgetApp').factory('PurchaseService',PurchaseService);
PurchaseService.$inject = ['$http'];
var apiUrl='https://bmann.herokuapp.com';
apiUrl='http://localhost:8080';

function PurchaseService($http) {
    return {
      get : function() {
        return $http.get('/api/purchased');
      },
      create : function(todoData) {
        return $http.post(apiUrl+'/api/purchased', todoData);
        //ret return $http.post('/api/purchased', todoData);

      },
      delete : function(id) {
        return $http.delete(apiUrl+'/api/purchased/' + id);
      },
      signIn:function(signInData) {

        return $http.post(apiUrl+'/api/login', signInData);

      },

        IsUserNameAvailable:function(userName) {
            return $http.post(apiUrl+'/api/userNameExists',{userName:userName});

        },

       register:function(registerData) {

        return $http.post(apiUrl+'/api/register', registerData);

      }
    }
  }
})();



