import { test } from '@playwright/test'
import {CentralizeSD} from '@pages/web/saucedemo/CentralizeSD'
import { WebDriver } from '@core/DriverFactory'

let wd: WebDriver
let sauce: CentralizeSD

test.describe('Cart', () => {
    test.beforeEach(async () =>{
        wd = new WebDriver()
        sauce = new CentralizeSD(wd)
        
        await wd.startBrowser()
        await sauce.createSDPage()
        await sauce.login.LoginSauce('standard_user', 'secret_sauce')
        await sauce.verifySDPageArrive('product')
    })

    test.afterEach(async () => {
        await wd.closeBrowser()
    });

    test('TC001 Add valid products and check it from cart', async () => {
        await sauce.product.addItems('Backpack', 'Bike Light', 'Bolt T-Shirt')
        await sauce.gotoPage("cart")
        await sauce.cart.verifyItemInCart('Backpack', 'Bike Light', 'Bolt T-Shirt')
    });

    test('TC002 Remove item from cart', async () => {
        await sauce.product.addItems('Backpack', 'Bike Light', 'Bolt T-Shirt')
        await sauce.gotoPage("cart")
        await sauce.cart.removeCartItems('Backpack', 'Bolt T-Shirt')
        await sauce.cart.verifyItemNotInCart('Backpack', 'Bolt T-Shirt')

    });

    test('TC003 Continue Shoping then add new items and commit purchases', async () => {
        await sauce.product.addItems('Bike Light', 'Bolt T-Shirt')
        await sauce.gotoPage("cart")
        await sauce.cart.backToShopping()
        await sauce.product.addItems('Backpack')
        await sauce.gotoPage("cartLink", true)
        await sauce.cart.verifyItemInCart('Backpack', 'Bike Light', 'Bolt T-Shirt')
        await sauce.cart.commitPurchase()
    });
})
