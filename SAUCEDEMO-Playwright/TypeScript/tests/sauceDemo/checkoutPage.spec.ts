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
        await sauce.createPage(sauce.config.webURL, 'sauce')
        await sauce.login.LoginSauce('standard_user', 'secret_sauce')
        await sauce.verifyPageArrive(sauce.product.productPageLocators.productHeader)

        await sauce.runAddProductTest(['Backpack', 'Bike Light', 'T-Shirt'])
        await sauce.gotoPage("cart")
        await sauce.verifyItemsInCartTest(['Backpack', 'Bike Light', 'T-Shirt'])
        await sauce.commitPurchaseTest()

    });
    test.afterAll(async () => {
        await sauce.page.waitForTimeout(5000)
        wd.closeBrowser()
    });

    test('TC001 Not adding information in checkout information page.', async () => {
        await sauce.runCheckoutTest("", "", "", true, "First Name is required")
        await sauce.runCheckoutTest("Visan", "", "1235", true, "Last Name is required")
        await sauce.runCheckoutTest("Visan", "Laster", "", true, "Postal Code is required")
        await sauce.runCheckoutTest("Visan", "Laster", "12345")
    });
    test('TC002 Check total price, items price compare to total price.', async () => {
        await sauce.checkout.SumTotalFromItems(55.97)
    });
    test('TC003 Get Shipping Information', async () => {
        await sauce.checkout.GetShippingInformation()
    });

    test('TC004 Verify complete message', async () => {
        await sauce.checkout.VerifyCompleteShipping("Thank you for your order!")
    });
});
