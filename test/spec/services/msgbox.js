'use strict';

describe('Service: Msgbox', function () {

  // load the service's module
  beforeEach(module('tofuForumApp'));

  // instantiate service
  var Msgbox;
  beforeEach(inject(function (_Msgbox_) {
    Msgbox = _Msgbox_;
  }));

  it('should do something', function () {
    expect(!!Msgbox).toBe(true);
  });

});
