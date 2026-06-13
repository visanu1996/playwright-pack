from playwright.sync_api import expect
from resources.common import CommonKeywords
from json import dumps

CHECKOUT_PAGE_LOCATORS = {
    # sub page - information page
    "informationPageHeader": "xpath=//span[@class='title' and text()='Checkout: Your Information']",
    "informationForm": {
        "firstName": "xpath=//input[@id='first-name']",
        "lastName": "xpath=//input[@id='last-name']",
        "postalCode": "xpath=//input[@id='postal-code']",
        "next": "xpath=//input[@id='continue']",
        "back": "xpath=//button[@id='cancel']",
    },
    # sub page - Overview
    "overviewPageHeader": "xpath=//span[@class='title' and text()='Checkout: Overview']",
    "billingInformation": {
        "shippingId": "xpath=//div[text()='Payment Information:']/following-sibling::div[1]",
        "shippingInformation": "xpath=//div[text()='Shipping Information:']/following-sibling::div[1]",
        "price": "xpath=//div[@class='summary_subtotal_label']",
        "tax": "xpath=//div[@class='summary_tax_label']",
        "totalPrice": "xpath=//div[@class='summary_total_label']",
    },
    "itemBox": {
        "all": "xpath=//div[@class='cart_item_label']",
        "individual": "xpath=//div[@class='cart_item_label' and .//div[@class='inventory_item_name' and contains(text(),'[TO_CHANGE]')]]",
        "itemName": "//div[@class='inventory_item_name']",
        "itemPrice": "//div[@class='item_pricebar']",
    },
    "confirmShippingBtn": "xpath=//button[@id='finish']",
    #  sub page - Complete
    "completePageHeader": "xpath=//span[@class='title' and text()='Checkout: Complete!']",
    # msgHeader: "xpath=//h2[contains(text(),'Thank you for your order!')]",
    "msgHeader": "xpath=//h2[@class='complete-header']",
    "msgDetail": "xpath=//h2[@class='complete-header']/following-sibling::div",
    "backToHomeBtn": "xpath=//button[@id='back-to-products']",
}


def fill_information(common: CommonKeywords, first_name, last_name, zip_code):
    """Fill information in checkout page.

    Args:
        common (CommonKeywords): CommonKeywords instance with active page context.
        first_name (_type_): as first name
        last_name (_type_): as last name
        zip_code (_type_): as zip code
    """
    common.fill_text(CHECKOUT_PAGE_LOCATORS["informationForm"]["firstName"], first_name)
    common.fill_text(CHECKOUT_PAGE_LOCATORS["informationForm"]["lastName"], last_name)
    common.fill_text(CHECKOUT_PAGE_LOCATORS["informationForm"]["postalCode"], zip_code)
    common.click_element(CHECKOUT_PAGE_LOCATORS["informationForm"]["next"])


def sum_total_from_items(common: CommonKeywords, expected_price:int):
    """_summary_

    Args:
        common (CommonKeywords): CommonKeywords instance with active page context.
        expected_price (int): as the expected price to validate.

    Raises:
        Exception: raise an error if total price and expected price don't match.

    Returns:
        float: the total sum of items in checkpoint page.
    """
    total_price = 0
    items = common.page.locator(CHECKOUT_PAGE_LOCATORS["itemBox"]["all"]).all()
    for item in items:
        raw = (
            item.locator(CHECKOUT_PAGE_LOCATORS["itemBox"]["itemPrice"]).inner_text()
            if item
            else ""
        )
        price = float(raw.split("$")[-1].strip()) if raw else ""
        
        if price : 
            total_price+=price
            
    print(f"Total price is : {total_price}")
    if expected_price != total_price:
        raise Exception(f"Total price and expected price is not equal.")
    return total_price

def get_shipping_information(common:CommonKeywords):
    """Get all information from billing.

    Args:
        common (CommonKeywords): CommonKeywords instance with active page context.

    Returns:
        dict: shippingInformation
    """
    ship_locator = CHECKOUT_PAGE_LOCATORS["billingInformation"]
    max_timeout = 5000
    shipping_information = {}
    
    shipping_information['id'] = common.page.locator(ship_locator["shippingId"]).inner_text(timeout=max_timeout)
    shipping_information['delivery'] = common.page.locator(ship_locator["shippingInformation"]).inner_text(timeout=max_timeout)
    shipping_information['price'] = common.page.locator(ship_locator["price"]).inner_text(timeout=max_timeout)
    shipping_information['tax'] = common.page.locator(ship_locator["tax"]).inner_text(timeout=max_timeout)
    shipping_information['total'] =  common.page.locator(ship_locator["totalPrice"]).inner_text(timeout=max_timeout)
    
    print(f"Shipping Information : \n{dumps(shipping_information)}")
    
    return shipping_information

def verify_complete_shipping(common: CommonKeywords, text_contains:str):
    """ Verify Completed shipping process.

    Args:
        common (CommonKeywords): CommonKeywords instance with active page context.
        text_contains (str): as a text to verify in message context.
    """
    common.click_element(CHECKOUT_PAGE_LOCATORS["confirmShippingBtn"])
    common.verify_page_arrive(CHECKOUT_PAGE_LOCATORS["completePageHeader"])
    common.verify_contains_value(CHECKOUT_PAGE_LOCATORS["msgHeader"],text_contains)
    
    message_detail = common.page.locator(CHECKOUT_PAGE_LOCATORS["msgDetail"]).inner_text()
    print(message_detail)
    
    common.click_element(CHECKOUT_PAGE_LOCATORS["backToHomeBtn"])
    