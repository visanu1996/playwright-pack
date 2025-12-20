import { test } from '@playwright/test'
import * as configFile from '../../config/config'
import * as commonPage from '../../resources/common'
import * as sourceDemo from '../../resources/PageObjects/SAUCEDEMO/sauce_common'
import * as productPage from '../../resources/PageObjects/SAUCEDEMO/productPage'

let common: commonPage.CommonKeywords
let sauce: sourceDemo.CommonSauceDemo

test.describe.serial('QA-DEMO', () => {
    test.setTimeout(0)
    test.beforeAll(async () => {
        common = new commonPage.CommonKeywords()
        sauce = new sourceDemo.CommonSauceDemo(common)
        await common.createWebDriver()
        await common.createPage(configFile.webURL, 'sauce')
        common.setPage('sauce')
        await sauce.runLoginTest('standard_user', 'secret_sauce')
        await common.verifyPageArrive(productPage.productPageLocators.productHeader)
    })
    test.afterAll(async () => {
        await common.page.waitForTimeout(5000)
        common.closeWebDriver()
    })
    
    test('TC001 Add valid products', async () => {
        await sauce.runAddProductTest(['Backpack', 'Bike Light', 'T-Shirt'])
    })
    test('TC002 Add invalid product', async () => {
        await sauce.runAddProductTest(['Hello World'])
    })
    test('TC003 Remove valid products', async () => { 
        await sauce.runAddProductTest(['Backpack','Bolt T-Shirt'],false)
    })
    test('TC004 Remove invalid products', async()=>{
        await sauce.runAddProductTest(['MyName'],false)
    })
    test('TC005 Reset App State, clear all items cart.', async()=>{
        // defect from clear cart items (not remove added item from product page.)
        await sauce.menuSelect('resetAppState')
    })
    test('TC006 Change Value : Z to A', async()=>{
        await sauce.filterSelectTest('za')
        await common.page.waitForTimeout(5000)
    })
    test('TC007 Get Products Detail', async()=>{
        await sauce.getProductTest(['Backpack', 'Bike Light', 'T-Shirt'])
    })
})
