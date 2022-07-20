import request from 'supertest'
import XMLHttpRequest from 'xhr2'
export const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'x-api-key': 'JVH38u24I67RHnyT6x2i42eTI9YQB1XA890AfA0B'
}
var date = new Date()
var datestring = date.toISOString()
var date2 = date;
date2.setHours(date2.getHours() - 2); 
var index = Math.floor(Math.random() * 999999999);
var source_tx_id="TXN_1234_"+ index;
var index1 = Math.floor(Math.random() * 999)
var index2 = Math.floor(Math.random() * 999)
let streetaddress, postal_code, town, region
let milliseconds = new Date().getTime()
let addressarray = []
var source_customer_id=Math.floor(Math.random() * 9999999999999);

export const getRequest = async (baseUrl, apiEndPoint, headers) => {
  try {
    const response = await request(baseUrl)
      .get(apiEndPoint)
      .retry(2)
      .set(headers)
    return response
  } catch (error) {
    throw new Error('Error in GET Request: ' + error)
  }
}

export const FPS1_Build_Json = async (homestore, datasource, country) => {
 let FPS1;
  try {
    if (country != null) {
      const res = await getRequest(
        'https://randomuser.me/api',
        '/?nat=' + country,
        headers
      )
      console.log(res.body.results[0].phone);
      streetaddress =
      res.body.results[0].location.street.number +
        ' ' +
      res.body.results[0].location.street.name
      town = res.body.results[0].location.city
      region = res.body.results[0].location.state
      country = res.body.results[0].location.country
      postal_code = res.body.results[0].location.postcode
      addressarray = [
        {
          first_name: 'Bifrost-' + index1,
          last_name: 'Surname-' + index1 + index2,
          phone: '+61411' + index1 + index2,
          line_1: streetaddress,
          town: town,
          region: region,
          postal_code: postal_code.toString(),
          country: country,
          is_default: true
        }
      ]

       FPS1 = {
        created: datestring,
        email: 'bifrost.' + datestring.split(':')[2] + '@gmail.com',
        phone: '+61411' + index1 + index2,
        first_name: 'Bifrost-' + index1,
        last_name: 'Surname-' + index1 + index2,
        customer_group_id: 'CUS99',
        home_store: homestore,
        addresses: addressarray,
        alias: {
          source: datasource,
          source_id: milliseconds.toString()
        }
      }
    } else {
       FPS1 = {
        created: datestring,
        email: 'bifrost.' + datestring.split(':')[2] + '@gmail.com',
        phone: '+61411' + index1 + index2,
        first_name: 'Bifrost-' + index1,
        last_name: 'Surname-' + index1 + index2,
        customer_group_id: 'CUS99',
        home_store: homestore,
        addresses: [],
        alias: {
          source: datasource,
          source_id: milliseconds.toString()
        }
      }
    }
  } catch (error) {
    throw new Error('Error in JSON build for Scenario1 ' + error)
  }
  return FPS1
}


 export const FPS3_Build_Json = async (fps_id,
  first_name,
  source_id,home_store,source,country) => {
  
    let FPS3;
  try { if (country != null) {
    const res = await getRequest(
      'https://randomuser.me/api',
      '/?nat=' + country,
      headers
    )
    console.log(res.body.results[0].phone);
    streetaddress =
    res.body.results[0].location.street.number +
      ' ' +
    res.body.results[0].location.street.name
    town = res.body.results[0].location.city
    region = res.body.results[0].location.state
    country = res.body.results[0].location.country
    postal_code = res.body.results[0].location.postcode
    addressarray = [
      {
        first_name: 'Bifrost-' + index1,
        last_name: 'Surname-' + index1 + index2,
        phone: '+61411' + index1 + index2,
        line_1: streetaddress,
        town: town,
        region: region,
        postal_code: postal_code.toString(),
        country: country,
        is_default: true
      }
    ]

    FPS3 = {
      person_uuid: fps_id,
      first_name: first_name,
      email: '',
      home_store: home_store,
      alias: {
        person_uuid: fps_id,
        source: source,
        source_id: source_id,
      addresses: addressarray
      }
    }
  } else {
    FPS3 = {
      person_uuid: fps_id,
      first_name: first_name,
      email: '',
      home_store: home_store,
      alias: {
        person_uuid: fps_id,
        source: source,
        source_id: source_id,
      addresses: []
      }
    }
  }
    

    return FPS3
  } catch (error) {
    throw new Error('Error in JSON build for Scenario3 ' + error)
  }
}

