'use strict';

angular.module('myApp.stream', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/stream', {
    templateUrl: 'stream/stream.html',
    controller: 'streamCtrl'
  });
}])

.controller('streamCtrl', [function() {

}]);