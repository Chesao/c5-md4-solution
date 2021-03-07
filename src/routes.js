(function () {
  'use strict';
  
  angular.module('MenuApp')
  .config(RoutesConfig);
  
  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
  
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');
  
    // *** Set up UI states ***
    $stateProvider
  
    // Home page
    .state('home', {
      url: '/',
      templateUrl: 'src/menuapp/templates/home.template.html'
    })
  
    // Premade list page
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/menuapp/templates/categories.template.html',
      controller: 'CategoriesController as cList',
      resolve: {
        categories: ['MenuDataService',
        function (MenuDataService) {
          return MenuDataService.getAllCategories()
            .then(
              function (result) {
                console.log("Categories.data", result.data);
                return result.data;
              },
              function (error) {
                console.log("ERROR: can't get all categories.");
              }
            );
        }]
      }
    })
  
    .state('items', {
      url: '/items/{shortname}',
      templateUrl: 'src/menuapp/templates/items.template.html',
      controller: "ItemsController as iList",
      resolve: {
        items: ['$stateParams', 'MenuDataService',
        function ($stateParams, MenuDataService) {
            console.log("$stateParams.shortname", $stateParams.shortname);
            return MenuDataService.getItemsForCategory($stateParams.shortname)
              .then(
                function (result) {
                  console.log("Items.data", result.data.menu_items);
                  return result.data.menu_items;
                },
                function (error) {
                  console.log("ERROR: can't get items")
                }
              );
        }]
      }
    });
  
  }
    
}
)();
    