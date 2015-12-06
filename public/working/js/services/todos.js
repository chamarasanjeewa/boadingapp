angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('todoService', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/purchased');
			},
			create : function(todoData) {
				return $http.post('/api/purchased', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/purchased/' + id);
			}
		}
	}]);