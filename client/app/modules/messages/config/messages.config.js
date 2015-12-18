(function () {
  'use strict';
  angular
    .module('com.module.messages')
    .run(function ($rootScope, Post, gettextCatalog) {
      $rootScope.addMenu(gettextCatalog.getString('Messages'), 'app.messages.list', 'fa-edit');

      Post.find(function (messages) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Messages'), 'bg-red', 'ion-document-text', messages.length, 'app.messages.list');
      });

    });

})();
