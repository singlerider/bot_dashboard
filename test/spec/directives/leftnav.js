'use strict';

describe('Directive: leftNav', function () {

  // load the directive's module
  beforeEach(module('App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<left-nav></left-nav>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the leftNav directive');
  }));
});
