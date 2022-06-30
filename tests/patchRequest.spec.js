

//const request = require('supertest');
//const expect = require('chai').expect;

import {expect} from "chai";
import request from "supertest" ; 
import patchdata from "../testdata/patchdata.json" assert {type: "json"};

describe('Patch API tests using supertest', () => {
	const baseurl = 'https://reqres.in';
	it('Verify the patch request is scuessfull', (done) => {
		request(baseurl)
			.patch('/api/users/2')
			.send(patchdata)
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.end(function(err, res) {
				expect(res.statusCode).to.be.equal(200);
				expect(res.body.name).to.be.equal('Philip Allan');
				expect(res.body.job).to.be.equal('Quality Analyst');
				expect(res.body.updatedAt).not.to.be.null;
				done();
			});
	});
});