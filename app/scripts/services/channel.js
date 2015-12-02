'use strict';

/**
 * @ngdoc service
 * @name App.channel
 * @description
 * # channel
 * Factory in the App.
 */
angular.module('App')
  .factory('channel', function ($location, appData, $http, $q, $routeParams) {

    // Public API here
    return {
      getChatters: function(){
        var defer = $q.defer();

        $http.get(appData.apiUrl + '/api/chatters/' + $routeParams.channelName )
          .success(function(res){
            defer.resolve(res);
          })
          .error(function(err){
            defer.reject(err);
          });

        return defer.promise;
      },
      setActiveChannel: function(link){
        console.log('SetActiveChannel: ', '/channel/' + link);
        $location.path('/channel/' + link);
      }
    };
  });
