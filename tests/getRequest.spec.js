
//const request = require('supertest');
//const expect = require('chai').expect;

import {expect} from "chai";
import request from "supertest" ; 

describe('Get API tests using supertest', () => {
	const baseurl = 'https://reqres.in';
	it('Verify the user is able to  pass the test for get api with query param sucessfully ', (done) => {
		request(baseurl)
			.get('/api/users')
			.query({ page: '2' })
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.end(function (err, res) {
				expect(res.statusCode).to.be.equal(200);
				expect(res.body.page).to.be.equal(2);
				expect(res.body.data[0].id).to.be.equal(7);
				expect(res.body.data[0].first_name).to.be.equal('Michael');
				done();
			});
	});
	it('Verify the user is able to pass the test for get api without query param  successfully', (done) => {
		request(baseurl)
			.get('/api/users/2')
			.end(function (err, res) {
				expect(res.statusCode).to.be.equal(200);
				expect(res.body.data.id).to.be.equal(2);
				expect(res.body.data.first_name).to.be.equal('Janet');
				done();
			});
	});

	it('should successfully pass the test for get api with path param', (done) => {
		let param = 1;
		request('https://fakerestapi.azurewebsites.net')
			.get('/api/v1/Authors/' + param)
			.end(function (err, res) {
				expect(res.statusCode).to.be.equal(200);
				expect(res.body.id).to.be.equal(1);
				done();
			});
	});
});
