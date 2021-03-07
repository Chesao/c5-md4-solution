(function () {
    'use strict';
    
    angular.module("data")
    .service("MenuDataService", MenuDataService);

    MenuDataService.$inject = ['$http'];
    function MenuDataService($http) {
        var service = this;
    
        // get menu items from the server
        service.getAllCategories = function () {
            var response =  $http({
                url: 'https://davids-restaurant.herokuapp.com/categories.json'
            });
            return response;
        };

        // get menu items from the server
        service.getItemsForCategory = function (categoryShortName) {
            console.log("Short Name:", categoryShortName);
            var response =  $http({
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
                params: {category: categoryShortName}
            });
            return response;
        };
    }
})();