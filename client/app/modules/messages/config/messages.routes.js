(function () {
  'use strict';
  angular
    .module('com.module.messages')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.messages', {
          abstract: true,
          url: '/messages',
          templateUrl: 'modules/messages/views/main.html'
        })
        .state('app.messages.list', {
          url: '',
          templateUrl: 'modules/messages/views/list.html',
          controllerAs: 'ctrl',
          controller: function (messages) {
            this.messages = messages;
          },
          resolve: {
            messages: [
              'MessagesService',
              function (MessagesService) {
                return MessagesService.getMessages();
              }
            ]
          }
        })
        .state('app.messages.add', {
          url: '/add',
          templateUrl: 'modules/messages/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, MessagesService, post) {
            this.post = post;
            this.formFields = MessagesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              MessagesService.upsertPost(this.post).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            post: function () {
              return {};
            }
          }
        })
        .state('app.messages.edit', {
          url: '/:id/edit',
          templateUrl: 'modules/messages/views/form.html',
          controllerAs: 'ctrl',
          controller: function ($state, MessagesService, post) {
            console.log(post);
            this.post = post;
            this.formFields = MessagesService.getFormFields();
            this.formOptions = {};
            this.submit = function () {
              MessagesService.upsertPost(this.post).then(function () {
                $state.go('^.list');
              });
            };
          },
          resolve: {
            post: function ($stateParams, MessagesService) {
              return MessagesService.getPost($stateParams.id);
            }
          }
        })
        .state('app.messages.view', {
          url: '/:id',
          templateUrl: 'modules/messages/views/view.html',
          controllerAs: 'ctrl',
          controller: function (post) {
            this.post = post;
          },
          resolve: {
            post: function ($stateParams, MessagesService) {
              return MessagesService.getPost($stateParams.id);
            }
          }
        })
        .state('app.messages.delete', {
          url: '/:id/delete',
          template: '',
          controllerAs: 'ctrl',
          controller: function ($state, MessagesService, post) {
            MessagesService.deletePost(post.id, function () {
              $state.go('^.list');
            }, function () {
              $state.go('^.list');
            });
          },
          resolve: {
            post: function ($stateParams, MessagesService) {
              return MessagesService.getPost($stateParams.id);
            }
          }
        });
    }
  );

})();
