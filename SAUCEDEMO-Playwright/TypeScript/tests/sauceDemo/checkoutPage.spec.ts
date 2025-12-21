import { test } from '@playwright/test'
import * as configFile from '../../config/config'
import * as commonPage from '../../resources/common'
import * as sourceDemo from '../../resources/PageObjects/SAUCEDEMO/sauce_common'
import * as productPage from '../../resources/PageObjects/SAUCEDEMO/productPage'
import * as checkoutPage from '../../resources/PageObjects/SAUCEDEMO/checkoutPage'

let common: commonPage.CommonKeywords
let sauce: sourceDemo.CommonSauceDemo

test.describe.serial('QA-DEMO', () => {
    test.setTimeout(0)
    test.beforeAll(async () => {
        common = new commonPage.CommonKeywords()
        sauce = new sourceDemo.CommonSauceDemo(common)
        await common.createWebDriver()
        await common.createPage(configFile.webURL, 'sauce')
        common.setPage('sauce')
        await sauce.runLoginTest('standard_user', 'secret_sauce')
        await common.verifyPageArrive(productPage.productPageLocators.productHeader)

        await sauce.runAddProductTest(['Backpack', 'Bike Light', 'T-Shirt'])
        await sauce.goToCart(false)
        await sauce.verifyItemsInCartTest(['Backpack', 'Bike Light', 'T-Shirt'])
    })
    test.afterAll(async () => {
        await common.page.waitForTimeout(5000)
        common.closeWebDriver()
    })

    test('TC001 Not adding information in checkout information page.', async () => {
        // TODO : 
    })
})
