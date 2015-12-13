(function () {
  'use strict';
  angular
    .module('com.module.stream')
    .config(function ($stateProvider) {
      $stateProvider
        .state('app.stream', {
          abstract: true,
          url: '/stream',
          templateUrl: 'modules/stream/views/main.html'
        })
        .state('app.stream.models', {
          url: '',
          templateUrl: 'modules/stream/views/models.html',
          controllerAs: 'ctrl',
          controller: [
            'models',
            function (models) {
              this.models = models;
            }
          ],
          resolve: {
            models: [
              'MetaService',
              function (MetaService) {
                return MetaService.find();
              }
            ]
          }
        })
        .state('app.stream.models.info', {
          url: '/:modelName/info',
          templateUrl: 'modules/stream/views/models.info.html',
          controllerAs: 'info',
          controller: [
            'model',
            function (model) {
              this.model = model;
            }
          ],
          resolve: {
            model: [
              '$stateParams',
              'MetaService',
              function ($stateParams, MetaService) {
                return MetaService.findById($stateParams.modelName);
              }
            ]
          }
        })
        .state('app.stream.models.items', {
          url: '/:modelName',
          templateUrl: 'modules/stream/views/models.items.html',
          controllerAs: 'items',
          controller: [
            'model',
            'items',
            function (model, items) {
              this.model = model;
              this.items = items;
              this.itemKeys = [];
              if (this.items[0] !== undefined) {
                this.itemKeys = Object.keys(this.items[0]);
              }
            }
          ],
          resolve: {
            model: [
              '$stateParams',
              'MetaService',
              function ($stateParams, MetaService) {
                return MetaService.findById($stateParams.modelName);
              }
            ],
            items: [
              '$stateParams',
              'MetaService',
              function ($stateParams, MetaService) {
                return MetaService.getModelItems($stateParams.modelName);
              }
            ]
          }
        })
        .state('app.stream.models.items.view', {
          url: '/:modelId/view',
          templateUrl: 'modules/stream/views/models.items.view.html',
          controllerAs: 'view',
          controller: [
            'item',
            function (item) {
              this.item = item;
              this.itemKeys = Object.keys(this.item);
            }
          ],
          resolve: {
            item: [
              '$stateParams',
              'MetaService',
              function ($stateParams, MetaService) {
                return MetaService.getModelItem($stateParams.modelName, $stateParams.modelId);
              }
            ]
          }
        })
        .state('app.stream.models.items.edit', {
          url: '/:modelId/edit',
          templateUrl: 'modules/stream/views/models.items.edit.html',
          controllerAs: 'edit',
          controller: [
            '$state',
            'MetaService',
            'model',
            'item',
            'itemFields',
            function ($state, MetaService, model, item, itemFields) {
              this.item = item;
              this.itemFields = itemFields;
              this.submit = function () {
                MetaService.upsert(model.name, this.item).then(function () {
                  $state.go('app.stream.models.items', {modelName: model.name}, {reload: true});
                });
              };
            }
          ],
          resolve: {
            item: [
              '$stateParams',
              'MetaService',
              function ($stateParams, MetaService) {
                return MetaService.getModelItem($stateParams.modelName, $stateParams.modelId);
              }
            ],
            itemFields: [
              '$stateParams',
              'MetaService',
              'model',
              function ($stateParams, MetaService, model) {
                return MetaService.getModelFields(model);
              }
            ]
          }
        })
        .state('app.stream.models.items.add', {
          url: '/add',
          templateUrl: 'modules/stream/views/models.items.add.html',
          controllerAs: 'add',
          controller: [
            '$state',
            'MetaService',
            'model',
            'itemFields',
            function ($state, MetaService, model, itemFields) {
              this.item = {};
              this.itemFields = itemFields;
              this.submit = function () {
                MetaService.upsert(model.name, this.item).then(function () {
                  $state.go('app.stream.models.items', {modelName: model.name}, {reload: true});
                });
              };
            }
          ],
          resolve: {
            itemFields: [
              '$stateParams',
              'MetaService',
              'model',
              function ($stateParams, MetaService, model) {
                return MetaService.getModelFields(model);
              }
            ]
          }
        })
        .state('app.stream.models.items.delete', {
          url: '/:modelId/delete',
          template: '',
          controller: [
            '$state',
            '$stateParams',
            'MetaService',
            'model',
            function ($state, $stateParams, MetaService, model) {
              MetaService.delete(model.name, $stateParams.modelId, function () {
                $state.go('app.stream.models.items', {modelName: model.name}, {reload: true});
              }, function () {
                $state.go('app.stream.models.items', {modelName: model.name}, {reload: true});
              });
            }
          ]
        });
    });

})();
