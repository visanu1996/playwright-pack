import { BasePage } from "@core/BasePage"

export class SDCheckoutPage extends BasePage {
    protected checkoutPageLocators = {
        // sub page - information page
        informationPageHeader: "xpath=//span[@class='title' and text()='Checkout: Your Information']",
        informationForm: {
            firstName: "xpath=//input[@id='first-name']",
            lastName: "xpath=//input[@id='last-name']",
            postalCode: "xpath=//input[@id='postal-code']",
            next: "xpath=//input[@id='continue']",
            back: "xpath=//button[@id='cancel']"
        },
        // sub page - Overview
        overviewPageHeader: "xpath=//span[@class='title' and text()='Checkout: Overview']",

        billingInformation: {
            shippingId: "xpath=//div[text()='Payment Information:']/following-sibling::div[1]",
            shippingInformation: "xpath=//div[text()='Shipping Information:']/following-sibling::div[1]",
            price: "xpath=//div[@class='summary_subtotal_label']",
            tax: "xpath=//div[@class='summary_tax_label']",
            totalPrice: "xpath=//div[@class='summary_total_label']"
        },

        itemBox: {
            all: "xpath=//div[@class='cart_item_label']",
            individual: "xpath=//div[@class='cart_item_label' and .//div[@class='inventory_item_name' and contains(text(),'[TO_CHANGE]')]]",
            itemName: "//div[@class='inventory_item_name']",
            itemPrice: "//div[@class='item_pricebar']"
        },
        confirmShippingBtn: "xpath=//button[@id='finish']",
        // sub page - Complete
        completePageHeader: "xpath=//span[@class='title' and text()='Checkout: Complete!']",
        // msgHeader: "xpath=//h2[contains(text(),'Thank you for your order!')]",
        msgHeader: "xpath=//h2[@class='complete-header']",
        msgDetail: "xpath=(//h2[@class='complete-header']/following-sibling::div)[1]",
        backToHomeBtn: "xpath=//button[@id='back-to-products']"
    }
    /**
    * Fill checkout information.
    * @param fName as first name.
    * @param lName as last name.
    * @param zipCode as zip code.
    * @returns none.
    */
    async FillInformation(fName: string, lName: string, zipCode: string) {
        await this.fillText(this.checkoutPageLocators.informationForm.firstName, fName)
        await this.fillText(this.checkoutPageLocators.informationForm.lastName, lName)
        await this.fillText(this.checkoutPageLocators.informationForm.postalCode, zipCode)

        await this.clickElement(this.checkoutPageLocators.informationForm.next)
    }

    /**
    * Sum total price from each items and validate it with expected price.
    * @param expectedPrice as the expected price to validate.
    * @returns totalPrice
    */
    async SumTotalFromItems(expectedPrice: number) {
        let totalPrice = 0;
        let items = await this.page.locator(this.checkoutPageLocators.itemBox.all).all()

        for (const item of items) {
            let raw = (await item.locator(this.checkoutPageLocators.itemBox.itemPrice).innerText()) ?? ''
            let price = parseFloat(raw.split('$').pop()?.trim() ?? '')
            if (!isNaN(price)) totalPrice += price
        }

        console.log(`Total price is : ${totalPrice}`)
        if (expectedPrice != totalPrice) throw new Error(`Total price and Expected price is not equal.`)
        return totalPrice
    }

    /**
    * Get shipping information and return as object.
    * @returns shippingInformation
    */
    async GetShippingInformation() {
        const shipLocator = this.checkoutPageLocators.billingInformation
        let maxTimeout = 5000
        let shippingInformation : {[keys:string]: any} = {}

        shippingInformation['id'] = await this.page.locator(shipLocator.shippingId).innerText({timeout:maxTimeout})
        shippingInformation['delivery'] = await this.page.locator(shipLocator.shippingInformation).innerText({timeout:maxTimeout})
        shippingInformation['price'] = await this.page.locator(shipLocator.price).innerText({timeout:maxTimeout})
        shippingInformation['tax'] = await this.page.locator(shipLocator.tax).innerText({timeout:maxTimeout})
        shippingInformation['total'] = await this.page.locator(shipLocator.totalPrice).innerText({timeout:maxTimeout})

        console.log(`Shipping Information : \n${JSON.stringify(shippingInformation)}`);
        
        return shippingInformation
    }

    /**
    * Complete shipping and verify it is complete.
    * @param textContain as contains text to check from complete header.
    */
    async completeShipping(textContain: string){

        await this.clickElement(this.checkoutPageLocators.confirmShippingBtn)
        await this.verifyPageArrive(this.checkoutPageLocators.completePageHeader)
        await this.verifyContainsValue(this.checkoutPageLocators.msgHeader,textContain)
    
        let messageDetail = await this.getInnerText(this.checkoutPageLocators.msgDetail)
        console.log(messageDetail);
        
        await this.clickElement(this.checkoutPageLocators.backToHomeBtn)
    }
}