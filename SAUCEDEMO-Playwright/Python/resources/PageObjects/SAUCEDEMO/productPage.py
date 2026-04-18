from playwright.sync_api import expect
from resources.common import CommonKeywords

PRODUCT_PAGE_LOCATORS = {
    "productHeader": "xpath=//span[@class='title' and text()='Products']",
    "itemBox": {
        "mainBox": "xpath=(//div[@class='inventory_item' and .//div[@class='inventory_item_name ' and contains(text(),'[TO_CHANGE]')]])[1]",
        "itemImg": "/div[@class='inventory_item_img']",  # use after mainBox
        "itemName": "//div[@class='inventory_item_name ']",
        "itemDesc": "//div[@class='inventory_item_desc']",
        "itemPrice": "//div[@class='inventory_item_price']",
        "addBtn": "//button",
    },
    "filter": "xpath=//select[@class='product_sort_container']",
}

products_detail = {}


def add_or_remove_products(common: CommonKeywords, products: list):
    """Add or remove specific products.

    Will remove if items is already in the cart.
    
    Args:
        common (CommonKeywords): CommonKeywords instance with active page context.
        products (list): List of product names to add or remove.

    """
    for product in products:
        product_box = PRODUCT_PAGE_LOCATORS["itemBox"]["mainBox"].replace(
            "[TO_CHANGE]", product
        )
        add_btn = product_box + PRODUCT_PAGE_LOCATORS["itemBox"]["addBtn"]

        common.page.wait_for_timeout(1000)

        if common.page.locator(add_btn).is_visible():
            common.page.locator(add_btn).click()
        else:
            print(f"\nThere is no product named : {product}")


def get_products_detail(common: CommonKeywords, products: list):
    """Get product detail for specific products.

    Extracts product description and price for each product.

    Args:
        common (CommonKeywords): CommonKeywords instance with active page context.
        products (list): List of product names to get details.

    Returns:
        dict: Dictionary with product names as keys and product details as values.
              Structure: {'product_name': {'description': str, 'price': str}, ...}

    Example:
        >>> products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light']
        >>> get_products_detail(common, products)
        {'Sauce Labs Backpack': {'description': '...', 'price': '$29.99'}, ...}
    """
    for product in products:
        product_box = PRODUCT_PAGE_LOCATORS["itemBox"]["mainBox"].replace(
            "[TO_CHANGE]", product
        )

        try:
            product_desc = common.page.locator(
                product_box + PRODUCT_PAGE_LOCATORS["itemBox"]["itemDesc"]
            ).text_content()
            product_price = common.page.locator(
                product_box + PRODUCT_PAGE_LOCATORS["itemBox"]["itemPrice"]
            ).text_content()
            products_detail[product] = {
                "description": product_desc,
                "price": product_price,
            }
        except:
            print(f"\nThere is no product named : {product}")


def change_filter_by_value(common: CommonKeywords, method="az"):
    """Change products filter by using value from filter options.
    Args:
        common (CommonKeywords): CommonKeywords instance with active page context.
        method : ['az', 'za', 'lohi', 'hilo'] as a choice

    Exception:
        raise: If there is no such method value
    """
    methods = ["az", "za", "lohi", "hilo"]
    
    if method not in methods :
        raise Exception(f"There is no such {method} in {methods}")
    
    filter_locator = common.page.locator(PRODUCT_PAGE_LOCATORS["filter"])
    filter_locator.select_option(value=method)
    expect(filter_locator).to_have_value(method)