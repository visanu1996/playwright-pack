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
        // let video = sauce.page.video()
    });
    test.afterAll(async () => {
        await sauce.page.waitForTimeout(5000)
        wd.closeBrowser()
    });

    test('TC001 Login with lock credential', async () => {
        await sauce.runLoginTest('locked_out_user', 'secret_sauce', true, 'locked out.')
    });
    test('TC002 Login with wrong cred', async () => {
        await sauce.runLoginTest('wrong', 'secret_sauce', true, 'not match')
    });
    test('TC003 Login without password', async () => {
        await sauce.runLoginTest('wrong', '', true, 'Password is required')
    });
    test('TC004 Login without username', async () => {
        await sauce.runLoginTest('', 'secret_sauce', true, 'Username is required')
    });
    test('TC005 Login with valid credential', async () => {
        await sauce.runLoginTest('standard_user', 'secret_sauce')
    });
});
