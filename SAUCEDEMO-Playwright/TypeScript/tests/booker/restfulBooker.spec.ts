import { expect, test } from '@playwright/test';
import { apis, bookingPayload, bookingSchema } from '../../src/config/testdata';
import { RestfulBooker } from '../../src/pages/api/restful-booker';


test.describe('Restful Booker API', () => {
  let booker: RestfulBooker;
  let createBookingId: number

  test.beforeEach(async () => {
    booker = new RestfulBooker(apis.baseUrl.booker);
    await booker.createSession();
    await booker.getToken()
  });

  test.afterEach(async () => {
    await booker.closeSession();
  });

  test('Get All Books', async()=>{
    const response = await booker.getBookings()
    await booker.verifyResponse(response, {statusCode: 200})
      
  })

  test('Get Created Book', async()=>{
    const response = await booker.createBooking(bookingPayload)
    createBookingId = (await response.json()).bookingid
    const getBookResponse = await booker.getBookingById(createBookingId)
    await booker.verifyResponse(getBookResponse, {statusCode: 200, schema: bookingSchema.booking})

  })

  test('Create Book', async()=>{
    const response = await booker.createBooking(bookingPayload)
    await booker.verifyResponse(response,
          {statusCode:200, schema: bookingSchema}
    )

    createBookingId = (await response.json()).bookingid
    await booker.deleteBooking(createBookingId)
  })

  test('Update Book', async() => {
    const resposne = await booker.createBooking(bookingPayload)
    createBookingId = (await resposne.json()).bookingid

    const updateResponse = await booker.updateBooking(createBookingId, {...bookingPayload, firstname: 'Lord', lastname: 'Rising'})
    await booker.verifyResponse(updateResponse, {statusCode: 200, schema: bookingSchema.booking})
  })


  test('Partial Update Book', async()=>{
    const response = await booker.createBooking(bookingPayload)
    createBookingId = (await response.json()).bookingid

    const updateResponse = await booker.partialUpdateBooking(createBookingId,{additionalneeds:'High speed internet.'})
    await booker.verifyResponse(updateResponse, {statusCode: 200, schema: bookingSchema.booking})

    await booker.deleteBooking(createBookingId)
  })

  test('Delete Book', async()=>{
    const response = await booker.createBooking(bookingPayload)
    createBookingId = (await response.json()).bookingid

    const deleteResponse = await booker.deleteBooking(createBookingId)
    await booker.verifyResponse(deleteResponse,{statusCode:201})
  })

});
