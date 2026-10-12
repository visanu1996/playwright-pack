import { BasePage } from "@src/core/BasePage";

export class CommonSD extends BasePage {
    protected commonLocators = {
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

    protected sdPages = {
        login : 'text=Accepted usernames are:',
        product : 'text=Products',
        cart : 'text=Your Cart',
        checkout : 'text=Checkout: Your Information'
    }

// -------------------------------------- Sauce Demo Common Functions. --------------------------------------
    /**
     * Click a menu based on selected menu name
     * @param menuName - The menu key (e.g., "about", "logout")
     * @returns none.
     */
    async menuSelect(menuName: keyof typeof this.commonLocators.menuBar) {
        if (menuName in this.commonLocators.menuBar) {
            await this.page.locator(this.commonLocators.burger).click()
            await this.page.locator(this.commonLocators.menuBar[menuName]).waitFor({ 'state': 'visible' })
            await this.page.locator(this.commonLocators.menuBar[menuName]).click({ force: true })

            let closeMenuBtn = this.page.locator(this.commonLocators.menuBar['closeMenu'])
            if (await closeMenuBtn.isVisible()) closeMenuBtn.click()

        } else {
            console.log(`There is no such a key named [${menuName}] in menu bar.`);

        }
    }

    async createSDPage(){
        await this.createPage(this.config.webURL.SD, "SD")
    }

    async gotoPage(pageName: keyof typeof this.commonLocators.pages, byLink: boolean = false) {
        if (byLink) {
            await this.page.goto(this.commonLocators.pages[pageName])
        } else {
            await this.page.locator(this.commonLocators.pages[pageName]).click()
        }
    }

    protected async verifyToast(locator: string,errorText: string) {
        let element = this.page.locator(locator)

        if (await element.isVisible()) {
            await this.expect(element).toContainText(errorText)
        } else {
            throw new Error('No Toast were found on this page.')
        }
    }

    async verifySDPageArrive(page: keyof typeof this.sdPages, timeout?: number): Promise<void> {
        await this.verifyPageArrive(this.sdPages[page], timeout)
    }

}