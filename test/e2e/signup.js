// jshint indent:4

(function(){

    'use strict';

    describe('Signup',function(){

        beforeEach(function(){
            browser().navigateTo('/removeTempUser');
            browser().navigateTo('/');
            expect(browser().location().path()).toBe('/login');
            element('a#signup-link').click();
            expect(browser().location().path()).toBe('/signup');
        });

        afterEach(function(){
            browser().navigateTo('/removeTempUser');
        });

        it('Sign up cancel button',function(){
            element('button#cancel').click();
            expect(browser().location().path()).toBe('/login');
        });  
 
    });

})();
