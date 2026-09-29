import { APIRequestContext, APIResponse, expect, request } from '@playwright/test'

export class API {
    public client !: APIRequestContext
    protected headers : Record<string, any> = {}
    protected baseUrl : string

    constructor(baseUrl: string, headers : Record<string,any>){
        this.baseUrl = baseUrl
        this.headers = headers
    }

    async createSession(){
        this.client = await request.newContext({baseURL:this.baseUrl, extraHTTPHeaders:this.headers})
    }

    async closeSession(){
        await this.client.dispose()
    }

    async verifyResponse(response: APIResponse , options:{statusCode?: number , schema ?: Record<string, any>}){
        expect(response.status()).toBe(options.statusCode)
        if(options.schema){
            expect(await response.json()).toMatchObject(options.schema)
        }
        
    }

}