export function FPS5_Build_Json (
  fps_id,
  entity,
  entityid,
  Aliases_source
) {
  try {
       const FPS5 = {
      aggregate: 'person',
      aggregate_id: fps_id,
      event_type: 'SUBSCRIBED',
      entity: entity,
      entity_id: entityid,
      event_datetime: datestring,
      version: '1.0',
      source: Aliases_source,
      source_event_id: "Event" + index,
      payload: {
        datetime: date2.toISOString(),
        reason: 'Testing-Subscribed'
      }
    }

    return FPS5
  } catch (error) {
    throw new Error('Error in JSON build for Scenario 5' + error)
  }
}

export function FPS7_Build_Json (
 
  fps_id, sbs_no,
  store_no,
  newsource,
  currency,
  shipping_method,
  status,
  tax_type,payment_method
) {
  try {
    
    const FPS7 = {
      source_customer_id: source_customer_id.toString(),
      sbs_no: sbs_no,
      store_no: store_no,
      shipping_method: shipping_method,
      status: status,
      is_open: true,
      last_modified: date2.toISOString(),
      person_uuid: fps_id,
      source_tx_id: source_tx_id,
      source: newsource,
      order_total: '466',
      order_total_tax: '0',
      order_discounts: '0',
      currency: currency,
      total_cost_aud: '466.00',
      payments: [
        {
          payment_method: payment_method
        }
      ],
      created: date2.toISOString(),
      lines: [
        {
          sku: 'ASK09',
          returned: [],
          cancelled: [],
          qty: 5,
          item_price: '53.636',
          line_total: '268.18',
          line_total_tax: '26.82',
          line_taxes: [
            {
              tax_type: tax_type,
              tax_amt: '26.82'
            }
          ]
        },
        {
          sku: 'B100HR22RF',
          returned: [],
          cancelled: [],
          qty: 3,
          item_price: '17.273333333333333',
          line_total: '51.82',
          line_total_tax: '5.18',
          line_taxes: [
            {
              tax_type: tax_type,
              tax_amt: '5.18'
            }
          ]
        },
        {
          sku: 'AHR09',
          returned: [],
          cancelled: [],
          qty: 2,
          item_price: '33.635',
          line_total: '67.27',
          line_total_tax: '6.73',
          line_taxes: [
            {
              tax_type: tax_type,
              tax_amt: '6.73'
            }
          ]
        },
        {
          sku: 'B120BM06',
          returned: [],
          cancelled: [],
          qty: 1,
          item_price: '36.36',
          line_total: '36.36',
          line_total_tax: '3.64',
          line_taxes: [
            {
              tax_type: tax_type,
              tax_amt: '3.64'
            }
          ]
        }
      ]
    }
 
    return FPS7;

    
  } catch (error) {
    throw new Error('Error in JSON build for Scenario 7' + error)
  }
}


export function FPS7A_Build_Json (
 
  fps_id, sbs_no,
  store_no,
  newsource,
  currency,
  shipping_method,
  status,
  tax_type,payment_method
) {
  try {
    
    const FPS7A = {
      source_customer_id: source_customer_id.toString(),
      sbs_no: sbs_no,
      store_no: store_no,
      shipping_method: shipping_method,
      status: status,
      is_open: true,
      last_modified: date2.toISOString(),
      person_uuid: fps_id,
      source_tx_id: source_tx_id,
      source: newsource,
      order_total: '53.63',
      order_total_tax: '0',
      order_discounts: '0',
      currency: currency,
      total_cost_aud: '53.63',
      payments: [
        {
          payment_method: payment_method
        }
      ],
      created: date2.toISOString(),
      lines: [
        {
          sku: 'ASK09',
          returned: [],
          cancelled: [],
          qty: 5,
          item_price: '53.636',
          line_total: '53.63',
          line_total_tax: '5.36',
          line_taxes: [
            {
              tax_type: tax_type,
              tax_amt: '5.36'
            }
          ]
        }
      ]
    }
 
    return FPS7A;

    
  } catch (error) {
    throw new Error('Error in JSON build for Scenario 7A' + error)
  }
}


