// this test file went through a time-out issue
// thought to be related to duplicate keys in mongo DB
// But actually solved by putting the "--timeout 30000" flag in mocha options in packages.json
// 12:31AM 28/09/2020 --- Yutao Wang and Haoqi Chen

// Request API Docs:
// https://www.npmjs.com/package/request#requestoptions-callback

// To avoid the database fullfilled with test cases
// this file follows the idea of
// 1. create a new user
// 2. do a few tests on that user
// 3. delete that user

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
    describe('Deleting an non existing user', function () {
        it('should disapprove the delete request and return a http status code 409', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: userURL + 'delete',
                    body: reqBodyLogin,
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

    describe('Register a new user', function () {
        it('should succeed and return status code 200', function (done) {
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

    describe('Duplicate register a user with existing email', function () {
        it('should reject and return status code 409', function (done) {
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

    describe('Login with correct email and password', function () {
        it('should succeed and return status code 200', function (done) {
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

    describe('Login with non-registered email', function () {
        it('should reject and return the http status code 409', function (done) {
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

    describe('Login with password being wrong', function () {
        it('should reject return a http status code 409', function (done) {
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

    describe('Delete user but password wrong', function () {
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

    describe('Delete user and password correct', function () {
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
