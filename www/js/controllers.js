angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope,$rootScope,$ionicHistory,$ionicSideMenuDelegate,$state,cartService,categoryService,Search) {
  $scope.search = Search;
  $scope.doSearch = function() {
    cordova.plugins.Keyboard.close();
    $ionicSideMenuDelegate.toggleLeft();
    $ionicHistory.nextViewOptions({disableBack: true});
    $state.go('app.search', {}, {reload: true});
  }
  $rootScope.isLoggedIn = false;
  $scope.loginData = {};
  $scope.cartProducts = cartService.cartProducts;
  categoryService.loadMenuCategories()
  .then(function (menuCategories) {
    $scope.menucategories = menuCategories;
  });
})


.controller('ForgotPasswordController', function($scope,$rootScope,$state) {
  $scope.user = {};
  $scope.error = {};
  $scope.state = { success: false };
  $scope.reset = function() {
    $rootScope.show();
    Parse.User.requestPasswordReset($scope.user.email, {
      success: function() {
        $rootScope.hide();
        $scope.state.success = true;
      },
      error: function(error) {
        $rootScope.hide();
        $scope.error.message = error.message;
      }
    });
  };
  $scope.login = function() {
    $state.go('app.login');
  };
})

// .controller('signInCtrl', function($scope, $state, $cordovaFacebook){
//   $scope.data = {};
//   $scope.word = 'Hello'
//
//   $scope.signIn = function(){
//     $state.go('signIn')
//   };
//
//   $scope.logIn = function(){
//      Parse.User.logIn($scope.data.username, $scope.data.password, {
//       success: function(user) {
//         console.log(user);
//         $state.go('app.menu')
//       },
//       error: function(user, error) {
//         alert("error!");
//       }
//     });
//   };
//   $scope.loginFacebook = function(){
//
//   };
//   $scope.signupEmail = function(){
//     var user = new Parse.User();
//     user.set("firstName", userInfo.firstName);
//     user.set("lastName", userInfo.lastName);
//     user.set("addressLineOne", userInfo.addressLineOne);
//     user.set("addressLineTwo", userInfo.addressLineTwo);
//     user.set("city", userInfo.city);
//     user.set("state", userInfo.state);
//     // user.set("zipcode", userInfo.zipcode);
//     user.set("country", userInfo.country);
//
//     // other fields can be set just like with Parse.Object
//     user.set("somethingelse", "like this!");
//
//     user.signUp(null, {
//       success: function(user) {
//         // Hooray! Let them use the app now.
//         $state.go('app.catalog')
//       },
//       error: function(user, error) {
//         // Show the error message somewhere and let the user try again.
//         alert("Error: " + error.code + " " + error.message);
//       }
//     });
//   };
//   $scope.createAccount = function(){
//     $state.go('app.checkout')
//   };
// })


.controller('SearchController', function($scope,productService,Search) {
  $scope.Title = "Searching for " + Search.query;
  $scope.products = [];
  productService.searchProducts(Search.query)
  .then(function (results) {
    $scope.products = results;
  });
})


.controller('CatalogController', function($scope,categoryService,$stateParams) {
  $scope.Title = "Categories";
  // $scope.products = [];
  // productService.initProducts();
  // productService.loadAllProducts()
  // .then(function (results) {
  //   $scope.products = results;
  // });
  categoryService.loadMenuCategories()
  .then(function (menuCategories) {
    $scope.menucategories = menuCategories;
  });
})

.controller('CategoryController', function($scope,productService,categoryService,$stateParams,$state,$ionicModal,$ionicPopup) {
  categoryService.getCatName($stateParams.categoryId)
  .then(function (name) {
    $scope.Title = name;
  });
  $scope.products = [];
  productService.loadProducts($stateParams.categoryId)
  .then(function (results) {
    $scope.products = results;
    $scope.currentcatid = $stateParams.categoryId;
  });
  $ionicModal.fromTemplateUrl('templates/product-detail.html', {
      scope: $scope,
      // animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
  });
  $scope.openModal = function(item) {
      $scope.modal.show()
      console.log("product");
      $scope.product = linearSearch($scope.products, product.id)
      // $scope.quantity = 1;
      // $scope.total = $scope.product.myPrice;
  //
  //     $scope.getTotal = function(select, price){
  //       var total = parseInt(select) * price
  //       $scope.total = total
  //       return total;
      // }
    }
  // //
  // $scope.closeModal = function() {
  // //   resetQuantity()
  //   $scope.modal.hide();
  // };
  // $scope.$on('$destroy', function() {
  //   $scope.modal.remove();
  // });
  //
  // // $scope.plusOne = function(){
  // //   $scope.quantity += 1
  // // }
  // //
  // // $scope.minusOne = function(){
  // //   if ($scope.quantity > 1)
  // //     $scope.quantity -= 1
  // // }
  // //
  // // $scope.addToOrder = function(item){
  // //   var x = {
  // //     total: $scope.total,
  // //     quantity: $scope.quantity,
  // //     name: product.Name,
  // //     price: product.myPrice
  // //   };
  // //
  // //   var alertPopup = $ionicPopup.alert({
  // //      title: 'Added to your order!',
  // //      template: 'This will taste good'
  // //   });
  // //    alertPopup.then(function(res) {
  // //      BartService.addItem(x);
  // //       $scope.closeModal()
  // //    });
  // // };
  // // function resetQuantity() {
  // //   $scope.quantity = 1
  // // }
  // //
  // function linearSearch(arr,query){
  //   for (var i = 0; i <arr.length; i++){
  //     if(arr[i].id == query )
  //       return arr[i]
  //   }
  // };

})


.controller('CheckoutController', function($scope,cartService,userService) {
  $scope.cartProducts = cartService.cartProducts;

  $scope.userInfo = userService.save;
  var logInData = {
    username: $scope.data.username,
    password: $scope.data.password
  }
  console.log(logInData)
//  $scope.doLogin = userService.login(logInData)
});

// .controller('LoginController', function($scope,userService) {
//   $scope.userInfo = userService.login;
// });

// .directive('imgCard', function() {
//   return function(scope, element, attrs) {
//     console.log(attrs.imgCard);
//     attrs.$observe('imgCard', function(value) {
//         if (value) {
//           element.css({
//             width: '100%',
//             'background-size': 'cover',
//
//             'background-image': 'url('+value+')'
//           });
//         }
//       });
//   };
// });
