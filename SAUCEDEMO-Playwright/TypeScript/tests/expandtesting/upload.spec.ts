import { test } from "@playwright/test";
import { WebDriver } from "@src/core/DriverFactory";
import { UploadPage } from "@src/pages/expandtesting/uploadPage";


let wd: WebDriver;
let upload: UploadPage;

test.describe("Upload Testing", async () => {
    test.beforeEach(async()=>{
        wd = new WebDriver()

        await wd.startBrowser()
        upload = new UploadPage(wd)

        await upload.createUploadPage()
    })

    test.afterEach(async()=>{
        await wd.closeBrowser()
    })

    test('TC001-Upload one file', async()=>{
        await upload.uploadAndSubmit('file1.txt')
        await upload.page.waitForTimeout(5000)
    })
});
