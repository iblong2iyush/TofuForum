// jshint indent:4

(function(){

    'use strict';

    describe('Service: Userbackend', function () {

        // load the service's module
        beforeEach(module('tofuForumApp'));

        // instantiate service
        var Userbackend;
        beforeEach(inject(function (_Userbackend_) {
            Userbackend = _Userbackend_;
        }));

        it('should do something', function () {
            expect(!!Userbackend).toBe(true);
        });
        
    });

})();