export function FPS7B_Build_Json (
 
  fps_id, sbs_no,
  store_no,
  newsource,
  currency,
  shipping_method,
  status,
  tax_type,payment_method
) {
  try {
    
    const FPS7B = {
      source_customer_id: source_customer_id.toString(),
      sbs_no: sbs_no,
      store_no: store_no,
      shipping_method: shipping_method,
      status: status,
      is_open: true,
      last_modified: date2.toISOString(),
      person_uuid: fps_id,
      source_tx_id: source_tx_id,
      source: newsource,
      order_total: '51.82',
      order_total_tax: '5.18',
      order_discounts: '0',
      currency: currency,
      total_cost_aud: '51.82',
      payments: [
        {
          payment_method: payment_method
        }
      ],
      created: date2.toISOString(),
      lines: [
        {
          sku: 'B100HR22RF',
          returned: [],
          cancelled: [],
          qty: 3,
          item_price: '17.273333333333333',
          line_total: '51.82',
          line_total_tax: '5.18',
          line_taxes: [
            {
              tax_type: tax_type,
              tax_amt: '5.18'
            }
          ]
        },
        {
        sku: "BSSK59",
        returned: [
            
        ],
        cancelled: [
            
        ],
        qty: 1,
        item_price: "0",
        line_total: "0",
        line_total_tax: "0",
        line_taxes: [
            {
            tax_type: tax_type,
            tax_amt: "0"
            }
        ]
        }
      ]
    }
 
    return FPS7B;

    
  } catch (error) {
    throw new Error('Error in JSON build for Scenario 7B' + error)
  }
}



export function FPS9_Build_Json (fps_id,source,tx_uuid) {
  try {
    
    const FPS9 = {
      
        created: datestring,
        person_uuid: fps_id,
        sbs_no: 3,
        store_no: 999,
        shipping_method: 'Standard',
        source: source,
        source_customer_id: source_customer_id.toString(),
        source_tx_id: source_tx_id,
        status: 'Returned',
        tx_uuid: tx_uuid,
        currency: 'AUD',
        is_open: true,
        lines: [
          {
            is_gift: false,
            item_price: 33.635,
            line_taxes: [
              {
                tax_amt: 6.73,
                tax_type: tax_type
              }
            ],
            line_total: 67.27,
            line_total_aud: 67.27,
            line_total_tax: 6.73,
            line_total_tax_aud: 6.73,
            qty: 2,
            sku: 'AHR09',
            status: 'Processing',
            returned: [
              {
                date: datestring,
                qty_returned: 2,
                shipping_returned: true
              }
            ]
          }
        ]
      }
      
    
 
    return FPS9;

    
  } 
  catch (error) {
    throw new Error('Error in JSON build for Scenario 9' + error)
  }

}



export function FPS10_Build_Json (fps_id,
  sbs_no,
  store_no,
  newsource,
  source_tx_id,
  tx_uuid,
  currency,newstatus,isgift, qty,tax_type,new_total_cost_aud
  ) {
  try {
    
    const FPS10 = {
      
            created: datestring,
            person_uuid: fps_id,
            sbs_no: sbs_no,
            store_no: store_no,
            shipping_method: 'Standard',
            source: newsource,
            source_customer_id: source_customer_id.toString(),
            source_tx_id: source_tx_id,
            status: newstatus,
            tx_uuid: tx_uuid,
            currency: currency,
            is_open: true,
            is_gift: isgift,
            lines: [
              {
                
                item_price: 33.635,
                line_taxes: [
                  {
                    tax_amt: 6.73,
                    tax_type: tax_type
                  }
                ],
                line_total: 67.27,
                line_total_aud: new_total_cost_aud,
                line_total_tax: 6.73,
                line_total_tax_aud: 6.73,
                qty: 2,
                sku: 'AHR09',
                status: 'Processing',
                cancelled: [
                  {
                    date: datestring,
                    qty_cancelled:  qty,
                    shipping_cancelled: true
                  }
                ]
              },
              {
                item_price: 36.36,
                line_taxes: [
                  {
                    tax_amt: 3.64,
                    tax_type: tax_type
                  }
                ],
                line_total: 36.36,
                line_total_aud: 36.36,
                line_total_tax: 3.64,
                line_total_tax_aud: 3.64,
                qty: 1,
                sku: "B120BM06",
                status: "Processing",
                cancelled: [
                  {
                    date: datestring,
                    qty_cancelled: 1,
                    shipping_cancelled: true
                  }
                ]
              }
              ]
      }
      
            
 
    return FPS10;

    
  } 
  catch (error) {
    throw new Error('Error in JSON build for Scenario 10' + error)
  }

}


