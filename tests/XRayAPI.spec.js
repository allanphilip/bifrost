import XMLHttpRequest from 'xhr2';
import request from "supertest" ; 
import fs from 'fs';
import {expect} from "chai";

describe('Update Existing Issues', () => {
    
	    //const baseurl = 'https://xray.cloud.xpand-it.com';
        const baseurl = 'https://xray.cloud.getxray.app';
        it('Update XRay Test Execution Results', async() => {
        
            var myXml = "test-results.xml";
            var xmlContents = fs.readFileSync(myXml, 'utf8').toString();
            request(baseurl)
			.post('/api/v2/import/execution/junit?testExecKey=QUA-6860')
            .send(xmlContents)
			.set('Content-Type', 'text/xml')
            //.attach('file',"/assets/mochawesome-report.png")
            
            .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnQiOiJqaXJhOjQwODhkNDllLTg5YTQtNDVhOS04NzljLWM5NjY5OWZkNThhNyIsImFjY291bnRJZCI6IjVmNTZjMDUwMTg5NDgyMDA3ZGZmZTg2MyIsImlzWGVhIjpmYWxzZSwiaWF0IjoxNjU2MzkyNTQzLCJleHAiOjE2NTY0Nzg5NDMsImF1ZCI6IjlBMDAyQzVBMzlGMDRERDk4QkFCNzg0QjRFNTM1RTVBIiwiaXNzIjoiY29tLnhwYW5kaXQucGx1Z2lucy54cmF5Iiwic3ViIjoiOUEwMDJDNUEzOUYwNEREOThCQUI3ODRCNEU1MzVFNUEifQ.bZIfBHmrDDjL--fwwqfAHzo9dJumM7cA--9qac_iw8E')
           .end(function(err, res) {
            console.log(res.text)
            expect(res.statusCode).to.be.equal(200);
			expect(res.body.key).to.be.equal('QUA-6860');
            if (err) {
               
                throw err;
            }
            
        });
			
}); });