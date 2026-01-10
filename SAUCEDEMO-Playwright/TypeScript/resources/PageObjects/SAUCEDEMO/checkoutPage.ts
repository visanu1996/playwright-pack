import { CommonKeywords } from "../../common"

export const checkoutPageLocators = {
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
    // sub page - Complete
    completePageHeader: "xpath=//span[@class='title' and text()='Checkout: Complete!']",

}

    /**
    * Fill checkout information.
    * @param common  as CommonKeywords.
    * @param fName as first name.
    * @param lName as last name.
    * @param zipCode as zip code.
    * @returns none.
    */
export async function FillInformation(common: CommonKeywords, fName: string, lName: string, zipCode: string) {
    await common.fillText(checkoutPageLocators.informationForm.firstName, fName)
    await common.fillText(checkoutPageLocators.informationForm.lastName, lName)
    await common.fillText(checkoutPageLocators.informationForm.postalCode, zipCode)

    await common.clickElement(checkoutPageLocators.informationForm.next)
}

    /**
    * Sum total price from each items and validate it with expected price.
    * @param common  as CommonKeywords.
    * @param expectedPrice as the expected price to validate.
    * @returns totalPrice
    */
export async function SumTotalFromItems(common: CommonKeywords, expectedPrice: number) {
    let totalPrice = 0;
    let items = await common.page.locator(checkoutPageLocators.itemBox.all).all()

    for (const item of items) {
        let raw = (await item.locator(checkoutPageLocators.itemBox.itemPrice).innerText()) ?? ''
        let price = parseFloat(raw.split('$').pop()?.trim() ?? '')
        if (!isNaN(price)) totalPrice += price
    }

    console.log(`Total price is : ${totalPrice}`)
    if (expectedPrice != totalPrice) throw new Error(`Total price and Expected price is not equal.`)
    return totalPrice
}

    /**
    * Get shipping information and return as object.
    * @param common  as CommonKeywords.
    * @returns shippingInformation
    */
export async function GetShippingInformation(common: CommonKeywords) {
    const shipLocator = checkoutPageLocators.billingInformation
    let maxTimeout = 5000
    let shippingInformation : {[keys:string]: any} = {}

    shippingInformation['id'] = await common.page.locator(shipLocator.shippingId).innerText({timeout:maxTimeout})
    shippingInformation['delivery'] = await common.page.locator(shipLocator.shippingInformation).innerText({timeout:maxTimeout})
    shippingInformation['price'] = await common.page.locator(shipLocator.price).innerText({timeout:maxTimeout})
    shippingInformation['tax'] = await common.page.locator(shipLocator.tax).innerText({timeout:maxTimeout})
    shippingInformation['total'] = await common.page.locator(shipLocator.totalPrice).innerText({timeout:maxTimeout})

    console.log(`Shipping Information : \n${JSON.stringify(shippingInformation)}`);
    
    return shippingInformation
}

// TODO: Verify Completed msg.
