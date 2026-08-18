import { BasePage } from "../../basePage";

export class SDProductPage extends BasePage{
    productPageLocators = {
        productHeader: "xpath=//span[@class='title' and text()='Products']",
        itemBox: {
            mainBox: "xpath=(//div[@class='inventory_item' and .//div[@class='inventory_item_name ' and contains(text(),'[TO_CHANGE]')]])[1]",
            itemImg: "/div[@class='inventory_item_img']", // use after mainBox
            itemName: "//div[@class='inventory_item_name ']",
            itemDesc: "//div[@class='inventory_item_desc']",
            itemPrice: "//div[@class='inventory_item_price']",
            addBtn: "//button",
        },
        filter: "xpath=//select[@class='product_sort_container']"
    }

    productsDetail: Record<string, any> = {};



    /**
     * Add or remove product into the cart based on given name, 
     * also check that item really added or not.
     * No error if items is not visible on page nor available.
     * @param products  products as array. (e.g., "Bike Light", "Fleeces")
     * @param [isAdd=true] add item if true, remove if false, default is true
     * @returns none.
     */

    async addOrRemoveProducts(products: string[], isAdd: boolean = true){
        for (let product of products){
            let productBox = this.productPageLocators.itemBox['mainBox'].replace('[TO_CHANGE]',product)
            let addBtn = productBox + this.productPageLocators.itemBox['addBtn']

            let btnText
            // can't find other way to handle failed from timeout.
            try {
                btnText = await this.page.locator(addBtn).textContent({ timeout: 2000 })
            } catch {
                btnText = null
            }

            if (isAdd && btnText == 'Add to cart') {
                await this.page.locator(productBox + this.productPageLocators.itemBox['addBtn']).click()
            } else if (!isAdd && btnText == 'Remove') {
                await this.page.locator(productBox + this.productPageLocators.itemBox['addBtn']).click()
            } else {
                console.log(`\nThere is no product named : ${product} or product is already added or removed.`);
                console.log(`Method want to delete : ${isAdd}, current btn status : ${btnText}\n`)
            }

            if (btnText !== null) {
                btnText = await this.page.locator(addBtn).textContent()
                let verify = (isAdd) ? 'Remove' : 'Add to cart'
                await this.page.waitForTimeout(1000)   // wait for button text to change first.
                await this.expect(this.page.locator(addBtn)).toHaveText(verify, { ignoreCase: true })
            }
            }
    
    }

    /**
     * Get products details based on given name,
     * No error if items is not visible on page nor available.
     * @param products  products as array. (e.g., "Bike Light", "Fleeces")
     * @returns Object
     */
    async getProducts(products: string[]) {

        for (const product of products) {
            let product_box = this.productPageLocators.itemBox['mainBox'].replace('[TO_CHANGE]', product)

            try {
                let productDesc = await this.page.locator(product_box + this.productPageLocators.itemBox['itemDesc']).textContent({ timeout: 2000 })
                let productPrice = await this.page.locator(product_box + this.productPageLocators.itemBox['itemPrice']).textContent({ timeout: 2000 })
                this.productsDetail[product] = { "description": productDesc, "price": productPrice }

            } catch {
                console.log(`There is no product named : ${product}`);
            }

        }
        console.log(this.productsDetail);
        return this.productsDetail
    }

    /**
     * select filter by its values (force to use value only)
     * @param method  the value to be select. (e.g., "za", "lohi")
     */
    async changeFilterByValue(method: string = 'az') {
        const methods = ['az', 'za', 'lohi', 'hilo']
        const filterLocator = this.page.locator(this.productPageLocators.filter)
        if (methods.includes(method)) {
            await filterLocator.selectOption({ value: method })
            await this.expect(filterLocator).toHaveValue(method)
        } else {
            console.log(`There is no such ${method} in ${methods}`);
        }
    }
    
}
