'use strict';

/**
 * @ngdoc function
 * @name App.controller:ChattersCtrl
 * @description
 * # ChattersCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('ChattersCtrl', function ($scope, channel) {
    channel.getChatters()
      .then(function(res){
        $scope.chatters = res.chatters;
      });
  });
