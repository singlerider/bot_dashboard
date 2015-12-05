'use strict';

/**
 * @ngdoc overview
 * @name App
 * @description
 * # App
 *
 * Main module of the application.
 */
angular
  .module('App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl',
        controllerAs: 'chat'
      })
      .when('/pokemon', {
        templateUrl: 'views/pokemon.html',
        controller: 'PokemonCtrl',
        controllerAs: 'pokemon'
      })
      .when('/channel', {
        templateUrl: 'views/channel.html',
        controller: 'ChannelCtrl',
        controllerAs: 'channel'
      })
      .when('/channel/stream', {
        templateUrl: 'views/stream.html',
        controller: 'StreamCtrl',
        controllerAs: 'stream'
      })
      .when('/channel/chatters', {
        templateUrl: 'views/chatters.html',
        controller: 'ChattersCtrl',
        controllerAs: 'chatters'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant("appData", {
    name: "Lorenzo Dashboard",
    apiUrl: "http://shane.gg"
  });
