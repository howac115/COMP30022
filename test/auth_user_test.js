// This file includes test cases for authentication and user management
// This test file went through a time-out issue
// thought to be related to duplicate keys in mongo DB
// But actually solved by putting the "--timeout 30000" flag in mocha options in packages.json

// Request API Docs:
// https://www.npmjs.com/package/request#requestoptions-callback

// To avoid the database fullfilled with test cases
// this file follows the idea of
// 1. create a new user
// 2. do a few tests on that user including corner test cases
// 3. delete that user

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

var userID;
const fakeUserID = 'probablyWrong435342adsf';

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
                    userID = body.user.id;
                    console.log(body.user.id);
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

    // try to get user info with non-existing userID
    describe('Get user info with non-existing userID', function () {
        it('should reject the get request and return a http status code 409', function (done) {
            request.get(
                {
                    headers: {'content-type': 'application/json'},
                    url: userURL + fakeUserID,
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

    // try to get user info with correct userID
    describe('Get user info with correct userID', function () {
        it('should approve the get request and return a http status code 200', function (done) {
            request.get(
                {
                    headers: {'content-type': 'application/json'},
                    url: userURL + userID,
                    json: true,
                },
                function (error, response, body) {
                    console.log(userID);

                    expect(response.statusCode).to.equal(200);
                    if (error) done(error);
                    else done();
                }
            );
        });
    });

    // update user's detail but user email and user ID does not match
    describe('Update user info with non-existing userID', function () {
        it('should reject the request and return a http status code 409', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: userURL + fakeUserID + '/update',
                    body: {email: email},
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

    // update user's detail if authentication correct and user not request to update password
    describe('Update user info with correct authentication but user not request updating password ', function () {
        it('should approve the request and return a http status code 200', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: userURL + userID + '/update',
                    body: {
                        id: userID,
                        firstname: firstName,
                        lastName: lastName,
                        email: email,
                        password: '',
                    },
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

    // update user's detail if authentication correct and user requests to update password but password repeatition check fails
    describe('Update user info including password, all good but password repetition check fails', function () {
        it('should disapprove the request and return a http status code 409', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: userURL + userID + '/update',
                    body: {
                        id: userID,
                        firstname: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                        password2: 'justSomeRandomPassword',
                    },
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

    // update user's detail if authentication correct and user requests to update password
    describe('Update user info with correct authentication and user requests to update password ', function () {
        it('should approve the request and return a http status code 200', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: userURL + userID + '/update',
                    body: {
                        id: userID,
                        firstname: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                        password2: password,
                    },
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
