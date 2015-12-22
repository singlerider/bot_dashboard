'use strict';

angular.module('myApp.messages', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/messages', {
    templateUrl: 'messages/messages.html',
    controller: 'messagesCtrl'
  });
}])

.controller('messagesCtrl', [function() {

}]);