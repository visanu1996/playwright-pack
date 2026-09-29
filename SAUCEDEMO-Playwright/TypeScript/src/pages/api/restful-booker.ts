import { API } from '@core/API'
import { apis } from '@src/config/testdata'

export class RestfulBooker extends API {
    protected headers : Record<string,any> = {'Content-Type':'application/json'}
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

    async createBooking(options: {
        firstname: string;
        lastname: string;
        totalprice: '300' | '500' | '1000';
        depositpaid: boolean;
        bookingdates: {
            checkin: string;
            checkout: string;
        };
        additionalneeds: string;
        }
    ){
        return await this.client.post('/booking',{headers:{},data:options})
    }

    async updateBooking(id:number ,options: {
        firstname: string;
        lastname: string;
        totalprice: '300' | '500' | '1000';
        depositpaid: boolean;
        bookingdates: {
            checkin: string;
            checkout: string;
        };
        additionalneeds: string;
        })
        {
            return await this.client.put(`/booking/${id}`, {
                headers: this.withAuthCookie(),
                data : options
            })
        }

    async partialUpdateBooking(id:number ,options: {
        firstname?: string;
        lastname?: string;
        totalprice?: '300' | '500' | '1000';
        depositpaid?: boolean;
        bookingdates?: {
            checkin?: string;
            checkout?: string;
        };
        additionalneeds?: string;
        })
        {
            return await this.client.patch(`/booking/${id}`, {
                headers: this.withAuthCookie(),
                data : options
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