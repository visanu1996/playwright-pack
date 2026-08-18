import { test } from '@playwright/test'
import { WebDriverManagement } from '../../utils/driverFactory'
import { BasePage } from '../../resources/basePage'
import { SDCommon } from '../../resources/PageObjects/SAUCEDEMO/sauce_common'

let wd: WebDriverManagement
let basePage: BasePage
let sauce: SDCommon

test.describe.serial('QA-DEMO', () => {
    test.setTimeout(0);
    test.beforeAll(async () => {
        wd = new WebDriverManagement()
        basePage = new BasePage(wd)
        sauce = new SDCommon(wd)

        await wd.startBrowser()
        await sauce.createPage(sauce.config.webURL, 'sauce')
        await sauce.login.LoginSauce('standard_user', 'secret_sauce')
        await sauce.verifyPageArrive(sauce.product.productPageLocators.productHeader)
    });
    test.afterAll(async () => {
        await sauce.page.waitForTimeout(5000)
        wd.closeBrowser()
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
        await sauce.filterSelectTest('za')
        await sauce.page.waitForTimeout(5000)
    });
    test('TC007 Get Products Detail', async () => {
        await sauce.getProductTest(['Backpack', 'Bike Light', 'T-Shirt'])
    });
});
