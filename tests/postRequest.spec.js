

//const request = require('supertest');
//const expect = require('chai').expect;
import {expect} from "chai";
import request from "supertest" ; 
import userdata from "../testdata/userdata.json" assert {type: "json"};

//const userdata = require('../testdata/userdata.json');

describe('Post API tests using supertest', () => {
	const baseurl = 'https://reqres.in';
	it('Verify the user is able to  pass the test for post api sucessfully', (done) => {
		request(baseurl)
			.post('/api/users')
			.send(userdata)
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.end(function(err, res) {
				expect(res.statusCode).to.be.equal(201);
				expect(res.body.name).to.be.equal('Abhirami Balasubramanian');
				expect(res.body.job).to.be.equal('QA');
				expect(res.body.id).not.to.be.null;
				expect(res.body.createdAt).not.to.be.null;
				done();
			});
	});
});