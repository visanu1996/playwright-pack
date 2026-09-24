import { test } from '@playwright/test'
import {CentralizeSD} from '../../src/pages/saucedemo/CentralizeSD'
import { WebDriver } from '../../src/core/DriverFactory'


let wd: WebDriver
let sauce: CentralizeSD

test.describe('Product', async() => {
    test.beforeEach(async () => {
        wd = new WebDriver()
        sauce = new CentralizeSD(wd)

        await wd.startBrowser()
        await sauce.createSDPage()
        await sauce.runLoginTest('standard_user', 'secret_sauce')
        await sauce.verifyPageArrive(sauce.product.productPageLocators.productHeader)
    });
    
    test.afterEach(async () => {
        await sauce.page.waitForTimeout(5000)
        await wd.closeBrowser()
    });

    test('TC001 Add valid products', async () => {
        await sauce.runAddProductTest('Backpack', 'Bike Light', 'Bolt T-Shirt')
        await sauce.product.countItems(3)
        
    });
    
    test('TC002 Remove valid products', async () => {
        await sauce.runAddProductTest('Backpack', 'Bike Light', 'Bolt T-Shirt')
        await sauce.runRemoveProductTest('Backpack', 'Bolt T-Shirt')
        await sauce.product.countItems(1)

    });
    
    test('TC004 Reset App State, clear all items cart.', async () => {
        // defect from clear cart items (not remove added item from product page.)
        await sauce.menuSelect('resetAppState')
        await sauce.product.countItems(0)
    });
    
    test('TC005 Change Value : Z to A', async () => {
        await sauce.product.changeProductFilter('za')
    });

});
