(function () {
    'use strict';
    
    angular.module('MenuApp')
    .controller('ItemsController', ItemsController);
    
    
    ItemsController.$inject = ['items'];
    function ItemsController(items) {
      var iList = this;
      iList.items = items;
    
    }
    
})();
