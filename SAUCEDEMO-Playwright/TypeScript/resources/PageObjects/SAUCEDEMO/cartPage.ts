import { expect } from "@playwright/test"
import { CommonKeywords } from "../../common"


export const cartPageLocators = {
    productBtn: "xpath=//div[@id='continue-shopping']",
    checkoutBtn: "xpath=//button[@class='checkout']",
    cartItem: "xpath=//div[@class='cart_item']",   // use with get elements to loop check item list.
    itemName: "xpath=//div[@class='inventory_item_name']",
    itemDesc: "xpath=//div[@class='inventory_item_desc']",
    itemPrice: "xpath=//div[@class='inventory_item_price']",
    removeBtn: "xpath=//button[text()='Remove']"

}

// TODO : Change method from all to use other way around, this is too flaky.
export async function removeProducts(common: CommonKeywords, products: string[]) {
    const cartItems = await common.page.locator(cartPageLocators.cartItem).all()
    for (let item of cartItems) {
        let iName = (await item.locator(cartPageLocators.itemName).textContent({timeout:2000})) ?? ""
        console.log(iName);

        if (iName && products.some(prod => iName.toLocaleLowerCase().includes(prod.toLocaleLowerCase()))) {
            // console.log(`remove ${item}`);
            await item.locator(cartPageLocators.removeBtn).click({timeout:1000})
        }
    }

}

export async function verifyItemsInCart(common: CommonKeywords, products: string[]) {

}