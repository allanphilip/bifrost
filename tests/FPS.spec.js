import { expect } from 'chai'

import fs from 'fs'
import {
  headers,
  FPS1_Build_Json,
  FPS3_Build_Json,
  FPS5_Build_Json,
  FPS7_Build_Json,
  FPS7A_Build_Json,
  FPS7B_Build_Json,
  FPS9_Build_Json,
  FPS10_Build_Json,
  FPS10A_Build_Json,
  FPS10B_Build_Json,
  FPS12_Build_Json
} from '../data/FPS.js'
import { getRequest, postRequest, patchRequest,sleep } from './Utilities.js'
import FPSTestData from '../data/FPSTestData.json' assert {type: 'json'};var Common = JSON.parse(fs.readFileSync('./testdata/Common.json', 'utf8'))
let response_Value = null
let strfirst_name
let source = null
let  FPS7response,FPS10response;

/**************************End Points for FPS Scenario Validation************************************** */

const FPS_endpoint = '/person'
let FPS5_endpoint = FPS_endpoint + '/events'
let FPS7_endpoint = '/transaction'

/****************************1.1 Create person Copy****************************************************/

describe('Workday API Automation', () => {
  FPSTestData.forEach(FPSTestData => {
    if (FPSTestData.scenario != '') {

      it(FPSTestData.scenario, async () => {
        const FPS1response = await FPS1_Build_Json(
          FPSTestData['1_homestore'],
          FPSTestData['1_source'],
          FPSTestData['1_country']
        )

        strfirst_name = FPS1response.first_name

        /****Post Request****/

        const response = await postRequest(
          Common.URL.FPS,
          FPS_endpoint,
          headers,
          JSON.stringify(FPS1response)
        )

        expect(response.status).to.oneOf([201, 200],"Check person uuids are generated successfully")
        expect(response.body).not.to.be.empty
        if (response.status == '201' || response.status == '200') {
          response_Value = response.body
          //console.log(response_Value)
          console.log('1 Create person - FPS completed')

          //let entity = 'email'
          let entity_id = response.body.email
          /*********************************End Points generated through FPS ID************************************/

          let FPS2_endpoint =
            FPS_endpoint +
            '/' +
            response.body.person_uuid +
            '/restricted'
          let FPS3_endpoint =
            FPS_endpoint + '/' + response.body.person_uuid
          let FPS8_endpoint =
            FPS_endpoint + '/' + response.body.person_uuid + '/tx'

          /* **************************2 Get Person restricted details-p1****************************************/

          /****Get Request****/
          await sleep(2000);
          const response2 = await getRequest(
            Common.URL.FPS,
            FPS2_endpoint,
            headers
          )
          console.log(response2.text)
          console.log(response2.body)

          expect(response2.statusCode).to.be.oneOf([201, 200])
          expect(response2.body.createdAt).not.to.be.null
          expect(response2.body.first_name).to.be.equal( response.body.first_name,"Verify the first name");
          expect(response2.body.last_name).to.be.equal( response.body.last_name,"Verify the last name");
          expect(response2.body.email).to.be.equal( response.body.email,"Verify email");
          expect(response2.body.person_uuid).to.be.equal( response.body.person_uuid," Check the person uuid is ");
          expect(response2.body.home_store).to.be.equal( response.body.home_store," Verify the home store ");
          for(var index=0; index < response.body.aliases.length; index++)
          {
          for(var i=0; i < response2.body.aliases.length; i++) 
          {

            if (response2.body.aliases[i].source_id == response.body.aliases[index].source_id)
                {
                  expect(response2.body.aliases[i].source).to.be.equal(response.body.aliases[index].source,"Check the source value");
                  expect(response2.body.aliases[i].source_id).to.be.equal(response.body.aliases[index].source_id,"Check the source_id value");
                  break;
                }
          }

        }

          if (response2.status == '201' || response2.status == '200') {
             console.log('2-Get Person restricted details-p1 completed')
            /* ***************************3 update a person in fps Copy********************************************/

            const FPS3response = await FPS3_Build_Json(
              response2.body.person_uuid,
              response2.body.first_name,
              response2.body.aliases[0].source_id,
              FPSTestData['3_homestore'], //update from TestData.json with homestore1
              response2.body.aliases[0].source,
              FPSTestData['3_country']
            )

            /****Patch Request****/
            const response3 = await patchRequest(
              Common.URL.FPS,
              FPS3_endpoint,
              headers,
              JSON.stringify(FPS3response)
            )
            
           // console.log(response3.body)
            expect(response3.statusCode).to.be.oneOf([201, 200])
            if (response3.status == '201' || response3.status == '200') {
              console.log('3 update a person in fps Copy completed')
             // response_Value = response3.body
              //console.log(response_Value)
              /* ***************************4 Get Person restricted aliases-p2********************************************/

              /****Get Request****/
              const response4 = await getRequest(
                Common.URL.FPS,
                FPS2_endpoint,
                headers
              )
             
              expect(response4.statusCode).to.be.oneOf([201, 200])
              expect(response4.body.createdAt).not.to.be.null
              if ((response4.statusCode == '200') | (response4.statusCode == '201')) {
                expect(response4.body.createdAt).not.to.be.null
                expect(response4.body.first_name).to.be.equal( response3.body.first_name,"Check the updated first name");
                expect(response4.body.last_name).to.be.equal( response3.body.last_name,"Check the updated last name");
               // expect(response4.body.preference.global.country).to.be.equal(FPSTestData['3_country'],"Check the updated country value");
              // expect(response4.body.preference.global.language).to.be.equal( response3.body.preference.global.language," Check the updated language value");
                expect(response4.body.person_uuid).to.be.equal( response3.body.person_uuid," Check the person uuid ");
                for(var index2=0; i2 < response3.body.aliases.length; index2++) 
                {

                for(var i2=0; i2 < response4.body.aliases.length; i2++) 
                {
                  
                  if (response4.body.aliases[i2].source_id == response3.body.aliases[index2].source_id)
                      {
                        expect(response4.body.aliases[i2].source).to.be.equal(response3.body.aliases[index2].source,"Check the updated source value");
                        expect(response4.body.aliases[i2].source_id).to.be.equal(response3.body.aliases[index2].source_id,"Check the updated source_id value");
                        break;
                      }
                }

              }
                console.log('4 Get Person restricted aliases-p2 Completed')

                /* ***************************5 POST person event SUBSCRIBED - source: Newsletter Copy 2********************************************/
              }

              let entity_id
              if (FPSTestData['5_entity'] == 'email') {
                entity_id = response4.body.email
              } else {
                entity_id = FPSTestData['5_entity_id']
              }

              const FPS5response = FPS5_Build_Json(
                response4.body.person_uuid,
                FPSTestData['5_entity'], //email or SMS from test data.json
                entity_id, //email id from previous reponse
                FPSTestData['5_source']
              )

              /****Post Request****/
              const response5 = await postRequest(
                Common.URL.FPS,
                FPS5_endpoint, //https://preprod.fps.aesopdigital.io/v1/person/events
                headers,
                JSON.stringify(FPS5response)
              )
              
              expect(response5.statusCode).to.be.oneOf([201, 200, 202])
              if (
                response5.status == '201' ||
                response5.status == '200' ||
                response5.status == '202'
              ) {
                expect(response5.body.entity).to.be.equal( FPSTestData['5_entity'],"Check the updated entity" + FPSTestData['5_entity']);
                expect(response5.body.entity_id).to.be.equal( entity_id,"Check the updated entity id" + entity_id);
                expect(response5.body.source).to.be.equal( FPSTestData['5_source'],"Check the updated entity id" + FPSTestData['5_source']);

                console.log('5 POST person event SUBSCRIBED completed')
               
                await sleep(2000);

                /* **************************6 Get Person restricted optins-p3****************************************/
                /****Get Request****/
                const response6 = await getRequest(
                  Common.URL.FPS,
                  FPS2_endpoint,
                  headers
                )
                //console.log(response6.text)
                expect(response6.status).to.be.oneOf([201, 200, 202])
                expect(response6.body.createdAt).not.to.be.null
                if (
                  response6.status == '201' ||
                  response6.status == '200' ||
                  response6.status == '202'
                ) {
                 
                  expect(response6.body.optins[FPSTestData['5_entity']][0].id).to.be.equal( entity_id,"Check the updated entity id" + entity_id);
                

                  console.log('6 Get Person restricted optins-p3 completed')

                  /**********************************7a create a new tx currency Hybris single item order************************************ */

                  if (FPSTestData['transaction'] == 'TxnItem 1') {
                     FPS7response = FPS7A_Build_Json(
                      response6.body.person_uuid,
                      FPSTestData['7_sbs_no'],
                      FPSTestData['7_store_no'],
                      FPSTestData['7_newsource'],
                      FPSTestData['7_currency'],
                      FPSTestData['7_shipping_method'],
                      FPSTestData['7_status'],
                      FPSTestData['7_tax_type'],
                      FPSTestData['7_payment_method']
                    )
                  } else if (FPSTestData['transaction'] == 'TxnItem 2') {

                  /**********************************7b create a new tx currency Hybris 2 item order************************************ */
                     FPS7response = FPS7B_Build_Json(
                      response6.body.person_uuid,
                      FPSTestData['7_sbs_no'],
                      FPSTestData['7_store_no'],
                      FPSTestData['7_newsource'],
                      FPSTestData['7_currency'],
                      FPSTestData['7_shipping_method'],
                      FPSTestData['7_status'],
                      FPSTestData['7_tax_type'],
                      FPSTestData['7_payment_method']
                    )
                  } else {
                    /**********************************7 create a new tx in fps-Hybris************************************ */

                     FPS7response = FPS7_Build_Json(
                      response6.body.person_uuid,
                      FPSTestData['7_sbs_no'],
                      FPSTestData['7_store_no'],
                      FPSTestData['7_newsource'],
                      FPSTestData['7_currency'],
                      FPSTestData['7_shipping_method'],
                      FPSTestData['7_status'],
                      FPSTestData['7_tax_type'],
                      FPSTestData['7_payment_method']
                    )
                  }

                  //Write a file to JSON
                  const response7 = await postRequest(
                    Common.URL.FPS,
                    FPS7_endpoint,
                    headers,
                    JSON.stringify(FPS7response)
                  )

                  console.log(response7.body);

                  expect(response7.statusCode).to.be.oneOf(
                    [201, 200],
                    'Sucessfully created person for FPS'
                  )
                  expect(response7.body.createdAt).not.to.be.null
                  if (
                    response7.status == '201' ||
                    response7.status == '200' ||
                    response7.status == '202'
                  ) {
                expect(response7.body.sbs_no).to.be.equal( FPSTestData['7_sbs_no'],"Check the updated sbs_no");
                expect(response7.body.store_no).to.be.equal( FPSTestData['7_store_no'],"Check the updated store_no");
                expect(response7.body.status).to.be.equal( FPSTestData['7_status'],"Check the updated status");


                    console.log('7 create a new tx in fps-Hybris completed')
                    

                    /*let new_source_tx_id = response7.body.source_tx_id
                    let new_shipping_method = response7.body.shipping_method
                   */

                   /*************************************8 Returns the list of transaction related to a person**************** */

                    /****Get Request****/

                    const response8 = await getRequest(
                      Common.URL.FPS,
                      FPS8_endpoint,
                      headers
                    )
                    
                    expect(response8.statusCode).to.be.oneOf([201, 200])
                    expect(response8.body.createdAt).not.to.be.null
                    if (response8.statusCode == '200' || response8.statusCode == '201') {
                     
                      expect(response7.body.person_uuid).to.be.equal( response8.body[0].person_uuid,"Check the person_uuid or fpd_is");
                      expect(response7.body.tx_uuid).to.be.equal( response8.body[0].tx_uuid,"Check the updated store_no");
                      expect(response7.body.sbs_no).to.be.equal( response8.body[0].sbs_no,"Check the updated sbs_no");
                      expect(response7.body.store_no).to.be.equal( response8.body[0].store_no,"Check the store_no");
                      expect(response7.body.currency).to.be.equal( response8.body[0].currency,"Check the updated currency");
                      expect(response7.body.total_cost_aud).to.be.equal( response8.body[0].total_cost_aud,"Check the updated total_cost_aud");
                      expect(response7.body.status).to.be.equal( response8.body[0].status,"Check the status");
                      expect(response7.body.order_total).to.be.equal( response8.body[0].order_total,"Check the order_total");
                      
                      console.log(
                        '8 Returns the list of transaction related to a person-Completed'
                      )
                     

                      /*************************************10 Create transaction-PartialCancel**************** */
                        
                      let FPS10_endpoint =
                        '/transaction/by-source' +
                        '/' +
                        response8.body[0].source +
                        '/' +
                        response8.body[0].source_tx_id

                          /**********************************10a create a new tx currency Hybris single item order************************************ */

                  if (FPSTestData['transaction'] == 'TxnItem 1') {
                     FPS10response = FPS10A_Build_Json(
                      response8.body[0].person_uuid,
                      FPSTestData['10_newsbs_no'],
                      FPSTestData['10_newstore_no'],
                      FPSTestData['10_newsource'],
                      response8.body[0].source_tx_id,
                      response8.body[0].tx_uuid,
                      FPSTestData['10_newcurrency'],
                      FPSTestData['10_newstatus'],
                      FPSTestData['10_isgift'],
                      FPSTestData['10_taxtype'],
                      response8.body[0].total_cost_aud
                    )
                  } else if (FPSTestData['transaction'] == 'TxnItem 2') {

                  /**********************************10b create a new tx currency Hybris 2 item order************************************ */
                   FPS10response = FPS10B_Build_Json(
                    response8.body[0].person_uuid,
                    FPSTestData['10_newsbs_no'],
                    FPSTestData['10_newstore_no'],
                    FPSTestData['10_newsource'],
                    response8.body[0].source_tx_id,
                    response8.body[0].tx_uuid,
                    FPSTestData['10_newcurrency'],
                    FPSTestData['10_newstatus'],
                    FPSTestData['10_isgift'],
                    FPSTestData['10_taxtype'],
                    response8.body[0].total_cost_aud
                  )

                  
                  } 

                  else{
                     FPS10response = FPS10_Build_Json(
                      response8.body[0].person_uuid,
                      FPSTestData['10_newsbs_no'],
                      FPSTestData['10_newstore_no'],
                      FPSTestData['10_newsource'],
                      response8.body[0].source_tx_id,
                      response8.body[0].tx_uuid,
                      FPSTestData['10_newcurrency'],
                      FPSTestData['10_newstatus'],
                      FPSTestData['10_isgift'],
                      FPSTestData['10_qty'],
                      FPSTestData['10_taxtype'],
                      response8.body[0].total_cost_aud
                    )
                  }

                  console.log(FPS10response)

                  await sleep(2000);

                      const response10 = await patchRequest(
                        Common.URL.FPS,
                        FPS10_endpoint,
                        headers,
                        JSON.stringify(FPS10response)
                      )

                     
                      console.log(response10.text)

                      expect(response10.statusCode).to.be.oneOf([201, 200,202])
                      expect(response10.body.createdAt).not.to.be.null
                      if (
                        response10.statusCode == '200' ||
                        response10.statusCode == '201'||
                        response10.statusCode == '202'
                      ) {
                        console.log(
                          '10 Create transaction-PartialCancel-Completed'
                        )

                        /*************************************11 Get the updated partial values**************** */

                        let FPS11_endpoint =
                          '/transaction' + '/' + response8.body[0].tx_uuid
                        
                        const response11 = await getRequest(
                          Common.URL.FPS,
                          FPS11_endpoint,
                          headers
                        )

                       

                        expect(response11.statusCode).to.be.oneOf([201, 200])
                        expect(response11.body.createdAt).not.to.be.null
                        if (
                          response11.statusCode == '200' ||
                          response11.statusCode == '201'
                        ) {

                          console.log(response11.body);
                          for (var index3=0 ; index3 < FPS10response.lines.length; index3++)
                          {
                          for (var i3 = 0; i3 < response11.body.lines.length; i3++)
                          {   
                            if  (response11.body.lines[i3].sku  == FPS10response.lines[index3].sku)
                            {
                            expect(response11.body.lines[i3].sku).to.be.equal(FPS10response.lines[index3].sku,"Verify the cancelled SKU ");
                            expect(response11.body.lines[i3].cancelled[0].shipping_cancelled).to.be.equal( FPS10response.lines[index3].cancelled[0].shipping_cancelled,"Verify shipping_cancelled");
                            expect(response11.body.lines[i3].cancelled[0].qty_cancelled).to.be.equal( FPS10response.lines[index3].cancelled[0].qty_cancelled,"Verify qty_cancelled");
                            break;
                          }
                          }

                          }

                          expect(response11.body.status).to.be.equal( FPSTestData['10_newstatus'],"Verify the status value");
                          expect(response11.body.payments.length ).to.be.greaterThan( 0,"Verify the payment type greater than 0");
                          expect(response11.body.sbs_no).to.be.equal( FPSTestData['10_newsbs_no'],"Verify the sbs_no");
                          expect(response11.body.store_no).to.be.equal( FPSTestData['10_newstore_no'],"Verify the store_no ");
                          expect(response11.body.tx_uuid).to.be.equal( response8.body[0].tx_uuid,"Verify the tx_uuid value");
                          
                         
                          console.log(
                            '11 Get the updated partial values-completed'
                          )

                          

                          /*************************************12 POST person event UNSUBSCRIBED - source:**************** */
                          const FPS12response = FPS12_Build_Json(
                            response11.body.person_uuid,
                            FPSTestData['5_entity'],
                            entity_id,
                            response11.body.source
                          )

                          let FPS12_endpoint = '/person/events'
                          const response12 = await postRequest(
                            Common.URL.FPS,
                            FPS12_endpoint,
                            headers,
                            JSON.stringify(FPS12response)
                          )
                          
                          expect(response12.statusCode).to.be.oneOf([201, 200, 202])
                          expect(response12.body.createdAt).not.to.be.null
                          if (
                            response12.statusCode == '200' ||
                            response12.statusCode == '201' ||
                            response12.statusCode == '202'
                          ) {
                            console.log(
                              '12 POST person event UNSUBSCRIBED - source  completed'
                            )
                            /*************************************13 Get Person restricted optins details-false**************** */
                            const response13 = await getRequest(
                              Common.URL.FPS,
                              FPS2_endpoint,
                              headers
                            )
                            expect(response13.statusCode).to.be.oneOf([
                              201,
                              200
                            ])
                            expect(response13.body.createdAt).not.to.be.null
                            if (
                              response13.status == '201' ||
                              response2.status == '200'
                            ) {
                              response_Value = response13.body

                              expect(response13.body.optins[FPSTestData['5_entity']][0].id).to.be.equal(response12.body.entity_id,"Verify the optins id value exists");
                             // expect(response13.body.optins[FPSTestData['5_entity']][0].status).to.be.equal(false,"Verify the optins status");
                              expect(response13.body.optins[FPSTestData['5_entity']][0].reason).to.be.equal( response12.body.payload.reason,"Verify the optins reason");
                              expect(response13.body.optins[FPSTestData['5_entity']][0].last_modified_source).to.be.equal( response12.body.source,"VVerify the optins last_modified_source ");
                              
                              console.log(
                                '13 Get Person restricted optins details-false-completed'
                              )
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }).timeout(40000)
    }
  })
})
