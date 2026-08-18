import { BasePage } from "../../basePage"
import { WebDriverManagement } from "../../../utils/driverFactory"
import { SDLoginPage } from './loginPage'
import { SDProductPage } from './productPage'
import { SDCartPage } from './cartPage'
import { SDCheckoutPage } from './checkoutPage'


export class SDCommon extends BasePage {
    public login: SDLoginPage
    public product: SDProductPage
    public cart: SDCartPage
    public checkout: SDCheckoutPage

    constructor(wd: WebDriverManagement) {
        super(wd)
        this.login = new SDLoginPage(this.wd)
        this.product = new SDProductPage(this.wd)
        this.cart = new SDCartPage(this.wd)
        this.checkout = new SDCheckoutPage(this.wd)
    }

    common_locators = {
        burger: "xpath=//button[@id='react-burger-menu-btn']",
        menuBar: {
            allItems: "xpath=//a[text()='All Items']",
            about: "xpath=//a[text()='About']",
            logout: "xpath=//a[text()='Logout']",
            resetAppState: "xpath=//a[text()='Reset App State']",
            closeMenu: "xpath=//button[text()='Close Menu']"
        },
        pages: {
            cart: "xpath=//a[@class='shopping_cart_link']",
            cartLink: "https://www.saucedemo.com/cart.html",
            productLink: "https://www.saucedemo.com/inventory.html",
            checkout: "https://www.saucedemo.com/checkout-step-one.html",
        },
        toast: "xpath=//h3[@data-test='error']"

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
        await this.product.addOrRemoveProducts(products)
        await this.gotoPage("cart")
        // Step 3 : Verify Items in cart.
        await this.cart.verifyItemInCart(products)
        await this.cart.commitPurchase()
        // Step 4 : Confirm Shipping.
        await this.checkout.FillInformation(fName, lName, zipcode)
        await this.checkout.GetShippingInformation()
        await this.checkout.VerifyCompleteShipping("Thank you for your order!")  // Don't need to check fail case anymore.
        // Step 5 : Log out.
        await this.menuSelect("logout")
    }
// -------------------------------------- Sauce Demo Common Functions. --------------------------------------
    /**
     * Click a menu based on selected menu name
     * @param menuName - The menu key (e.g., "about", "logout")
     * @returns none.
     */
    async menuSelect(menuName: keyof typeof this.common_locators.menuBar) {
        if (menuName in this.common_locators.menuBar) {
            await this.page.locator(this.common_locators.burger).click()
            await this.page.locator(this.common_locators.menuBar[menuName]).waitFor({ 'state': 'visible' })
            await this.page.locator(this.common_locators.menuBar[menuName]).click({ force: true })

            let closeMenuBtn = this.page.locator(this.common_locators.menuBar['closeMenu'])
            if (await closeMenuBtn.isVisible()) closeMenuBtn.click()

        } else {
            console.log(`There is no such a key named [${menuName}] in menu bar.`);

        }
    }

    async gotoPage(pageName: keyof typeof this.common_locators.pages, byLink: boolean = false) {
        if (byLink) {
            await this.page.goto(this.common_locators.pages[pageName])
        } else {
            await this.page.locator(this.common_locators.pages[pageName]).click()
        }
    }

    async ToastError(errorText: string) {
        let locator = this.page.locator(this.common_locators['toast'])

        if (await locator.isVisible()) {
            await this.expect(locator).toContainText(errorText)
        } else {
            throw new Error('No Toast were found on this page.')
        }
    }


    // -------------------------------------- test module functions. --------------------------------------
    /**
     * Test login valid or invalid credentials, also check toast and it message if it's needed.
     * Use in sauce common for centralize reasons.
     * @param userName  as a username for login.
     * @param pass as a password for login.
     * @param checkToast default is false, use to check that Toast is popped or not.
     * @param errorText use with checkToast to see the expected contains text from toast.
     * @returns none.
     */
    async runLoginTest(userName: string, pass: string, checkToast: boolean = false, errorText: any = null) {
        await this.login.LoginSauce(userName, pass)
        if (checkToast) {
            await this.ToastError(errorText);
            console.log(`Toast error match!`)
        }
    }

    /**
    * Test login valid or invalid credentials, also check toast and it message if it's needed.
    * Use in sauce common for centralize reasons.
    * @param fName  as firstname.
    * @param lName as lastname.
    * @param zipCode as a zipcode
    * @param checkToast default is false, use to check that Toast is popped or not.
    * @param errorText use with checkToast to see the expected contains text from toast.
    * @returns none.
    */
    async runCheckoutTest(fName: string, lName: string, zipCode: string, checkToast: boolean = false, errorText: any = null) {
        await this.checkout.FillInformation(fName, lName, zipCode)
        if (checkToast) {
            await this.ToastError(errorText)
            console.log('Toast error match!')
        }
    }
    async backToShoppingTest() {
        await this.cart.backToShopping()
    }

    async commitPurchaseTest() {
        await this.cart.commitPurchase()
    }

    /**
     * Add or remove product into the cart based on given name.
     * Use in sauce common for centralize reasons.
     * @param products as array(e.g., "Bike Light", "Fleeces")
     * @param [isAdd=true] add item if true, remove if false, default is true
     * @returns none.
     */
    async runAddProductTest(products: string[], isAdd: boolean = true) {
        await this.product.addOrRemoveProducts(products, isAdd)
    }


    /**
    * Add or remove product into the cart based on given name.
    * Use in sauce common for centralize reasons.
    * @param products as array(e.g., "Bike Light", "Fleeces")
    * @returns none.
    */
    async filterSelectTest(method = 'az') {
        await this.product.changeFilterByValue(method)
    }
    // adding full control for all SAUCEDEMO Page later.


    /**
     * Get products details based on given name, 
     * No error if items is not visible on page nor available.
     * @param common as CommonKeywords as playwright control.
     * @param products  products as array. (e.g., "Bike Light", "Fleeces")
     * @returns Object
     */
    async getProductTest(products: string[]) {
        await this.product.getProducts(products)
    }

    /**
     * Remove items from cart.
     * @param common as CommonKeywords as playwright control.
     * @param products  products as array. (e.g., "Bike Light", "Fleeces")
     * @returns none
     */
    async removeCartItemsTest(products: string[]) {
        await this.cart.removeProduct(products)
    }

    async verifyItemsInCartTest(products: string[]) {
        await this.cart.verifyItemInCart(products)
    }
}
