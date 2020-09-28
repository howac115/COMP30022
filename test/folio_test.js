// to avoid the database fullfilled with testcases
// this file use the basic idea of
// 1. create a user for our testing purpose
// 2. test the folio functionalities on that user
//     i). create folio on that user
//     ii). test functions of folios on that user
//     iiV). delete the folios created on that user
// 3. delete that user and all the user's created folios

// set the upstream test file to be auth_user_test.js
require('./auth_user_test');

const expect = require('chai').expect;
const {response} = require('express');
const request = require('request');
const folio = require('../models/folio');
const app = require('../server');

const authURL = 'http://localhost:5000/auth/';
const userURL = 'http://localhost:5000/user/';
const folioURL = 'http://localhost:5000/folio/';

const firstName = 'Yu';
const lastName = 'Guan';
const email = 'guanyu@threekingdoms.com.cn';
const password = 'liubeiwodage';
const wrongPassword = 'woaisaosao';

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
const folioName = 'qianlizoudanji';

// a folio identifier is just a json block with userID specified and folio name specied
// note folio names are supposed to be unique user wide
var folioIdentifier;

var wrongFolioIdentifier = {
    user: 'somerandomid',
    name: 'kukukukiki',
};

describe('-----------------FOLIO MANAGEMENT----------------', function () {
    describe('Register a new user for our folio testing purpose', function () {
        it('should approve the registeration and return status code 200', function (done) {
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
                    else {
                        // this initializes the folio identifier
                        // that we will use across the file
                        userID = body.user.id;
                        folioIdentifier = {
                            user: userID,
                            name: folioName,
                        };
                        done();
                    }
                }
            );
        });
    });

    describe('Create a folio for that user with correct userID and fresh new folio name', function () {
        it('should approve the request and return status code 200', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: folioURL + 'create',
                    body: folioIdentifier,
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

    describe('Create a folio for that user with correct userID and existing folio name', function () {
        it('should disapprove the request and return status code 409', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: folioURL + 'create',
                    body: folioIdentifier,
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

    describe('Get one folio with correct userID and correct folio name', function () {
        it('should approve the request and return status code 200', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: folioURL + userID + '/one',
                    body: folioIdentifier,
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

    describe('Get one folio with wrong userID or wrong folio name', function () {
        it('should disapprove the request and return status code 409', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: folioURL + userID + '/one',
                    body: wrongFolioIdentifier,
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

    describe('Get all folios with correct userID', function () {
        it('should approve the request and return status code 200', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: folioURL + 'all',
                    body: {user: userID},
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

    describe('Get all folios with non-existing userID', function () {
        it('should approve the request and return status code 409', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: folioURL + 'all',
                    body: {user: wrongFolioIdentifier.user},
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

    describe('Edit a folio with wrong userID or wrong folio name', function () {
        it('should disapprove the request and return status code 400', function (done) {
            const postBody = {
                user: wrongFolioIdentifier.user,
                name: wrongFolioIdentifier.name,
                content: 'Idontcare',
            };
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: folioURL + userID + '/edit',
                    body: postBody,
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

    describe('Edit a folio with correct userID and correct folio name', function () {
        it('should disapprove the request and return status code 400', function (done) {
            const postBody = {
                user: userID,
                name: folioName,
                content: 'dandaofuhui',
            };
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: folioURL + userID + '/edit',
                    body: postBody,
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

    describe('Delete a folio with wrong userID or wrong folio name', function () {
        it('should disapprove the request and return status code 400', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: folioURL + userID + '/delete',
                    body: wrongFolioIdentifier,
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

    describe('Delete a folio for that user with correct userID and correct folio name', function () {
        it('should approve the request and return status code 200', function (done) {
            request.post(
                {
                    headers: {'content-type': 'application/json'},
                    url: folioURL + userID + '/delete',
                    body: folioIdentifier,
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

    describe('Delete the user created for folio testing purpose', function () {
        it('should approve the deletion and return status code 200', function (done) {
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
