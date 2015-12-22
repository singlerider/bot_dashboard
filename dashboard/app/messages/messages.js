'use strict';

angular.module('myApp.messages', ['ngRoute'])

/*
function MessageList($scope, $http) {
    $scope.messages = {};
    $http.jsonp('http://shane.gg/api/chat/curvyllama/singlerider').success(function(data){
     $scope.messages=data;
     console.log($scope.messages)
  });
}
*/

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/messages', {
    templateUrl: 'messages/messages.html',
    controller: 'messagesCtrl'
  });
}])

.controller('messagesCtrl', [function() {
}]);
