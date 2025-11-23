import { expect } from '@playwright/test'
import { CommonKeywords } from '../../common'
import * as loginPage from './loginPage'

export class CommonSauceDemo {
    constructor(public readonly common: CommonKeywords) {
    }

    async runFullTest(userName: string, pass: string) {
        await loginPage.LoginSauce(this.common, userName, pass)

    }

    async runLoginTest(userName: string, pass: string, checkToast: boolean = false, errorText: any = null){
        await loginPage.LoginSauce(this.common, userName, pass)
        if (checkToast) {
            await loginPage.ToastError(this.common, errorText);
            console.log(`Toast error match!`)
        }
    }
    // adding full control for all SAUCEDEMO Page later.
}