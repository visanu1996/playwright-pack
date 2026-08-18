import { test } from '@playwright/test'
import { WebDriverManagement } from '../../utils/driverFactory'
import { BasePage } from '../../resources/basePage'
import { SDCommon } from '../../resources/PageObjects/SAUCEDEMO/sauce_common'

let wd: WebDriverManagement
let basePage: BasePage
let sauce: SDCommon

test.describe.serial('SauceDemo Data Driven', () => {
    test.setTimeout(0);
    test.beforeAll(async () => {
        wd = new WebDriverManagement()
        basePage = new BasePage(wd)
        sauce = new SDCommon(wd)

        await wd.startBrowser()
        await sauce.createPage(sauce.config.webURL, 'sauce')
    });

    test.afterAll(async () => {
        await sauce.page.waitForTimeout(5000)
        wd.closeBrowser()
    });

    test('Full Run', async () => {
        await sauce.runFullTest(sauce.testData.user.standard, sauce.testData.password, ['Backpack', 'Bike Light'], 'Berk', 'Rising', '10210')
    });
})
