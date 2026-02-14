import { test } from '@playwright/test'
import * as configFile from '../../config/config'
import * as testdata from '../../config/testdata'
import * as commonPage from '../../resources//common'
import * as sauceDemo from '../../resources/PageObjects/SAUCEDEMO/sauce_common'

let common: commonPage.CommonKeywords
let sauce: sauceDemo.CommonSauceDemo

test.describe.serial('SauceDemo Data Driven', () => {
    test.setTimeout(0);
    test.beforeAll(async () => {
        common = new commonPage.CommonKeywords()
        sauce = new sauceDemo.CommonSauceDemo(common)
        await common.createWebDriver()
        await common.createPage(configFile.webURL, "sauce")
        common.setPage('sauce')
    });

    test.afterAll(async () => {
        await common.page.waitForTimeout(5000)
        common.closeWebDriver()
    });

    test('Full Run', async () => {
        await sauce.runFullTest(testdata.username.standard, testdata.password, ['Backpack', 'Bike Light'], 'Berk', 'Rising', '10210')
    });
})
