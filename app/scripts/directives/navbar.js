'use strict';

/**
 * @ngdoc directive
 * @name App.directive:navbar
 * @description
 * # navbar
 */
angular.module('App')
  .directive('navbar', function(appData, channel, $routeParams) {
    return {
      templateUrl: '/views/navbar.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        console.log('Navbar Directive Controller Loaded: ', scope, element, attrs);

        function channelNameExists(){
          if($routeParams.channelName){
            return true;
          }
          return false;
        }

        scope.linkActive = function(link){
          if(window.location.href.indexOf(link.href) > -1){
            if(link.sideNav){
              scope.activeSideBar = link.sideNav;
            }

            return true;
          }
        };
        function getChannelName(){
          return $routeParams.channelName;
        }
        function init() {
          scope.appName = appData.name;

          scope.setLinkData();
        }

        scope.setLinkData = function(){
          scope.links = [{
              text: 'Channel',
              href: '/#/channel',
              sideNav: {
                input: {
                  placeholder: 'Channel Name',
                  submit: function(input) {
                    channel.setActiveChannel( input);
                  }
                },
                links: [
                  {
                    text: 'Stream',
                    href: '/#/channel/stream',
                    hide: function(){
                      return !channelNameExists();
                    }
                  },
                  {
                    text: 'Chatters',
                    href: '/#/channel/chatters',
                    hide: function(){
                      return !channelNameExists();
                    }
                  }
                ]
              }
            }, {
              text: 'Pokemon',
              href: '/#/pokemon',
              sideNav: {
                links: [

                ]
              }
            }

          ];
        };

        init();
      }
    };
  });
