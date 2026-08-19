import { test } from '@playwright/test'
import { SDCommon } from '../../resources/PageObjects/SAUCEDEMO/sauce_common'
import { WebDriverManagement } from '../../utils/driverFactory'

let wd: WebDriverManagement
let sauce: SDCommon

test.describe.serial('QA-DEMO', () => {
    test.setTimeout(0);
    test.beforeAll(async () => {
        wd = new WebDriverManagement()
        sauce = new SDCommon(wd)

        await wd.startBrowser()
        await sauce.createPage(sauce.config.webURL,'sauce')
        await sauce.login.LoginSauce('standard_user', 'secret_sauce')
        await sauce.verifyPageArrive(sauce.product.productPageLocators.productHeader)
    });

    test.afterAll(async () => {
        await sauce.page.waitForTimeout(5000)
        wd.closeBrowser()
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
        await sauce.page.waitForTimeout(5000)
    });
})
