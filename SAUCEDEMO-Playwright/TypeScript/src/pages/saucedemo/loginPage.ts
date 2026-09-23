import { BasePage } from "@core/BasePage"

export class SDLoginPage extends BasePage {
    protected loginPageLocators = {
        loginLogo:"xpath=//div[@class='login_logo']",
        inputName:"xpath=//input[@id='user-name']",
        inputPass:"xpath=//input[@id='password']",
        submitBtn:"xpath=//input[@id='login-button']",
        toast:"xpath=//h3[@data-test='error']"
    }
    async LoginSauce(username:string, password:string){
        await this.fillText(this.loginPageLocators['inputName'],username)
        await this.fillText(this.loginPageLocators['inputPass'],password,{isSecret:true})
        await this.clickElement(this.loginPageLocators['submitBtn'])
    }
}
