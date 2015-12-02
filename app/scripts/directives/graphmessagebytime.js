'use strict';

/**
 * @ngdoc directive
 * @name App.directive:graphMessageByTime
 * @description
 * # graphMessageByTime
 */
angular.module('App')
  .directive('graphMessageByTime', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the graphMessageByTime directive');
      }
    };
  });
