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
    }
}

// TODO : Add document for all functions

export async function addOrRemoveProducts(common: CommonKeywords, products: string[], isAdd: boolean = true) {
    for (let index = 0; index < products.length; index++) {
        const product = products[index];
        let product_box = productPageLocators.itemBox['mainBox'].replace('[TO_CHANGE]', product)
        let addBtn = product_box + productPageLocators.itemBox['addBtn']
        
        let btnText
        // can't find other way to handle failed from timeout.
        try{
            btnText = await common.page.locator(addBtn).textContent({timeout:2000})
        }catch{
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

        if (btnText !== null){
            btnText = await common.page.locator(addBtn).textContent()
            let verify = (isAdd) ? 'Remove' : 'Add to cart'
            await common.page.waitForTimeout(1000)   // wait for button text to change first.
            await expect(common.page.locator(addBtn)).toHaveText(verify, { ignoreCase: true })           
        }
    }
}
// TODO : complete get products detail
export async function getProducts(common: CommonKeywords, products: string[]) {

}
// TODO : complete select filter
export async function changeFilter(common: CommonKeywords, method:string='az'){

}
