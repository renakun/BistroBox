angular.module('starter', ['ionic','ngIOS9UIWebViewPatch','starter.controllers','starter.services','starter.directives'])

.run(function($ionicPlatform, $rootScope, $window, $ionicLoading, $ionicPopup, Settings) {
  Parse.initialize(Settings.parse_app_id, Settings.parse_js_key);
  console.log(Settings.parse_app_id, Settings.parse_js_key)
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    // document.addEventListener("deviceready", function() {
    // try {
    // Parse Push notification initialization using your Application ID and your Client Key.
    parsePlugin.initialize(Settings.parse_app_id, Settings.parse_client_key, function() {
      console.log(Settings.parse_app_id, Settings.parse_client_key)
      parsePlugin.subscribe('Everybody', function() {
        parsePlugin.getInstallationId(function(id) {
          console.log("parsePlugin.getInstallationId: " + id);
        }, function(error) {
            console.error('parsePlugin.getInstallationId error: ' + error);
        });
      }, function(error) {
        console.error('parsePlugin.subscribe error: ' + error);
      });
    }, function(error) {
      console.error('parsePlugin.initialize error: ' + error);
    });
    parsePlugin.registerCallback('onNotification', function() {
      window.onNotification = function(pnObj) {
        parsePlugin.resetBadge();
        if (pnObj.receivedInForeground === false) {
          $state.go(pnObj.goto);
        }
      };
    }, function(error) {
      console.error(error);
    });
    // alert("it works!");
    // console.log(alert)
    //   } catch (ex) {
    //     alert("ERROR: "+ex);
    //   }
    // }, false);
  });

  $rootScope.show = function(text) {
    $rootScope.loading = $ionicLoading.show({
      template: text ? text : 'Loading...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 500,
      showDelay: 0
    });
  };
  $rootScope.hide = function() {
    $ionicLoading.hide();
  };
  $rootScope.longnotify = function(text) {
    $rootScope.show(text);
    $window.setTimeout(function() {
      $rootScope.hide();
    }, 2999);
  };
  $rootScope.quicknotify = function(text) {
    $rootScope.show(text);
    $window.setTimeout(function() {
      $rootScope.hide();
    }, 999);
  };
  $rootScope.confirm = function(title,text) {
    var confirmPopup = $ionicPopup.confirm({
       title: title,
       template: text
    });
    return confirmPopup;
  };
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  .state('app.catalog', {
    url: '/catalog',
    views: {
      'menuContent' :{
        templateUrl: "templates/catalog.html",
        controller: 'CatalogController'
      }
    }
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent' :{
        templateUrl: "templates/catalog.html",
        controller: 'SearchController'
      }
    }
  })
  .state('app.category', {
    url: "/category/:categoryId",
    views: {
      'menuContent': {
        templateUrl: "templates/category.html",
        controller: 'CategoryController'
      }
    }
  })
  .state('app.checkout',{
    url: '/checkout',
    views: {
      'menuContent' :{
        templateUrl: "templates/checkout.html",
        controller: 'CheckoutController'
      }
    }
  })
  .state('app.forgot', {
    url: '/forgot',
    views: {
      'menuContent': {
        templateUrl: 'templates/forgotPassword.html',
        controller: 'ForgotPasswordController'
      }
    }
  });
  // .state('app.login', {
  //   url: '/login',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/login.html',
  //       controller: 'LoginController'
  //     }
  //   }
  // });
  $urlRouterProvider.otherwise('/app/catalog');
});
