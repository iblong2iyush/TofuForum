// jshint indent:4

(function(){

    'use strict';

    describe('Login',function(){

        beforeEach(function(){
            browser().navigateTo('/');
        });

        it('redirect to login page',function(){
            expect(browser().location().path()).toBe('/login');
        });

        it ('login with correct userName and userPassword',function(){
            input('user.userName').enter('verybigcow');
            input('user.userPassword').enter('moomoomoo');
            element(':button.btn-primary').click();
            expect(browser().location().path()).toBe('/main');
        });

        it ('login with correct userName but wrong userPassword',function(){
            input('user.userName').enter('verybigcow');
            input('user.userPassword').enter('2moo2moo2moo');
            element(':button.btn-primary').click();
            expect(browser().location().path()).toBe('/login');
            expect(element('div.alert div span').text()).toMatch('Name or password does not match records');
        });

        it ('login with wrong userName but correct userPassword',function(){
            input('user.userName').enter('2very2big2cow');
            input('user.userPassword').enter('moomoomoo');
            element(':button.btn-primary').click();
            expect(browser().location().path()).toBe('/login');
            expect(element('div.alert div span').text()).toMatch('Name or password does not match records');
        });

        it ('login with empty userName and correct userPassword',function(){
            input('user.userName').enter('');
            input('user.userPassword').enter('moomoomoo');
            element(':button.btn-primary').click();
            expect(browser().location().path()).toBe('/login');
            expect(element('div.alert div span').text()).toMatch('Please fill in all fields');
        });

        it ('login with empty userName and wrong userPassword',function(){
            input('user.userName').enter('');
            input('user.userPassword').enter('2moo2moo2moo');
            element(':button.btn-primary').click();
            expect(browser().location().path()).toBe('/login');
            expect(element('div.alert div span').text()).toMatch('Please fill in all fields');
        });

        it ('login with correct userName and empty userPassword',function(){
            input('user.userName').enter('verybigcow');
            input('user.userPassword').enter('');
            element(':button.btn-primary').click();
            expect(browser().location().path()).toBe('/login');
            expect(element('div.alert div span').text()).toMatch('Please fill in all fields');
        });

        it ('login with wrong userName and empty userPassword',function(){
            input('user.userName').enter('2very2big2cow');
            input('user.userPassword').enter('');
            element(':button.btn-primary').click();
            expect(browser().location().path()).toBe('/login');
            expect(element('div.alert div span').text()).toMatch('Please fill in all fields');
        });

        it ('login with empty userName and empty userPassword',function(){
            input('user.userName').enter('');
            input('user.userPassword').enter('');
            element(':button.btn-primary').click();
            expect(browser().location().path()).toBe('/login');
            expect(element('div.alert div span').text()).toMatch('Please fill in all fields');
        });

    });

})();