export function FPS10A_Build_Json (fps_id,
  sbs_no,
  store_no,
  newsource,
  source_tx_id,
  tx_uuid,
  currency,newstatus,isgift,tax_type,new_total_cost_aud
  ) {
  try {
    
    const FPS10A = {
      
            created: datestring,
            person_uuid: fps_id,
            sbs_no: sbs_no,
            store_no: store_no,
            shipping_method: 'Standard',
            source: newsource,
            source_customer_id: source_customer_id.toString(),
            source_tx_id: source_tx_id,
            status: newstatus,
            tx_uuid: tx_uuid,
            currency: currency,
            is_open: true,
            is_gift: isgift,
            lines: [
              {
                
                item_price: 53.63,
                line_taxes: [
                  {
                    tax_amt: 5.36,
                    tax_type: tax_type
                  }
                ],
                line_total: 53.63,
                line_total_aud: new_total_cost_aud,
                line_total_tax: 5.36,
                line_total_tax_aud: 5.36,
                qty: 1,
                sku: 'ASK09',
                status: 'Cancelled',
                returned: [],
                cancelled: [
                  {
                    date: datestring,
                    qty_cancelled: 1,
                    shipping_cancelled: true
                  }
                ]
              }
              ]
      }
      
            
 
    return FPS10A;

    
  } 
  catch (error) {
    throw new Error('Error in JSON build for Scenario 10A' + error)
  }

}

export function FPS10B_Build_Json (fps_id,
  sbs_no,
  store_no,
  newsource,
  source_tx_id,
  tx_uuid,
  currency,newstatus,isgift,tax_type,new_total_cost_aud
  ) {
  try {
    
    const FPS10B = {
      
            created: datestring,
            person_uuid: fps_id,
            sbs_no: sbs_no,
            store_no: store_no,
            shipping_method: 'Standard',
            source: newsource,
            source_customer_id: source_customer_id.toString(),
            source_tx_id: source_tx_id,
            status: newstatus,
            tx_uuid: tx_uuid,
            currency: currency,
            is_open: true,
            is_gift: isgift,
            lines: [
              {
               
                item_price: 17.273333333333333,
                line_taxes: [
                  {
                    tax_amt: 25.45,
                    tax_type: tax_type
                  }
                ],
                line_total: 51.82,
                line_total_aud: new_total_cost_aud,
                line_total_tax: 5.18,
                line_total_tax_aud: 5.18,
                qty: 3,
                sku: 'B100HR22RF',
                status: 'Processing',
                returned: [],
                cancelled: [
                  {
                    date: datestring,
                    qty_cancelled: 2,
                    shipping_cancelled: true
                  }
                ]
              },
              {
                item_price: 36.36,
                line_taxes: [
                  {
                    tax_amt: 3.64,
                    tax_type: tax_type
                  }
                ],
                line_total: 36.36,
                line_total_aud: 36.36,
                line_total_tax: 3.64,
                line_total_tax_aud: 3.64,
                qty: 1,
                sku: "BSSK59",
                status: "Processing",
                cancelled: [
                  {
                    date: datestring,
                    qty_cancelled: 1,
                    shipping_cancelled: true
                  }
                ]
              }
              ]
      }
      
            
 
    return FPS10B;

    
  } 
  catch (error) {
    throw new Error('Error in JSON build for Scenario 10B' + error)
  }

}

export function FPS12_Build_Json(fps_id,entity,entity_id,source)
{
  try {
    
    const FPS12 = {
      
       aggregate: 'person',
        aggregate_id: fps_id,
        event_type: 'UNSUBSCRIBED',
        entity: entity,
        entity_id: entity_id,
        event_datetime: datestring,
        version: '1.0',
        source: source,
        source_event_id: "Event" + index,
        payload: {
           datetime: date2.toISOString(),
           reason: 'Testing-UnSubscribed'
       }
      }
      
      
    
 
    return FPS12;

    
  } 
  catch (error) {
    throw new Error('Error in JSON build for Scenario 12' + error)
  }


}