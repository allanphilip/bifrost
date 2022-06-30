
//const request = require('supertest');
//const expect = require('chai').expect;

import {expect} from "chai";
import request from "supertest" ; 
import putdata from	"../testdata/putdata.json" assert {type: "json"};

describe('Put API tests using supertest', () => {
	const baseurl = 'https://reqres.in';
	it('Verify the put request is sucessfully ', (done) => {
		request(baseurl)
			.put('/api/users/2')
			.send(putdata)
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.end(function(err, res) {
				expect(res.statusCode).to.be.equal(200);
				expect(res.body.name).to.be.equal('Allan Philip');
				expect(res.body.job).to.be.equal('Business Analyst');
				expect(res.body.updatedAt).not.to.be.null;
				done();
			});
	});
});