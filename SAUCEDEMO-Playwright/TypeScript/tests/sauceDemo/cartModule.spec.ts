import { test } from '@playwright/test'
import {CentralizeSD} from '../../src/pages/saucedemo/CentralizeSD'
import { WebDriver } from '../../src/core/DriverFactory'

let wd: WebDriver
let sauce: CentralizeSD

test.describe('Cart', () => {
    test.beforeEach(async () =>{
        wd = new WebDriver()
        sauce = new CentralizeSD(wd)
        
        await wd.startBrowser()
        await sauce.createSDPage()
        await sauce.runLoginTest('standard_user', 'secret_sauce')
        await sauce.verifyPageArrive(sauce.product.productPageLocators.productHeader)
    })

    test.afterEach(async () => {
        await wd.closeBrowser()
    });

    test('TC001 Add valid products and check it from cart', async () => {
        await sauce.runAddProductTest('Backpack', 'Bike Light', 'Bolt T-Shirt')
        await sauce.gotoPage("cart")
        await sauce.verifyItemsInCartTest('Backpack', 'Bike Light', 'Bolt T-Shirt')
    });

    test('TC002 Remove item from cart', async () => {
        await sauce.runAddProductTest('Backpack', 'Bike Light', 'Bolt T-Shirt')
        await sauce.gotoPage("cart")
        await sauce.removeCartItemsTest('Backpack', 'Bolt T-Shirt')
    });

    test('TC003 Continue Shoping then add new items and commit purchases', async () => {
        await sauce.runAddProductTest('Bike Light', 'Bolt T-Shirt')
        await sauce.gotoPage("cart")
        await sauce.backToShoppingTest()
        await sauce.runAddProductTest('Backpack')
        await sauce.gotoPage("cartLink", true)
        await sauce.verifyItemsInCartTest('Backpack', 'Bike Light')
        await sauce.commitPurchaseTest()
    });
})
