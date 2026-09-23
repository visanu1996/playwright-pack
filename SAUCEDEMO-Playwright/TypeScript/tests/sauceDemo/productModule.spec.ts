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
        await sauce.runAddProductTest(['Backpack', 'Bike Light', 'T-Shirt'])
    });
    
    test('TC002 Add invalid product', async () => {
        await sauce.runAddProductTest(['Hello World'])
    });
    
    test('TC003 Remove valid products', async () => {
        await sauce.runAddProductTest(['Backpack', 'Bolt T-Shirt'], false)
    });
    
    test('TC004 Remove invalid products', async () => {
        await sauce.runAddProductTest(['MyName'], false)
    });
    
    test('TC005 Reset App State, clear all items cart.', async () => {
        // defect from clear cart items (not remove added item from product page.)
        await sauce.menuSelect('resetAppState')
    });
    
    test('TC006 Change Value : Z to A', async () => {
        await sauce.product.changeProductFilter('value','za')
    });

    test('TC007 Get Products Detail', async () => {
        await sauce.getProductTest(['Backpack', 'Bike Light', 'T-Shirt'])
    });
});
