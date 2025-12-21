import { expect } from "@playwright/test"
import { CommonKeywords } from "../../common"

export const checkoutPageLocators = {
    // sub page - information page
    informationPageHeader: "xpath=//span[@class='title' and text()='Checkout: Your Information']",
    informationForm: {
        firstName: "xpath=//input[@id='first-name']",
        lastName: "xpath=//input[@id='last-name']",
        postalCode: "xpath=//input[@id='postal-code']",
    },
    // sub page - Overview
    overviewPageHeader: "xpath=//span[@class='title' and text()='Checkout: Overview']",

    billingInformation: {
        shippingId: "xpath=//div[@class='summary_value_label']",
        shippingInformation: "xpath=//div[@class='summary_value_label']",
        price: "xpath=//div[@class='summary_subtotal_label']",
        tax: "xpath=//div[@class='summary_tax_label']",
        totalPrice: "xpath=//div[@class='summary_total_label']"
    },

    itemBox: {
        all: "xpath=//div[@class='cart_item_label'",
        individual: "xpath=//div[@class='cart_item_label' and .//div[@class='inventory_item_name' and contains(text(),'[TO_CHANGE]')]]",
        itemPrice: "//div[@class='inventory_item_name']",
        itemName: "//div[@class='item_pricebar']"
    },
    // sub page - Complete
    completePageHeader: "xpath=//span[@class='title' and text()='Checkout: Complete!']",

}

export async function FillInformation(common: CommonKeywords, fName: string, lName: string, zipCode: string) {
    let fNameField = checkoutPageLocators.informationForm.firstName
    let lNameField = checkoutPageLocators.informationForm.lastName
    let zipCodeField = checkoutPageLocators.informationForm.postalCode

    await common.fillText(fNameField, fName)
    await common.fillText(lNameField, lName)
    await common.fillText(zipCodeField, zipCode)

}

export async function SumTotalFromItems(common: CommonKeywords, expectedPrice: number) {
    let totalPrice = 0;
    let items = await common.page.locator(checkoutPageLocators.itemBox.all).all()

    for (const item of items) {
        let raw = (await item.locator(checkoutPageLocators.itemBox.itemPrice).textContent()) ?? ''
        let price = parseFloat(raw.split('$').pop()?.trim() ?? '')
        if (!isNaN(price)) totalPrice += price
    }

    if (expectedPrice != totalPrice) throw new Error(`Total price and Expected price is not equal.`)

    console.log(`Total price is : ${totalPrice}`)
    return totalPrice
}

// TODO: Log shipping information and Id
// TODO: Verify Completed msg.
