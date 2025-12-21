import { expect } from "@playwright/test"
import { CommonKeywords } from "../../common"

export const productPageLocators = {
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

const productsDetail: Record<string, any> = {};

/**
 * Add or remove product into the cart based on given name, 
 * also check that item really added or not.
 * No error if items is not visible on page nor available.
 * @param common as CommonKeywords as playwright control.
 * @param products  products as array. (e.g., "Bike Light", "Fleeces")
 * @param [isAdd=true] add item if true, remove if false, default is true
 * @returns none.
 */
export async function addOrRemoveProducts(common: CommonKeywords, products: string[], isAdd: boolean = true) {
    for (const product of products) {
        let product_box = productPageLocators.itemBox['mainBox'].replace('[TO_CHANGE]', product)
        let addBtn = product_box + productPageLocators.itemBox['addBtn']

        let btnText
        // can't find other way to handle failed from timeout.
        try {
            btnText = await common.page.locator(addBtn).textContent({ timeout: 2000 })
        } catch {
            btnText = null
        }

        if (isAdd && btnText == 'Add to cart') {
            await common.page.locator(product_box + productPageLocators.itemBox['addBtn']).click()
        } else if (!isAdd && btnText == 'Remove') {
            await common.page.locator(product_box + productPageLocators.itemBox['addBtn']).click()
        } else {
            console.log(`\nThere is no product named : ${product} or product is already added or removed.`);
            console.log(`Method want to delete : ${isAdd}, current btn status : ${btnText}\n`)
        }

        if (btnText !== null) {
            btnText = await common.page.locator(addBtn).textContent()
            let verify = (isAdd) ? 'Remove' : 'Add to cart'
            await common.page.waitForTimeout(1000)   // wait for button text to change first.
            await expect(common.page.locator(addBtn)).toHaveText(verify, { ignoreCase: true })
        }
    }
}

/**
 * Get products details based on given name, 
 * No error if items is not visible on page nor available.
 * @param common as CommonKeywords as playwright control.
 * @param products  products as array. (e.g., "Bike Light", "Fleeces")
 * @returns Object
 */
export async function getProducts(common: CommonKeywords, products: string[]) {

    for (const product of products) {
        let product_box = productPageLocators.itemBox['mainBox'].replace('[TO_CHANGE]', product)

        try {
            let productDesc = await common.page.locator(product_box + productPageLocators.itemBox['itemDesc']).textContent({ timeout: 2000 })
            let productPrice = await common.page.locator(product_box + productPageLocators.itemBox['itemPrice']).textContent({ timeout: 2000 })
            productsDetail[product] = { "description": productDesc, "price": productPrice }

        } catch {
            console.log(`There is no product named : ${product}`);
        }

    }
    console.log(productsDetail);
    return productsDetail
}

/**
 * select filter by it values (force to use value only)
 * @param common as CommonKeywords as playwright control.
 * @param method  the value to be select. (e.g., "za", "lohi")
 * @returns none.
 */

export async function changeFilterByValue(common: CommonKeywords, method: string = 'az') {
    const methods = ['az', 'za', 'lohi', 'hilo']
    const filterLocator = common.page.locator(productPageLocators.filter)
    if (methods.includes(method)) {
        await filterLocator.selectOption({ value: method })
        await expect(filterLocator).toHaveValue(method)
    } else {
        console.log(`There is no such ${method} in ${methods}`);
    }
}
