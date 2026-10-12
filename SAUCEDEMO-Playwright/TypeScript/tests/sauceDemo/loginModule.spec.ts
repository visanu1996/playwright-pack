import { test } from '@playwright/test'
import {CentralizeSD} from '@pages/web/saucedemo/CentralizeSD'
import { WebDriver } from '@core/DriverFactory'

let wd: WebDriver
let sauce: CentralizeSD

test.describe('Login', () => {
    test.beforeEach(async () => {
        wd = new WebDriver()
        sauce = new CentralizeSD(wd)
        await wd.startBrowser()
        await sauce.createSDPage()
        await sauce.verifySDPageArrive('login')
        // let video = sauce.page.video()
    });

    test.afterEach(async () => {
        await wd.closeBrowser()
    });

    test('TC001 Login with lock credential', async () => {
        await sauce.login.LoginSauce('locked_out_user', 'secret_sauce')
        await sauce.login.verifyLoginToast('locked out.')
    });

    test('TC002 Login with wrong cred', async () => {
        await sauce.login.LoginSauce('wrong', 'secret_sauce')
        await sauce.login.verifyLoginToast('not match')
    });
    
    test('TC003 Login without password', async () => {
        await sauce.login.LoginSauce('wrong', '')
        await sauce.login.verifyLoginToast('Password is required')
    });
    
    test('TC004 Login without username', async () => {
        await sauce.login.LoginSauce('', 'secret_sauce')
        await sauce.login.verifyLoginToast('Username is required')
    });
    
    test('TC005 Login with valid credential', async () => {
        await sauce.login.LoginSauce('standard_user', 'secret_sauce')
        await sauce.verifySDPageArrive('product')
    });
});
