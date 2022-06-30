//const request = require('supertest');
//const expect = require('chai').expect;

import {expect} from "chai";
import request from "supertest" ; 
import booking from "../testdata/booking.json" assert {type: "json"};
import userauthdata from "../testdata/userauthdata.json" assert {type: "json"};
import updatedbooking from "../testdata/updatedbooking.json" assert {type: "json"};
//import {getRequest} from "../utils/Utilities"

/*const booking = require('../testdata/booking.json');
const userauthdata = require('../testdata/userauthdata.json');
const updatedbooking = require('../testdata/updatedbooking.json');*/

describe('Restful Booker API Tests', () => {
    const baseurl = 'https://restful-booker.herokuapp.com';
    var bookingId;
    var token;

    before(function(done) {
           request(baseurl)
            .post('/auth')
            .send(userauthdata)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.token).not.to.be.null;
                token = res.body.token;
                if (err) {
                    throw err;
                }
                done();
            });
    });


    it('Verify the user is able to create the booking sucessfully', (done) => {

        
        request(baseurl)
            .post('/booking')
            .send(booking)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.bookingid).not.to.be.null;
                expect(res.body.booking.firstname).to.be.equal(booking.firstname);
                expect(res.body.booking.lastname).to.be.equal(booking.lastname);
                expect(res.body.booking.totalprice).to.be.equal(booking.totalprice);
                expect(res.body.booking.depositpaid).to.be.equal(booking.depositpaid);
                expect(res.body.booking.bookingdates.checkin).to.be.equal(booking.bookingdates.checkin);
                expect(res.body.booking.bookingdates.checkout).to.be.equal(booking.bookingdates.checkout);
                expect(res.body.booking.additionalneeds).to.be.equal(booking.additionalneeds);
                bookingId = res.body.bookingid;
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('Verify the user is able to fetch the booking of the provided booking id', (done) => {

       
            request(baseurl)
            .get('/booking/' + bookingId)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.firstname).to.be.equal(booking.firstname);
                expect(res.body.lastname).to.be.equal(booking.lastname);
                expect(res.body.totalprice).to.be.equal(booking.totalprice);
                expect(res.body.depositpaid).to.be.equal(booking.depositpaid);
                expect(res.body.bookingdates.checkin).to.be.equal(booking.bookingdates.checkin);
                expect(res.body.bookingdates.checkout).to.be.equal(booking.bookingdates.checkout);
                expect(res.body.additionalneeds).to.be.equal(booking.additionalneeds);
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('Verify the user is able to update the booking of the provided booking id using Put request', (done) => {
        request(baseurl)
            .put('/booking/' + bookingId)
            .send(updatedbooking)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Cookie', 'token=' + token)
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.firstname).to.be.equal(updatedbooking.firstname);
                expect(res.body.lastname).to.be.equal(updatedbooking.lastname);
                expect(res.body.totalprice).to.be.equal(updatedbooking.totalprice);
                expect(res.body.depositpaid).to.be.equal(updatedbooking.depositpaid);
                expect(res.body.bookingdates.checkin).to.be.equal(updatedbooking.bookingdates.checkin);
                expect(res.body.bookingdates.checkout).to.be.equal(updatedbooking.bookingdates.checkout);
                expect(res.body.additionalneeds).to.be.equal(updatedbooking.additionalneeds);
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('Verify the user is able to update the firstname and lastname of booking of the provided booking id', (done) => {
        var firstname = 'Michael';
        var lastname = 'Trenor';
        request(baseurl)
            .patch('/booking/' + bookingId)
            .send({ firstname: firstname, lastname: lastname })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Cookie', 'token=' + token)
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.firstname).to.be.equal(firstname);
                expect(res.body.lastname).to.be.equal(lastname);
                expect(res.body.totalprice).to.be.equal(updatedbooking.totalprice);
                expect(res.body.depositpaid).to.be.equal(updatedbooking.depositpaid);
                expect(res.body.bookingdates.checkin).to.be.equal(updatedbooking.bookingdates.checkin);
                expect(res.body.bookingdates.checkout).to.be.equal(updatedbooking.bookingdates.checkout);
                expect(res.body.additionalneeds).to.be.equal(updatedbooking.additionalneeds);
                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('Verify the user is able to  Delete the booking of the provided booking id', (done) => {
        request(baseurl)
            .delete('/booking/' + bookingId)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Cookie', 'token=' + token)
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(201);
                if (err) {
                    throw err;
                }
                done();
            });
    });
    it('Verify the 404 status code for deleted booking id', (done) => {
        request(baseurl)
            .get('/booking/' + bookingId)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.be.equal(404);
                if (err) {
                    throw err;
                }
                done();
            });
    });
});