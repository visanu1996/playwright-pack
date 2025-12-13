import { expect } from "@playwright/test"
import { CommonKeywords } from "../../common"


export const cartPageLocators = {
    productBtn: "xpath=//div[@id='continue-shopping']",
    checkoutBtn: "xpath=//button[@class='checkout']",
    backToShopping: "xpath=//button[@id='continue-shopping']",
    commitPurchase: "xpath=//button[@id='checkout']",
    cartItem: "xpath=//div[@class='cart_item' and .//div[@class='inventory_item_name' and contains(text(),'[TO_CHANGE]')]]",   // use with get elements to loop check item list.
    // can't be use as individual, need to combine with cartItem
    itemName: "//div[@class='inventory_item_name']",
    itemDesc: "//div[@class='inventory_item_desc']",
    itemPrice: "//div[@class='inventory_item_price']",
    removeBtn: "//button[text()='Remove']",
}

/**
 * Remove Item from product page and verify that it is removed.
 * @param products - e.g., "Backpack", "Jacket")
 * @returns none.
 */
export async function removeProducts(common: CommonKeywords, products: string[]) {
    for(let index = 0 ; index < products.length ; index++){
        const itemBox = cartPageLocators.cartItem.replace('[TO_CHANGE]',products[index])
        const removeItemBtn = itemBox+cartPageLocators.removeBtn
        await common.page.locator(removeItemBtn).click({force:true})
        await expect(common.page.locator(removeItemBtn)).not.toBeVisible()
        console.log(`Item removed : ${products[index]}`)
    }
}

export async function verifyItemsInCart(common: CommonKeywords, products: string[]) {
    for(let index = 0 ; index < products.length ; index++){
        const itemBox = cartPageLocators.cartItem.replace('[TO_CHANGE]',products[index])
        const removeItemBtn = itemBox+cartPageLocators.removeBtn
        await expect(common.page.locator(removeItemBtn)).toBeVisible()
        console.log(`Confirm item in cart : ${products[index]}`)
    }
}

export async function backToShopping(common: CommonKeywords) {
    await common.clickElement(cartPageLocators.backToShopping)
}

export async function commitPurchase(common: CommonKeywords){
    await common.clickElement(cartPageLocators.commitPurchase)
}