// This file includes the test case for basic server request and response scheme
// This tests  the server by basically send a get request to server
// and test the http response and status code to be as expected

// Request API:
// https://www.npmjs.com/package/request#requestoptions-callback

const expect = require('chai').expect;
const {response} = require('express');
const request = require('request');
const app = require('../server');

const baseURL = 'http://localhost:5000';
describe('-----------------SERVER--------------------', function () {
    describe('Testing the server is running properly', function () {
        it('GET method to the server will receive http status code 200 and the response "Success access"', function (done) {
            request.get(baseURL, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(response.body).to.equal('"Success access"');
                if (error) done(error);
                else done();
            });
        });
    });
});
