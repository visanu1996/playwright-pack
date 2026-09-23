import { test } from '@playwright/test'
import {CentralizeSD} from '../../src/pages/saucedemo/CentralizeSD'
import { WebDriver } from '../../src/core/DriverFactory'

let wd: WebDriver
let sauce: CentralizeSD

test.describe('Login', async() => {
    test.beforeEach(async () => {
        wd = new WebDriver()
        sauce = new CentralizeSD(wd)
        await wd.startBrowser()
        await sauce.createSDPage()
        // let video = sauce.page.video()
    });

    test.afterEach(async () => {
        await wd.closeBrowser()
    });

    test('TC001 Login with lock credential', async () => {
        await sauce.runLoginTest('locked_out_user', 'secret_sauce', {checkToast:true, errorText:'locked out.'})
    });

    test('TC002 Login with wrong cred', async () => {
        await sauce.runLoginTest('wrong', 'secret_sauce', { checkToast: true, errorText: 'not match' })
    });
    
    test('TC003 Login without password', async () => {
        await sauce.runLoginTest('wrong', '', { checkToast: true, errorText: 'Password is required' })
    });
    
    test('TC004 Login without username', async () => {
        await sauce.runLoginTest('', 'secret_sauce', { checkToast: true, errorText: 'Username is required' })
    });
    
    test('TC005 Login with valid credential', async () => {
        await sauce.runLoginTest('standard_user', 'secret_sauce')
    });
});
