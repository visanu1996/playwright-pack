import { test } from '@playwright/test'
import * as configFile from '../../config/config'
import * as commonPage from '../../resources/common'
import * as sauceDemo from '../../resources/PageObjects/SAUCEDEMO/sauce_common'
import * as productPage from '../../resources/PageObjects/SAUCEDEMO/productPage'

let common: commonPage.CommonKeywords
let sauce: sauceDemo.CommonSauceDemo

test.describe.serial('QA-DEMO', () => {
    test.setTimeout(0);
    test.beforeAll(async () => {
        common = new commonPage.CommonKeywords()
        sauce = new sauceDemo.CommonSauceDemo(common)
        await common.createWebDriver()
        await common.createPage(configFile.webURL, 'sauce')
        common.setPage('sauce')
        await sauce.runLoginTest('standard_user', 'secret_sauce')
        await common.verifyPageArrive(productPage.productPageLocators.productHeader)
    });
    test.afterAll(async () => {
        await common.page.waitForTimeout(5000)
        common.closeWebDriver()
    });

    test('TC001 Add valid products and check it from cart', async () => {
        await sauce.runAddProductTest(['Backpack', 'Bike Light', 'T-Shirt'])
        await sauce.gotoPage("cart")
        await sauce.verifyItemsInCartTest(['Backpack', 'Bike Light', 'T-Shirt'])
    });

    test('TC002 Remove item from cart', async () => {
        await sauce.removeCartItemsTest(['Backpack', 'T-Shirt'])
    });
    test('TC003 Continue Shoping then add new items and commit purchases', async () => {
        await sauce.backToShoppingTest()
        await sauce.runAddProductTest(['Backpack'])
        await sauce.gotoPage("cartLink", true)
        await sauce.verifyItemsInCartTest(['Backpack', 'Bike Light'])
        await sauce.commitPurchaseTest()
        await common.page.waitForTimeout(5000)
    });
})
