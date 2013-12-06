// jshint indent:4

(function(){
    'use strict';

    describe('Service: Message', function () {
        
        // load the service's module
        beforeEach(module('tofuForumApp'));
        
        // instantiate service
        var Message;
        beforeEach(inject(function (_Message_) {
            Message = _Message_;
        }));

        afterEach(function() {
            Message._reset();
        });
        
        it('Broadcasts should reach function', function () {
            var passiveData = true;
            var sentData = { mark: true };
            Message.register('changeData',function(event,data) {
                passiveData = data;
            });
            Message.send('changeData',sentData);
            expect(passiveData).toEqual(sentData);
        });
        
        it('Register function and remove', function () {
            var value = 0;
            var event = 'addEvent';
            var addFunction = function() {
                value = value + 1;
            };
            Message.register(event,addFunction);
            expect(value).toBe(0);
            Message.send(event);
            expect(value).toBe(1);
            Message.unregister(event,addFunction);
            Message.send(event);
            expect(value).toBe(1);
        });

        it('Register function for two different events', function () {
            var value = 0;
            var event1 = 'event1';
            var event2 = 'event2';
            var addFunction = function() {
                value = value + 1;
            };
            Message.register(event1,addFunction);
            Message.register(event2,addFunction);
            expect(value).toBe(0);
            Message.send(event1);
            expect(value).toBe(1);
            Message.send(event2);
            expect(value).toBe(2);
            Message.unregister(event1,addFunction);
            Message.unregister(event2,addFunction);
            Message.send(event1);
            expect(value).toBe(2);
            Message.send(event2);
            expect(value).toBe(2);
        });
    });

})();
