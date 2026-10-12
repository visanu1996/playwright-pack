import { CommonSD } from "@pages/saucedemo/CommonSD"
import { WebDriver } from "@core/DriverFactory"
import { SDLoginPage } from '@pages/saucedemo/loginPage'
import { SDProductPage } from '@pages/saucedemo/productPage'
import { SDCartPage } from '@pages/saucedemo/cartPage'
import { SDCheckoutPage } from '@pages/saucedemo/checkoutPage'


/**
 * CentralizeSD
 *
 * This class composes the individual page objects for the SauceDemo app
 * (`SDLoginPage`, `SDProductPage`, `SDCartPage`, `SDCheckoutPage`) and
 * exposes them as properties so tests can call their methods directly.
 *
 * The composition pattern lets `CentralizeSD` borrow functionality from the
 * contained page objects and reuse those functions as its own in higher-level
 * flows (see `runFullTest` which orchestrates login, product selection,
 * checkout and verification by delegating to the composed objects).
 *
 * Example:
 * ```ts
 * const central = new CentralizeSD(wd);
 * await central.login.LoginSauce('standard_user', 'secret_sauce');
 * await central.product.addOrRemoveProducts(['Sauce Labs Backpack']);
 * await central.cart.commitPurchase();
 * ```
 *
 * @property {SDLoginPage} login - login page helper
 * @property {SDProductPage} product - product page helper
 * @property {SDCartPage} cart - cart page helper
 * @property {SDCheckoutPage} checkout - checkout page helper
 */
export class CentralizeSD extends CommonSD {
    public login: SDLoginPage
    public product: SDProductPage
    public cart: SDCartPage
    public checkout: SDCheckoutPage

    constructor(wd: WebDriver) {
        super(wd)
        this.login = new SDLoginPage(wd)
        this.product = new SDProductPage(wd)
        this.cart = new SDCartPage(wd)
        this.checkout = new SDCheckoutPage(wd)
    }

    /**
     * Run full test for sauceDemo with login, adding items, go to cart, confirm purchases.
     * Use in sauce common for centralize reasons.
     * @param userName  as a username for login.
     * @param pass as a password for login.
     * @returns none.
     */
    async runFullTest(userName: string, pass: string, products: string[], fName : string, lName : string, zipcode: string ) {
        // Step 1 : Login
        await this.login.LoginSauce(userName, pass)
        // Step 2 : added items and get products detail.
        await this.verifyPageArrive(this.product.productPageLocators.productHeader)
        await this.product.addItems(...products)
        await this.gotoPage("cart")
        // Step 3 : Verify Items in cart.
        await this.cart.verifyItemInCart(...products)
        await this.cart.commitPurchase()
        // Step 4 : Confirm Shipping.
        await this.checkout.FillInformation(fName, lName, zipcode)
        await this.checkout.GetShippingInformation()
        await this.checkout.completeShipping("Thank you for your order!")  // Don't need to check fail case anymore.
        // Step 5 : Log out.
        await this.menuSelect("logout")
    }
    
}
