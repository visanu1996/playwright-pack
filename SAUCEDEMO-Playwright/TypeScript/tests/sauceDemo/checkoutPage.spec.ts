import { test } from '@playwright/test'
import {CentralizeSD} from '../../src/pages/saucedemo/CentralizeSD'
import { WebDriver } from '../../src/core/DriverFactory'

let wd: WebDriver
let sauce: CentralizeSD

test.describe('Checkout', async() => {
    test.beforeEach(async () =>{
        wd = new WebDriver()
        sauce = new CentralizeSD(wd)

        await wd.startBrowser()
        await sauce.createSDPage()
        await sauce.runLoginTest('standard_user', 'secret_sauce')
        await sauce.verifyPageArrive(sauce.product.productPageLocators.productHeader)

        await sauce.runAddProductTest('Backpack', 'Bike Light', 'Bolt T-Shirt')
        await sauce.gotoPage("cart")
        await sauce.verifyItemsInCartTest('Backpack', 'Bike Light', 'Bolt T-Shirt')
        await sauce.commitPurchaseTest()
    })

    test.afterEach(async () => {
        await wd.closeBrowser()
    });

    test('TC001 Not adding information in checkout information page.', async () => {
        await sauce.runCheckoutTest("", "", "", {checkToast:true, Msg:"First Name is required"})
        await sauce.runCheckoutTest("Visan", "", "1235", {checkToast:true, Msg:"Last Name is required"})
        await sauce.runCheckoutTest("Visan", "Laster", "", {checkToast:true, Msg:"Postal Code is required"})
        await sauce.runCheckoutTest("Visan", "Laster", "12345")
    });
    test('TC002 Check total price, items price compare to total price.', async () => {
        await sauce.runCheckoutTest("Visan", "Laster", "12345")
        await sauce.checkout.SumTotalFromItems(55.97)
    });
    test('TC003 Get Shipping Information', async () => {
        await sauce.runCheckoutTest("Visan", "Laster", "12345")
        await sauce.checkout.GetShippingInformation()
    });

    test('TC004 Verify complete message', async () => {
        await sauce.runCheckoutTest("Visan", "Laster", "12345")
        await sauce.checkout.completeShipping("Thank you for your order!")
    });
});
