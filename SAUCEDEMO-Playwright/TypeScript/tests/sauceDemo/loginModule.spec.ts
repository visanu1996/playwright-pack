import { test } from '@playwright/test'
import * as configFile from '../../config/config'
import * as commonPage from '../../resources/common'
import * as sourceDemo from '../../resources/PageObjects/SAUCEDEMO/sauce_common'

let common: commonPage.CommonKeywords
let sauce: sourceDemo.CommonSauceDemo

test.describe.serial('QA-DEMO', () => {
    test.setTimeout(0)
    test.beforeAll(async () => {
        common = new commonPage.CommonKeywords()
        sauce = new sourceDemo.CommonSauceDemo(common)
        await common.createWebDriver()
        await common.createPage(configFile.webURL, 'sauce')
        // let video = page.video()
    })
    test.afterAll(async () => {
        await common.page.waitForTimeout(5000)
        common.closeWebDriver()
    })

    test('TC001 Login with lock credential', async () => {
        common.setPage('sauce')
        await sauce.runLoginTest('locked_out_user', 'secret_sauce', true, 'locked out.')
    })
    test('TC002 Login with wrong cred', async () => {
        await sauce.runLoginTest('wrong', 'secret_sauce', true, 'not match')
    })
    test('TC003 Login without password', async () => {
        await sauce.runLoginTest('wrong', '', true, 'Password is required')
    })
    test('TC004 Login without username', async () => {
        await sauce.runLoginTest('', 'secret_sauce', true, 'Username is required')
    })
    test('TC005 Login with valid credential', async () => {
        await sauce.runLoginTest('standard_user', 'secret_sauce')
    })
})
