'use strict';

angular.module('myApp.messages', ['ngRoute'])


.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/messages', {
    templateUrl: 'messages/messages.html',
    controller: 'myApp.MessagesCtrl'
  });
}])

.controller('myApp.MessagesCtrl', ['$http', function MessagesCtrl ($http) {

    var ctrl = this;

    function _messages_success (response) {
      ctrl.messages = response.data.messages;
    }
    function _messages_error (error) {
      console.log(error);
    }
    $http({
      method: 'GET',
      url: 'http://shane.gg/api/chat/curvyllama/anarchy_2'
    }).then(
      _messages_success,
      _messages_error
    );
      //$http.jsonp('http://shane.gg/api/chat/curvyllama/singlerider').success(function(data){
       //ctrl.messages=data;
       //console.log(ctrl.messages);
     //)}
}]);
