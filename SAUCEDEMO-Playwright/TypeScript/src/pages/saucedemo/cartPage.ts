import { BasePage } from "@core/BasePage"

export class SDCartPage extends BasePage{
    
    cartPageLocators = {
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
    * Remove Item from cart and verify that it is removed.
    * @param products - e.g., "Backpack", "Jacket")
    * @returns none.
     */
    async removeProduct(...products:string[]){
        for(let product of products){
            const itemBox = this.cartPageLocators.cartItem.replace('[TO_CHANGE]', product)
            const removeBtn = itemBox + this.cartPageLocators.removeBtn
            await this.page.locator(removeBtn).click({force:true})
            await this.expect(this.page.locator(removeBtn)).not.toBeVisible()
            console.log(`Item removed : ${product}`);
        }
    }

    async verifyItemInCart(...products:string[]){
        for(const product of products){
            const itemBox = this.cartPageLocators.cartItem.replace('[TO_CHANGE]',product)
            const removeItemBtn = itemBox+this.cartPageLocators.removeBtn
            await this.expect(this.page.locator(removeItemBtn)).toBeVisible()
            console.log(`Confirm item in cart : ${product}`)
        }   
    }
     async backToShopping() {
        await this.clickElement(this.cartPageLocators.backToShopping)
    }

     async commitPurchase(){
        await this.clickElement(this.cartPageLocators.commitPurchase)
    }

}
