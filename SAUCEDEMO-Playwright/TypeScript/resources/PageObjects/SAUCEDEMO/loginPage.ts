import { BasePage } from "../../basePage"

export class SDLoginPage extends BasePage {
    loginPageLocators = {
        loginLogo:"xpath=//div[@class='login_logo']",
        inputName:"xpath=//input[@id='user-name']",
        inputPass:"xpath=//input[@id='password']",
        submitBtn:"xpath=//input[@id='login-button']",
        toast:"xpath=//h3[@data-test='error']"
    }
    async LoginSauce(userName:string, password:string){
        await this.fillText(this.loginPageLocators['inputName'],userName)
        await this.fillText(this.loginPageLocators['inputPass'],password)
        await this.clickElement(this.loginPageLocators['submitBtn'])
    }
}
