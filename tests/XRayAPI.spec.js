import XMLHttpRequest from 'xhr2';
import request from "supertest" ; 
import fs from 'fs';
import {expect} from "chai";
import xrayurl from "../testdata/xrayurl.json" assert {type: "json"};
 import xraypost from "../testdata/xraypost.json" assert {type: "json"};

describe('Update Existing Issues', () => {
    
	   //const baseurl = 'https://xray.cloud.xpand-it.com';
       const baseurl = (xrayurl.baseurl);
        it('Update XRay Test Execution Results', async() => {
        
            var myXml = "test-results.xml";
            var xmlContents = fs.readFileSync(myXml, 'utf8').toString();
            //console.log(xmlContents);
           // var xml = "<?xml version='1.0'?><query><author>John Steinbeck</author></query>";
           //xmlhttp.send(xmlDoc);
            request(baseurl)
			.post(xraypost.post)
            .send(xmlContents)
			.set('Content-Type', 'text/xml')
            //.attach('file',"/assets/mochawesome-report.png")
            .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnQiOiJqaXJhOjQwODhkNDllLTg5YTQtNDVhOS04NzljLWM5NjY5OWZkNThhNyIsImFjY291bnRJZCI6IjVmNTZjMDUwMTg5NDgyMDA3ZGZmZTg2MyIsImlzWGVhIjpmYWxzZSwiaWF0IjoxNjU2MzkyNTQzLCJleHAiOjE2NTY0Nzg5NDMsImF1ZCI6IjlBMDAyQzVBMzlGMDRERDk4QkFCNzg0QjRFNTM1RTVBIiwiaXNzIjoiY29tLnhwYW5kaXQucGx1Z2lucy54cmF5Iiwic3ViIjoiOUEwMDJDNUEzOUYwNEREOThCQUI3ODRCNEU1MzVFNUEifQ.bZIfBHmrDDjL--fwwqfAHzo9dJumM7cA--9qac_iw8E')
			//.expect(200);
            /*.end(function(err, res){
            console.log(res.statusCode);
			expect(res.statusCode).to.be.equal(200);
			expect(res.body.key).to.be.equal('QUA-6861');
            done();*/
           .end(function(err, res) {
            expect(res.statusCode).to.be.equal(401);
		//	expect(res.body.key).to.be.equal('QUA-6860');
            if (err) {
                throw err;
            }
            
        });
			
          
      
      /*
      var myXml = "test-results.xml";
      var xmlDoc;
      
      var xmlContents = fs.readFileSync(myXml, 'utf8').toString();
        console.log(xmlContents);

        var url = "https://xray.cloud.xpand-it.com/api/v2/import/execution/junit?testExecKey=SQ-75";

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url,true);
        
        xhr.onload = function () {
            console.log("Onload" + xhr.status);
            if (xhr.readyState === 4) {
               
                console.log(xhr.responseXML);
                xmlDoc = xhr.responseXML;
                console.log(xmlDoc);
            }};;
        xhr.onreadystatechange = function () {
            console.log("On ready State change" + xhr.status);
        if (xhr.readyState === 4 && xhr.status == 200) {
          
            console.log(xhr.responseXML);
            xmlDoc = xhr.responseXML;
            console.log(xmlDoc);
        }};
        xhr.setRequestHeader("Content-Type", "text/xml");
        xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnQiOiJqaXJhOjQwODhkNDllLTg5YTQtNDVhOS04NzljLWM5NjY5OWZkNThhNyIsImFjY291bnRJZCI6IjVmNTZjMDUwMTg5NDgyMDA3ZGZmZTg2MyIsImlzWGVhIjpmYWxzZSwiaWF0IjoxNjU2MzkyNTQzLCJleHAiOjE2NTY0Nzg5NDMsImF1ZCI6IjlBMDAyQzVBMzlGMDRERDk4QkFCNzg0QjRFNTM1RTVBIiwiaXNzIjoiY29tLnhwYW5kaXQucGx1Z2lucy54cmF5Iiwic3ViIjoiOUEwMDJDNUEzOUYwNEREOThCQUI3ODRCNEU1MzVFNUEifQ.bZIfBHmrDDjL--fwwqfAHzo9dJumM7cA--9qac_iw8E");
       
        //var data = "@C:\Users\THI2201882\source\BiFrost\test-results.xml";
       
       //var doc = new parser.parseFromString(xmlContents, 'application/xml');

       // xhr.send(xmlContents);
        xhr.send(xmlDoc);
		
	});*/

}); });