import { API } from '@core/API'
import { apis, bookingPayload } from '@src/config/testdata'

export class RestfulBooker extends API {
    private token = ''

    async getToken(){
        const response = await this.client.post('/auth',
            {
                headers:this.headers,
                data:{username: apis.auth.booker.user, password : apis.auth.booker.password

                }
            })
        
        const body = await response.json()
        this.token = body.token
    }

    async getBookings(){
        return await this.client.get('/booking')
    }

    async getBookingById(id: number){
        return await this.client.get(`/booking/${id}`)
    }

    async createBooking(data: typeof bookingPayload){
        return await this.client.post('/booking',{headers:{},data:data})
    }

    async updateBooking(id:number ,data : typeof bookingPayload)
        {
            return await this.client.put(`/booking/${id}`, {
                headers: this.withAuthCookie(),
                data : data
            })
        }

    async partialUpdateBooking(id:number , data: Partial<typeof bookingPayload>)
        {
            return await this.client.patch(`/booking/${id}`, {
                headers: this.withAuthCookie(),
                data : data
            })
        }

    async deleteBooking(id: number){
        return await this.client.delete(`/booking/${id}`,{headers:this.withAuthCookie()})
    }
        
    private withAuthCookie(): Record<string, string>{
        return {
            ...this.headers,
            Cookie : `token=${this.token}`
        }
    }
}