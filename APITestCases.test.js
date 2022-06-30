
//const { solar_fintech, end  } =require('./data/api-endpoint.js');
//const { expect } =require('chai');
//const {getRequest} =require('./utils/Utilities');
import { solar_fintech, end  } from './data/api-endpoint.js';
import {expect} from 'chai';
import {getRequest} from "./utils/Utilities.js";

describe("GET - /resreq", function () {
        it("should be successful 200", async function () {
            // Arrange
            const headers = { authorization: 'Bearer 1234' };

            // Act
            const response = await getRequest(solar_fintech, end, headers);
 // Assert
 expect(response.status).to.equal(200);
 expect(response.body).not.to.be.empty;
          
        });
         
    });

