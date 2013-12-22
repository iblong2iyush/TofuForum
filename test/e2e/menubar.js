// jshint indent:4

(function(){

    'use strict';

    describe('Menubar',function(){

        beforeEach(function(){
            browser().navigateTo('/');
            expect(browser().location().path()).toBe('/login');
            input('user.userName').enter('verybigcow');
            input('user.userPassword').enter('moomoomoo');
            element(':button.btn-primary').click();
        });

        afterEach(function(){
        });

        it('Main-Publish-Subscribe Loop',function(){
            element('a#subscribe-menu-item').click();
            expect(browser().location().path()).toBe('/subscribed');
            element('a#publish-menu-item').click();
            expect(browser().location().path()).toBe('/published');
            element('a#main-menu-item').click();
            expect(browser().location().path()).toBe('/main');
        });

        it('Password cancel button',function(){
            element('a#subscribe-menu-item').click();
            expect(browser().location().path()).toBe('/subscribed');
            element('a#password-menu-item').click();
            expect(browser().location().path()).toBe('/password');
            element('button#cancel').click();
            expect(browser().location().path()).toBe('/subscribed');

            element('a#publish-menu-item').click();
            expect(browser().location().path()).toBe('/published');
            element('a#password-menu-item').click();
            expect(browser().location().path()).toBe('/password');
            element('button#cancel').click();
            expect(browser().location().path()).toBe('/published');

            element('a#main-menu-item').click();
            expect(browser().location().path()).toBe('/main');
            element('a#password-menu-item').click();
            expect(browser().location().path()).toBe('/password');
            element('button#cancel').click();
            expect(browser().location().path()).toBe('/main');
        });

        it('Password change with correct original and matching new passwords',function() {

            // click the main menu
            element('a#main-menu-item').click();
            expect(browser().location().path()).toBe('/main');
            // click the password menu item
            element('a#password-menu-item').click();
            expect(browser().location().path()).toBe('/password');
            // enter the current, new, and confirm passwords
            input('user.userCurrentPassword').enter('moomoomoo');
            input('user.userNewPassword').enter('prototypemouse');
            input('user.userNewPasswordConfirm').enter('prototypemouse');
            element('button#change').click();
            expect(browser().location().path()).toBe('/main');
            // logout and login again
            element('a#logout-menu-item').click();
            expect(browser().location().path()).toBe('/logout');
            browser().navigateTo('/');
            expect(browser().location().path()).toBe('/login');
            input('user.userName').enter('verybigcow');
            input('user.userPassword').enter('prototypemouse');
            element(':button.btn-primary').click();
            
            // change the password back

            // click the main menu
            element('a#main-menu-item').click();
            expect(browser().location().path()).toBe('/main');
            // click the password menu item
            element('a#password-menu-item').click();
            expect(browser().location().path()).toBe('/password');
            // enter the current, new, and confirm passwords
            input('user.userCurrentPassword').enter('prototypemouse');
            input('user.userNewPassword').enter('moomoomoo');
            input('user.userNewPasswordConfirm').enter('moomoomoo');
            element('button#change').click();
            expect(browser().location().path()).toBe('/main');
            // logout and login again
            element('a#logout-menu-item').click();
            expect(browser().location().path()).toBe('/logout');
            browser().navigateTo('/');
            expect(browser().location().path()).toBe('/login');
            input('user.userName').enter('verybigcow');
            input('user.userPassword').enter('moomoomoo');
            element(':button.btn-primary').click();
        });

        it('Password change with correct original and mismatching new passwords',function() {

            // click the main menu
            element('a#main-menu-item').click();
            expect(browser().location().path()).toBe('/main');
            // click the password menu item
            element('a#password-menu-item').click();
            expect(browser().location().path()).toBe('/password');
            // enter the current, new, and confirm passwords
            input('user.userCurrentPassword').enter('moomoomoo');
            input('user.userNewPassword').enter('prototypemouse1');
            input('user.userNewPasswordConfirm').enter('prototypemouse2');
            element('button#change').click();
            expect(browser().location().path()).toBe('/password');
            expect(element('div.alert div span').text()).toMatch('Passwords do not match');
        });

        it('Password change with wrong original and matching new passwords',function() {

            // click the main menu
            element('a#main-menu-item').click();
            expect(browser().location().path()).toBe('/main');
            // click the password menu item
            element('a#password-menu-item').click();
            expect(browser().location().path()).toBe('/password');
            // enter the current, new, and confirm passwords
            input('user.userCurrentPassword').enter('2moo2moo2moo');
            input('user.userNewPassword').enter('prototypemouse');
            input('user.userNewPasswordConfirm').enter('prototypemouse');
            element('button#change').click();
            expect(browser().location().path()).toBe('/password');
            expect(element('div.alert div span').text()).toMatch('Entered current password does not match stored password');
        });

        it('Password change with wrong original and mismatching new passwords',function() {

            // click the main menu
            element('a#main-menu-item').click();
            expect(browser().location().path()).toBe('/main');
            // click the password menu item
            element('a#password-menu-item').click();
            expect(browser().location().path()).toBe('/password');
            // enter the current, new, and confirm passwords
            input('user.userCurrentPassword').enter('2moo2moo2moo');
            input('user.userNewPassword').enter('prototypemouse1');
            input('user.userNewPasswordConfirm').enter('prototypemouse2');
            element('button#change').click();
            expect(browser().location().path()).toBe('/password');
            expect(element('div.alert div span').text()).toMatch('Passwords do not match');
        });

        it('Logout',function(){
            element('a#logout-menu-item').click();
            expect(browser().location().path()).toBe('/logout');
            browser().navigateTo('/main');
            expect(browser().location().path()).toBe('/login');
        });

        
 
    });

})();
