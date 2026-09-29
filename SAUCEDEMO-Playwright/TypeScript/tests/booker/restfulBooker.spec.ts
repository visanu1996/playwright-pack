import { expect, test } from '@playwright/test';
import { apis, bookingPayload } from '../../src/config/testdata';
import { RestfulBooker } from '../../src/pages/api/restful-booker';

let booker: RestfulBooker;
let createBookingId: number
test.describe.serial('Restful Booker API', () => {

  test.beforeEach(async () => {
    booker = new RestfulBooker(apis.baseUrl.booker, {
      'Content-Type': 'application/json',
    });
    await booker.createSession();
    await booker.getToken()
  });

  test.afterEach(async () => {
    await booker.closeSession();
  });

  test('Get All Books', async()=>{
    const response = await booker.getBookings()
    console.log(`\n${JSON.stringify(await response.json(),null,2)}\n`);
  })

  test('Get Book ID 2', async()=>{
    const response = await booker.getBookingById(2)
    console.log(`\n${JSON.stringify(await response.json(),null,2)}\n`);

  })

  test('Create Book', async()=>{
    const response = await booker.createBooking(bookingPayload)
        await booker.verifyResponse(response,
          {statusCode:200, schema:{ 
            bookingid: expect.any(Number),
            booking: {
                firstname: expect.any(String),
                lastname: expect.any(String),
                totalprice: expect.any(Number),
                depositpaid: expect.any(Boolean),
                bookingdates: {
                    checkin: expect.any(String),
                    checkout: expect.any(String)
                },
                additionalneeds: expect.any(String)
            }
          }
        })
        
    const body = await response.json()
    console.log(`\n${JSON.stringify(await response.json(),null,2)}\n`);
    createBookingId = body.bookingid
  })

  test('Partial Update Book', async()=>{
    const response = await booker.partialUpdateBooking(createBookingId,{additionalneeds:'High speed internet.'})
    await booker.verifyResponse(response,{statusCode:200, schema:{
        firstname: expect.any(String),
        lastname: expect.any(String),
        totalprice: expect.any(Number),
        depositpaid: expect.any(Boolean),
        bookingdates: {
            checkin: expect.any(String),
            checkout: expect.any(String)
        },
        additionalneeds: expect.any(String)
    }})

    console.log(`\n${JSON.stringify(await response.json(),null,2)}\n`);

  })

  test('Delete Book', async()=>{
    const response = await booker.deleteBooking(createBookingId)
    await booker.verifyResponse(response,{statusCode:201})
  })

});
