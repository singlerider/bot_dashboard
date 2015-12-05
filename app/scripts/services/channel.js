'use strict';

/**
 * @ngdoc service
 * @name App.channel
 * @description
 * # channel
 * Factory in the App.
 */
angular.module('App')
  .factory('channel', function ($location, appData, $http, $q, $routeParams, localStorageService) {

    // Public API here
    return {
      getChatters: function(){
        var defer = $q.defer();
        if(localStorageService.get('selectedChannelName')){
          $http.get(appData.apiUrl + '/api/chatters/' + localStorageService.get('selectedChannelName') )
            .success(function(res){
              defer.resolve(res);
            })
            .error(function(err){
              defer.reject(err);
            });
        } else {
          defer.reject('No channel selected');
        }

        return defer.promise;
      },
      setActiveChannel: function(channelName){
        localStorageService.set('selectedChannelName', channelName);
      },
      getActiveChannel: function(){
        return localStorageService.get('selectedChannelName');
      }
    };
  });
