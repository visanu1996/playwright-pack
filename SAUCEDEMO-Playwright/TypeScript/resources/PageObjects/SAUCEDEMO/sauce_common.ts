import { expect } from '@playwright/test'
import { CommonKeywords } from '../../common'
import * as loginPage from './loginPage'
import * as productPage from './productPage'


const common_locators = {
    burger:"xpath=//button[@id='react-burger-menu-btn']",
    menuBar:{
        allItems:"xpath=//a[text()='All Items']",
        about:"xpath=//a[text()='About']",
        logout:"xpath=//a[text()='Logout']",
        resetAppState:"xpath=//a[text()='Reset App State']",
        closeMenu:"xpath=//button[text()='Close Menu']"
    },
} as const
// create key type to access key using params.
type MenuKeys = keyof typeof common_locators.menuBar;

export class CommonSauceDemo {
    constructor(public readonly common: CommonKeywords) {
    }
    /**
     * Run full test for sauceDemo with login, adding items, go to cart, confirm purchases.
     * Use it in saucePage instead of loginPage for centralize reasons.
     * @param userName  as a username for login.
     * @param pass as a password for login.
     * @returns none.
     */
    async runFullTest(userName: string, pass: string) {
        await loginPage.LoginSauce(this.common, userName, pass)

    }

    // -------------------------------------- Below Code are just to test each module. --------------------------------------
    /**
     * Test login valid or invalid credentials, also check toast and it message if it's needed.
     * Use it in saucePage instead of loginPage for centralize reasons.
     * @param userName  as a username for login.
     * @param pass as a password for login.
     * @param checkToast default is false, use to check that Toast is popped or not.
     * @param errorText use with checkToast to see the expected contains text from toast.
     * @returns none.
     */
    async runLoginTest(userName: string, pass: string, checkToast: boolean = false, errorText: any = null){
        await loginPage.LoginSauce(this.common, userName, pass)
        if (checkToast) {
            await loginPage.ToastError(this.common, errorText);
            console.log(`Toast error match!`)
        }
    }

    /**
     * Add or remove product into the cart based on given name.
     * Use it in saucePage instead of productPage for centralize reasons.
     * @param products as array(e.g., "Bike Light", "Fleeces")
     * @returns none.
     */
    async runAddProductTest(products:string[],isAdd:boolean=true){
        await productPage.addOrRemoveProducts(this.common,products,isAdd)
    }

    /**
     * Click a menu based on selected menu name
     * @param menuName - The menu key (e.g., "about", "logout")
     * @returns none.
     */
    async menuSelectTest(menuName:MenuKeys){
        if (menuName in common_locators.menuBar){
            await this.common.page.locator(common_locators.burger).click()
            await this.common.page.locator(common_locators.menuBar[menuName]).waitFor({'state':'visible'})
            await this.common.page.locator(common_locators.menuBar[menuName]).click({force:true})
            await this.common.page.locator(common_locators.menuBar['closeMenu']).click()
        }else {
            console.log(`There is no such a key named [${menuName}] in menu bar.`);
            
        }
    }

    /**
    * Add or remove product into the cart based on given name.
    * Use it in saucePage instead of productPage for centralize reasons.
    * @param products as array(e.g., "Bike Light", "Fleeces")
    * @returns none.
    */
    async filterSelectTest(method='az'){
        await productPage.changeFilterByValue(this.common,method)
    }
    // adding full control for all SAUCEDEMO Page later.


    /**
     * Get products details based on given name, 
     * No error if items is not visible on page nor available.
     * @param common as CommonKeywords as playwright control.
     * @param products  products as array. (e.g., "Bike Light", "Fleeces")
     * @returns Object
     */
    async getProductTest(product:string[]){
        await productPage.getProducts(this.common,product)
    }
}
