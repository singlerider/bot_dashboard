'use strict';

/**
 * @ngdoc directive
 * @name App.directive:chat
 * @description
 * # chat
 */
angular.module('App')
  .directive('chat', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the chat directive');
      }
    };
  });
