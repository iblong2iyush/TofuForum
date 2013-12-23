// jshint indent:4

(function(){

    'use strict';

    describe('Signup',function(){

        var user;

        beforeEach(function(){
            browser().navigateTo('/removeTempUser');
            browser().navigateTo('/');
            expect(browser().location().path()).toBe('/login');
            element('a#signup-link').click();
            expect(browser().location().path()).toBe('/signup');
            user = {
                name: 'dummy user',
                email: 'dummyuser@yahoo.com',
                password: 'hohohomerrychristmas'
            };
        });

        afterEach(function(){
            browser().navigateTo('/removeTempUser');
        });

        it('Sign up cancel button',function(){
            element('button#cancel').click();
            expect(browser().location().path()).toBe('/login');
        });  

        it('Sign up with dummy user, name, email, password ok',function(){
            input('user.userName').enter(user.name);
            input('user.userEmail').enter(user.email);
            input('user.userEmailConfirm').enter(user.email);
            input('user.userPassword').enter(user.password);
            input('user.userPasswordConfirm').enter(user.password);
            element('button#signup').click();
            expect(browser().location().path()).toBe('/login');
        });            

        it('Sign up with dummy user, name, mismatch email, password ok',function(){
            input('user.userName').enter(user.name);
            input('user.userEmail').enter(user.email);
            input('user.userEmailConfirm').enter(user.email + '1');
            input('user.userPassword').enter(user.password);
            input('user.userPasswordConfirm').enter(user.password);
            element('button#signup').click();
            expect(browser().location().path()).toBe('/signup');
            expect(element('div.alert div span').text()).toMatch('Please fill out all fields');
        });            

        it('Sign up with dummy user, name, email, mismatch password',function(){
            input('user.userName').enter(user.name);
            input('user.userEmail').enter(user.email);
            input('user.userEmailConfirm').enter(user.email);
            input('user.userPassword').enter(user.password+'1');
            input('user.userPasswordConfirm').enter(user.password);
            element('button#signup').click();
            expect(browser().location().path()).toBe('/signup');
            expect(element('div.alert div span').text()).toMatch('Passwords did not match');
        });            

        it('Sign up with dummy user, name, mismatch email, mismatch password',function(){
            input('user.userName').enter(user.name);
            input('user.userEmail').enter(user.email+'1');
            input('user.userEmailConfirm').enter(user.email);
            input('user.userPassword').enter(user.password+'1');
            input('user.userPasswordConfirm').enter(user.password);
            element('button#signup').click();
            expect(browser().location().path()).toBe('/signup');
            expect(element('div.alert div span').text()).toMatch('Please fill out all fields');
        });            

        it('Sign up with dummy user, duplicate name, email, password ok',function(){

            browser().navigateTo('/');
            expect(browser().location().path()).toBe('/login');
            element('a#signup-link').click();
            expect(browser().location().path()).toBe('/signup');

            input('user.userName').enter(user.name);
            input('user.userEmail').enter(user.email);
            input('user.userEmailConfirm').enter(user.email);
            input('user.userPassword').enter(user.password);
            input('user.userPasswordConfirm').enter(user.password);
            element('button#signup').click();
            expect(browser().location().path()).toBe('/login');

            browser().navigateTo('/');
            expect(browser().location().path()).toBe('/login');
            element('a#signup-link').click();
            expect(browser().location().path()).toBe('/signup');

            input('user.userName').enter(user.name);
            input('user.userEmail').enter(user.email);
            input('user.userEmailConfirm').enter(user.email);
            input('user.userPassword').enter(user.password);
            input('user.userPasswordConfirm').enter(user.password);
            element('button#signup').click();
            expect(browser().location().path()).toBe('/signup');
            expect(element('div.alert div span').text()).toMatch('Duplicate entry \'dummy user\' for key \'name\'');

        });            
 

        it('Sign up with dummy user, name, duplicate email, password ok',function(){

            user.name = 'dummy user 1';

            browser().navigateTo('/');
            expect(browser().location().path()).toBe('/login');
            element('a#signup-link').click();
            expect(browser().location().path()).toBe('/signup');

            input('user.userName').enter(user.name);
            input('user.userEmail').enter(user.email);
            input('user.userEmailConfirm').enter(user.email);
            input('user.userPassword').enter(user.password);
            input('user.userPasswordConfirm').enter(user.password);
            element('button#signup').click();
            expect(browser().location().path()).toBe('/login');

            browser().navigateTo('/');
            expect(browser().location().path()).toBe('/login');
            element('a#signup-link').click();
            expect(browser().location().path()).toBe('/signup');

            user.name = 'dummy user 2';

            input('user.userName').enter(user.name);
            input('user.userEmail').enter(user.email);
            input('user.userEmailConfirm').enter(user.email);
            input('user.userPassword').enter(user.password);
            input('user.userPasswordConfirm').enter(user.password);
            element('button#signup').click();
            expect(browser().location().path()).toBe('/signup');
            expect(element('div.alert div span').text()).toMatch('Duplicate entry \'dummyuser\@yahoo.com\' for key \'email\'');

        });            
 
    });

})();
