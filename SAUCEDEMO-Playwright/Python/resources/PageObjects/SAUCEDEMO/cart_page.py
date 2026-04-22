from playwright.sync_api import expect
from resources.common import CommonKeywords

CART_PAGE_LOCATORS = {
    "productBtn": "xpath=//div[@id='continue-shopping']",
    "checkoutBtn": "xpath=//button[@class='checkout']",
    "backToShopping": "xpath=//button[@id='continue-shopping']",
    "commitPurchase": "xpath=//button[@id='checkout']",
    "cartItem": "xpath=//div[@class='cart_item' and .//div[@class='inventory_item_name' and contains(text(),'[TO_CHANGE]')]]",   # use with get elements to loop check item list.
    # can't be use as individual, need to combine with cartItem
    "itemName": "//div[@class='inventory_item_name']",
    "itemDesc": "//div[@class='inventory_item_desc']",
    "itemPrice": "//div[@class='inventory_item_price']",
    "removeBtn": "//button[text()='Remove']",
}

def remove_products(common: CommonKeywords,products):
    """ Remove product for specific products in Cart page.

    Args:
        common (CommonKeywords): CommonKeywords instance with active page context.
        products (list): List of product names to be remove.
    """
    for product in products:
        item_box = CART_PAGE_LOCATORS["cartItem"].replace('[TO_CHANGE]', product)
        remove_item_btn = item_box + CART_PAGE_LOCATORS["removeBtn"]
        common.page.locator(remove_item_btn).click(force=True)
        expect(common.page.locator(remove_item_btn)).not_to_be_visible()
        print(f"Item removed : {product}")
        

def verify_items_in_cart(common: CommonKeywords, products):
    for product in products:
        item_box = CART_PAGE_LOCATORS["cartItem"].replace('[TO_CHANGE]', product)
        remove_item_btn = item_box + CART_PAGE_LOCATORS["removeBtn"]
        expect(common.page.locator(remove_item_btn)).to_be_visible()
        print(f"Confirm item in cart : {product}")
        
def back_to_shopping(common: CommonKeywords):
    common.click_element(CART_PAGE_LOCATORS["backToShopping"])
    
def commit_purchase(common: CommonKeywords):
    common.click_element(CART_PAGE_LOCATORS["commitPurchase"])
