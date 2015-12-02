'use strict';

/**
 * @ngdoc function
 * @name App.controller:StreamCtrl
 * @description
 * # StreamCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('StreamCtrl', function ($scope, $routeParams, $timeout) {
    $scope.channelName = $routeParams.channelName;
    var $ = angular.element;
    function startLoad(){
      if(!$scope.channelName){
        console.log('ChannelName N/A');
        $timeout(function(){
            startLoad();
        }, 500);
      } else {
        $scope.embed();
      }
    }
    $scope.getSrc = function(){
      return 'http://player.twitch.tv/?channel="' + $scope.channelName + '"';
    };
    $scope.embed = function(){
      var stream = $('<iframe src="http://player.twitch.tv/?channel=' + $scope.channelName + '" frameborder="0" scrolling="no" height="378" width="620"></iframe><a href="http://www.twitch.tv/' + $scope.channelName + '?tt_medium=live_embed&tt_content=text_link" style="padding:2px 0px 4px; display:block; width:345px; font-weight:normal; font-size:10px;text-decoration:underline;">Watch live video from ' + $scope.channelName + ' on www.twitch.tv</a>');
      console.log('stream: ', stream);
      $('#streamContainer').empty();
      $('#streamContainer').append(stream);

    };
    startLoad();
  });
