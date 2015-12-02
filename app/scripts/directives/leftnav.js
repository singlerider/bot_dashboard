'use strict';

/**
 * @ngdoc directive
 * @name App.directive:leftNav
 * @description
 * # leftNav
 */
angular.module('App')
  .directive('leftNav', function () {
    return {
      templateUrl: '/views/leftnav.html',
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function postLink(scope, element, attrs) {
        
        console.log('Leftnav directive loaded: ', scope, element, attrs);

      }
    };
  });
