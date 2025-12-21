import { expect } from "@playwright/test"
import { CommonKeywords } from "../../common"

export const loginPageLocators = {
    loginLogo:"xpath=//div[@class='login_logo']",
    inputName:"xpath=//input[@id='user-name']",
    inputPass:"xpath=//input[@id='password']",
    submitBtn:"xpath=//input[@id='login-button']",
    toast:"xpath=//h3[@data-test='error']"
}

    export async function LoginSauce(common:CommonKeywords,userName:string,pass:string){
        await common.fillText(loginPageLocators['inputName'],userName)
        await common.fillText(loginPageLocators['inputPass'],pass,true)
        await common.clickElement(loginPageLocators['submitBtn'])
    }