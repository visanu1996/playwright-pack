import { test, expect } from '@playwright/test'
import * as configFile from '../config/config'
import * as commonPage from '../resources/common'
import * as sourceDemo from '../resources/PageObjects/SAUCEDEMO/sauce_common'

let common: commonPage.CommonKeywords
let sauce : sourceDemo.CommonSauceDemo

test.describe.serial('QA-DEMO', () => {
    test.setTimeout(0)
    test.beforeAll(async () => {
        common = new commonPage.CommonKeywords()
        sauce = new sourceDemo.CommonSauceDemo(common)
        await common.createWebDriver()
        await common.createPage(configFile.webURL,'sauce')
        // let video = page.video()
    })
    test.afterAll(async () => {
        await common.context.close()
        await common.browser.close()
    })
    test('TC001 Login with lock credential', async () => {
        common.setPage('sauce')
        await sauce.LoginSauce('locked_out_user','secret_sauce')
        await sauce.ToastError('locked out.')

    })
    test('TC002 Login with wrong cred', async()=>{
        await sauce.LoginSauce('wrong','secret_sauce')
        await sauce.ToastError('not match')
    })

    test('TC003 Login without password', async()=>{
        await sauce.LoginSauce('wrong','')
        await sauce.ToastError('Password is required')
    })
test('TC004 Login without username', async()=>{
        await sauce.LoginSauce('','secret_sauce')
        await sauce.ToastError('Username is required')
        await common.page.waitForTimeout(5000)
    })
})
