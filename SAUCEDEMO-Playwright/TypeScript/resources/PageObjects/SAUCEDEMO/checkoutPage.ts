import { expect } from "@playwright/test"
import { CommonKeywords } from "../../common"

export const checkoutPageLocators = {
    invoiceHeader: "",

    // sub page - information page
    informationPageHeader: "xpath=//span[@class='title' and text()='Checkout: Your Information']",
    informationForm: {
        firstName: "xpath=//input[@id='first-name']",
        lastName: "xpath=//input[@id='last-name']",
        postalCode: "xpath=//input[@id='postal-code']",
        toastMsg: "xpath=//h3[@data-test='error']"
    },
    // sub page - Overview
    overviewPageHeader: "xpath=//span[@class='title' and text()='Checkout: Overview']",
    // TODO : for all price tag[text]
    // use element.text_content() then split text with text.split("$")[-1].strip() to get the last value and get rid of empty space.
    billingInformation: {
        shippingId: "xpath=//div[@class='summary_value_label']",
        shippingInformation: "xpath=//div[@class='summary_value_label']",
        price: "xpath=//div[@class='summary_subtotal_label']",
        tax: "xpath=//div[@class='summary_tax_label']",
        totalPrice: "xpath=//div[@class='summary_total_label']"
    },
    itemBox: {
        main: "xpath=//div[@class='cart_item_label' and .//div[@class='inventory_item_name' and contains(text(),'[TO_CHANGE]')]]",
        itemPrice: "//div[@class='inventory_item_name']",
        itemName: "//div[@class='item_pricebar']"
    },
    // sub page - Complete
    completePageHeader: "xpath=//span[@class='title' and text()='Checkout: Complete!']",

}

// TODO: Create sum total price from item tag
// TODO: Verify Total price is equal to price + tax
// TODO: Log shipping information and Id
// TODO: Verify Completed msg.
