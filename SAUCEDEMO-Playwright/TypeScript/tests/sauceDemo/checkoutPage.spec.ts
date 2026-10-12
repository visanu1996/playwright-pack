import { test } from '@playwright/test'
import {CentralizeSD} from '../../src/pages/saucedemo/CentralizeSD'
import { WebDriver } from '../../src/core/DriverFactory'

let wd: WebDriver
let sauce: CentralizeSD

test.describe('Checkout', () => {
    test.beforeEach(async () =>{
        wd = new WebDriver()
        sauce = new CentralizeSD(wd)

        await wd.startBrowser()
        await sauce.createSDPage()
        await sauce.login.LoginSauce('standard_user', 'secret_sauce')
        await sauce.verifySDPageArrive('product')

        await sauce.product.addItems('Backpack', 'Bike Light', 'Bolt T-Shirt')
        await sauce.gotoPage("cart")
        await sauce.cart.verifyItemInCart('Backpack', 'Bike Light', 'Bolt T-Shirt')
        await sauce.cart.commitPurchase()
    })

    test.afterEach(async () => {
        await wd.closeBrowser()
    });

    test('TC001 Validate first name is required.', async () => {
        await sauce.checkout.FillInformation("", "", "")
        await sauce.checkout.verifyCheckoutToast("First Name is required")
    });

    test('TC002 Validate last name is required.', async () => {
        await sauce.checkout.FillInformation("Visan", "", "1235")
        await sauce.checkout.verifyCheckoutToast("Last Name is required")
    });

    test('TC003 Validate postal code is required.', async () => {
        await sauce.checkout.FillInformation("Visan", "Laster", "")
        await sauce.checkout.verifyCheckoutToast("Postal Code is required")
    });

    test('TC004 Validate checkout with valid information.', async () => {
        await sauce.checkout.FillInformation("Visan", "Laster", "12345")
    });

    test('TC005 Check total price, items price compare to total price.', async () => {
        await sauce.checkout.FillInformation("Visan", "Laster", "12345")
        await sauce.checkout.SumTotalFromItems(55.97)
    });
    test('TC006 Get Shipping Information', async () => {
        await sauce.checkout.FillInformation("Visan", "Laster", "12345")
        await sauce.checkout.GetShippingInformation()
    });

    test('TC007 Verify complete message', async () => {
        await sauce.checkout.FillInformation("Visan", "Laster", "12345")
        await sauce.checkout.completeShipping("Thank you for your order!")
    });
});
