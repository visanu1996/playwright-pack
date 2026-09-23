import { BasePage } from "@src/core/BasePage";

export class UploadPage extends BasePage {
    protected uploadPageLocator = {
        fileInput : "xpath=//input[@data-testid='file-input']",
        submitBtn : "xpath=//button[@data-testid='file-submit']"
    }

    async uploadAndSubmit(...fileInput: string[]){
        await this.uploadFiles(this.uploadPageLocator.fileInput, ...fileInput)
        await this.page.locator(this.uploadPageLocator.submitBtn).click({force:true})
    }

    // no need to create centralize at this time.
    async createUploadPage(){
        await this.createPage('https://practice.expandtesting.com/upload','upload')
    }
}