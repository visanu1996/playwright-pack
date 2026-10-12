import { BasePage } from "@src/core/BasePage";

/**
 * UploadPage
 *
 * Page object for the file-upload demo flow. It centralizes file selection and
 * form submission for the expandtesting upload scenario.
 */
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