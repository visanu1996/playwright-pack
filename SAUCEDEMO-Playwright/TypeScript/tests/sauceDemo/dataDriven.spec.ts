import { test } from '@playwright/test'
import {CentralizeSD} from '@pages/web/saucedemo/CentralizeSD'
import { WebDriver } from '@core/DriverFactory'
import * as testdata from '../../src/config/testdata'

let wd: WebDriver
let sauce: CentralizeSD

test.describe('SauceDemo Data Driven', () => {
    test.beforeEach(async () => {
        wd = new WebDriver()
        sauce = new CentralizeSD(wd)
        await wd.startBrowser()
        await sauce.createSDPage()
    });

    test.afterEach(async () => {
        await wd.closeBrowser()
    });

    test('Full Run', async () => {
        // TODO : Add helper to read csv and run test as iteration
        await sauce.runFullTest(testdata.user.standard, testdata.password, ['Backpack', 'Bike Light'], 'Berk', 'Rising', '10210')
    });
})
