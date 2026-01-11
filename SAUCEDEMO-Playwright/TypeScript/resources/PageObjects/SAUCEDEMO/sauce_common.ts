import { expect } from '@playwright/test'
import { CommonKeywords } from '../../common'
import * as loginPage from './loginPage'
import * as productPage from './productPage'
import * as cartPage from './cartPage'
import * as checkoutPage from './checkoutPage'

const common_locators = {
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
// create key type to access key using params.
type MenuKeys = keyof typeof common_locators.menuBar;
type CommonLocatorPage = keyof typeof common_locators.pages;

export class CommonSauceDemo {
    constructor(public readonly common: CommonKeywords) {
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
        await loginPage.LoginSauce(this.common, userName, pass)
        // Step 2 : added items and get products detail.
        await this.common.verifyPageArrive(productPage.productPageLocators.productHeader)
        await productPage.addOrRemoveProducts(this.common,products)
        await this.gotoPage("cart")
        // Step 3 : Verify Items in cart.
        await cartPage.verifyItemsInCart(this.common, products)
        await cartPage.commitPurchase(this.common)
        // Step 4 : Confirm Shipping.
        await checkoutPage.FillInformation(this.common, fName, lName, zipcode)
        await checkoutPage.GetShippingInformation(this.common)
        await checkoutPage.VerifyCompleteShipping(this.common,"Thank you for your order!")  // Don't need to check fail case anymore.
        // Step 5 : Log out.
        await this.menuSelect("logout")
    }
// -------------------------------------- Sauce Demo Common Functions. --------------------------------------
    /**
     * Click a menu based on selected menu name
     * @param menuName - The menu key (e.g., "about", "logout")
     * @returns none.
     */
    async menuSelect(menuName: MenuKeys) {
        if (menuName in common_locators.menuBar) {
            await this.common.page.locator(common_locators.burger).click()
            await this.common.page.locator(common_locators.menuBar[menuName]).waitFor({ 'state': 'visible' })
            await this.common.page.locator(common_locators.menuBar[menuName]).click({ force: true })
            
            let closeMenuBtn = this.common.page.locator(common_locators.menuBar['closeMenu'])
            if (await closeMenuBtn.isVisible()) closeMenuBtn.click() 

        } else {
            console.log(`There is no such a key named [${menuName}] in menu bar.`);

        }
    }

    async gotoPage(pageName: CommonLocatorPage, byLink: boolean = false) {
        if (byLink) {
            await this.common.page.goto(common_locators.pages[pageName])
        } else {
            await this.common.page.locator(common_locators.pages[pageName]).click()
        }
    }

    async ToastError(errorText: string) {
        let locator = this.common.page.locator(common_locators['toast'])

        if (await locator.isVisible()) {
            await expect(locator).toContainText(errorText)
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
        await loginPage.LoginSauce(this.common, userName, pass)
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
        await checkoutPage.FillInformation(this.common, fName, lName, zipCode)
        if (checkToast) {
            await this.ToastError(errorText)
            console.log('Toast error match!')
        }
    }
    async backToShoppingTest() {
        await cartPage.backToShopping(this.common)
    }

    async commitPurchaseTest() {
        await cartPage.commitPurchase(this.common)
    }

    /**
     * Add or remove product into the cart based on given name.
     * Use in sauce common for centralize reasons.
     * @param products as array(e.g., "Bike Light", "Fleeces")
     * @param [isAdd=true] add item if true, remove if false, default is true
     * @returns none.
     */
    async runAddProductTest(products: string[], isAdd: boolean = true) {
        await productPage.addOrRemoveProducts(this.common, products, isAdd)
    }


    /**
    * Add or remove product into the cart based on given name.
    * Use in sauce common for centralize reasons.
    * @param products as array(e.g., "Bike Light", "Fleeces")
    * @returns none.
    */
    async filterSelectTest(method = 'az') {
        await productPage.changeFilterByValue(this.common, method)
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
        await productPage.getProducts(this.common, products)
    }

    /**
     * Remove items from cart.
     * @param common as CommonKeywords as playwright control.
     * @param products  products as array. (e.g., "Bike Light", "Fleeces")
     * @returns none
     */
    async removeCartItemsTest(products: string[]) {
        await cartPage.removeProducts(this.common, products)
    }

    async verifyItemsInCartTest(products: string[]) {
        await cartPage.verifyItemsInCart(this.common, products)
    }
}