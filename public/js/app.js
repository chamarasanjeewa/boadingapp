angular.module('boadingBudgetApp', ['ionic','ngMessages']);

 angular.module('boadingBudgetApp').config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider)
   {
$stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
    })
    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html'
    })
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'templates/home.html',
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.list', {
      url: '/list',
      views: {
        'home-tab': {
          templateUrl: 'templates/purchasedList.html',
          controller: 'purchasedListController'
        }
      }
    })
    .state('tabs.facts', {
      url: '/facts',
      views: {
        'home-tab': {
          templateUrl: 'templates/facts.html'
        }
      }
    })
    .state('tabs.facts2', {
      url: '/facts2',
      views: {
        'home-tab': {
          templateUrl: 'templates/facts2.html'
        }
      }
    })
    .state('tabs.about', {
      url: '/about',
      views: {
        'about-tab': {
          templateUrl: 'templates/about.html'
        }
      }
    })
    .state('tabs.navstack', {
      url: '/navstack',
      views: {
        'about-tab': {
          templateUrl: 'templates/nav-stack.html'
        }
      }
    })
    .state('tabs.contact', {
      url: '/contact',
      views: {
        'contact-tab': {
          templateUrl: 'templates/contact.html'
        }
      }
    });


   $urlRouterProvider.otherwise('/register');
}





 ]);

angular.module('boadingBudgetApp').directive('usernameAvailable', function($timeout, $q,PurchaseService) {
    return {
        restrict: 'AE',
        require: 'ngModel',
        link: function(scope, elm, attr, model) {
            model.$asyncValidators.usernameExists = function() {

                return PurchaseService.IsUserNameAvailable(model.$viewValue).then(function(result){
                    $timeout(function(){
                        model.$setValidity('usernameExists', !!result.data);
                    }, 1000);
                });

            };
        }
    }
});
