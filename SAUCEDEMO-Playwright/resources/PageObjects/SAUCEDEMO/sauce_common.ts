import {expect} from '@playwright/test'
import { CommonKeywords } from '../../common'
import * as loginPage from './loginPage'

export class CommonSauceDemo{
    constructor(public readonly common:CommonKeywords){
    }

    async LoginSauce(userName:string,pass:string){
        await this.common.fillText(loginPage.loginPageLocators['inputName'],userName)
        await this.common.fillText(loginPage.loginPageLocators['inputPass'],pass)
        await this.common.clickElement(loginPage.loginPageLocators['submitBtn'])
    }

    async ToastError(errorText:string){
        let locator = this.common.page.locator(loginPage.loginPageLocators['toast'])

        if(await locator.isVisible()){
            await expect(locator).toContainText(errorText)
        }else{
            throw new Error('No Toast were found on this page.')
        }
    }
}