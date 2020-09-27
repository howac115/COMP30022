// Request API:
// https://www.npmjs.com/package/request#requestoptions-callback

// set the upstream test for this test file to be server test
require('./server_test');

const expect = require('chai').expect;
const {response} = require('express');
const request = require('request');
const app = require('../server');

const authURL = 'http://localhost:5000/auth/';
const userURL = 'http://localhost:5000/user/';

const firstName = 'Lv';
const lastName = 'Bu';
const email = 'lvbu@threekingdoms.com.cn';
const password = 'woyaodiaochan';
const wrongPassword = 'woshiliubei';

const reqBodyRegister = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
};

const reqBodyLogin = {
    email: email,
    password: password,
};

const reqBodyLoginWrongEmail = {
    email: 'notRegisteredEmail@threekiangdoms.com.cn',
    password: 'Idontcare',
};

const reqBodyLoginWrongPwd = {
    email: email,
    password: wrongPassword,
};

describe('-----------------AUTH AND USER MANAGEMENT----------------', function () {
    describe('delete the user at the very beginning', function () {
        it('should return status code 409', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: userURL + 'delete',
                    body: reqBodyLogin,
                    json: true,
                },
                function (error, response, body) {
                    console.log(response.statusCode);
                    expect(response.statusCode).to.equal(200);
                    if (error) done(error);
                    else done();
                }
            );
        });
    });

    describe('Testing if register works as intended for a fresh new user', function () {
        it('registering for a fresh new User should expect the http response status code to be 200', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: authURL + 'register',
                    body: reqBodyRegister,
                    json: true,
                },
                function (error, response, body) {
                    expect(response.statusCode).to.equal(200);
                    if (error) done(error);
                    else done();
                }
            );
        });
    });

    describe('Testing if duplicate registers are abandoned', function () {
        it('registering for a User that already registers in database should be forbidden and return status code 409', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: authURL + 'register',
                    body: reqBodyRegister,
                    json: true,
                },
                function (error, response, body) {
                    expect(response.statusCode).to.equal(409);
                    if (error) done(error);
                    else done();
                }
            );
        });
    });

    describe('Testing if login works as intended if a user provide correct email and password', function () {
        it('a user should be able to login with correct email and password, the server should return http response status code 200', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: authURL + 'login',
                    body: reqBodyLogin,
                    json: true,
                },
                function (error, response, body) {
                    expect(response.statusCode).to.equal(200);
                    if (error) done(error);
                    else done();
                }
            );
        });
    });

    describe('Testing if server will reject the login behaviour if email provided is not found in database', function () {
        it('should reject the login process and return a http status code 409', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: authURL + 'login',
                    body: reqBodyLoginWrongEmail,
                    json: true,
                },
                function (error, response, body) {
                    expect(response.statusCode).to.equal(409);
                    if (error) done(error);
                    else done();
                }
            );
        });
    });

    describe('Testing if server will reject the login behaviour if email found but password is wrong', function () {
        it('should reject the login process and return a http status code 409', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: authURL + 'login',
                    body: reqBodyLoginWrongPwd,
                    json: true,
                },
                function (error, response, body) {
                    expect(response.statusCode).to.equal(409);
                    if (error) done(error);
                    else done();
                }
            );
        });
    });

    describe('Testing if server will reject the request to delete a user if email not found', function () {
        it('should reject the delete request and return a http status code 409', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: userURL + 'delete',
                    body: reqBodyLoginWrongEmail,
                    json: true,
                },
                function (error, response, body) {
                    expect(response.statusCode).to.equal(409);
                    if (error) done(error);
                    else done();
                }
            );
        });
    });

    describe('Testing if server will reject the request to delete a user if password and email not match', function () {
        it('should reject the delete request and return a http status code 409', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: userURL + 'delete',
                    body: reqBodyLoginWrongPwd,
                    json: true,
                },
                function (error, response, body) {
                    expect(response.statusCode).to.equal(409);
                    if (error) done(error);
                    else done();
                }
            );
        });
    });

    describe('Testing if server will approve the request to delete a user if password and email match', function () {
        it('should approve the delete request and return a http status code 200', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: userURL + 'delete',
                    body: reqBodyLogin,
                    json: true,
                },
                function (error, response, body) {
                    expect(response.statusCode).to.equal(200);
                    if (error) done(error);
                    else done();
                }
            );
        });
    });
});
