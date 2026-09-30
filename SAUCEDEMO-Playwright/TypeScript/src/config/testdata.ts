// Normally you don't push secret to github !
export const user = {
    "standard": "standard_user",
    "locked": "locked_out_user",
    "probmel": "problem_user",
    "performance": "performance_glitch_user",
    "error": "error_user",
    "visual": "visual_user",
}

export const password = "secret_sauce"

export const apis = {
    baseUrl : {
       sd : 'https://env.saucedemo.com/v1',
       booker : 'https://restful-booker.herokuapp.com/',
    },
    auth : {
        booker : {
            user : 'admin',
            password : 'password123'
        }
       
    }
}

export const bookingPayload = {
    firstname: 'John',
    lastname: 'Brown',
    totalprice: '300' as const,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-01-01',
      checkout: '2026-01-07',
    },
    additionalneeds: 'Breakfast',
  };