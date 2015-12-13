(function () {
  'use strict';
  angular
    .module('com.module.stream')
    .run(function ($rootScope, Event, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Stream'), 'app.stream.models', 'fa-globe');
    });

})();
