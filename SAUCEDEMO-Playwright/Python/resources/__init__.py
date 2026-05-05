from .PageObjects.SAUCEDEMO.loginPage import login_sauce_demo
from .PageObjects.SAUCEDEMO.cart_page import remove_products, verify_items_in_cart, commit_purchase, back_to_shopping
from .PageObjects.SAUCEDEMO.checkout_page import fill_information, verify_complete_shipping, sum_total_from_items, get_shipping_information
from .PageObjects.SAUCEDEMO.productPage import add_or_remove_products, change_filter_by_value, get_products_detail, verify_cart_badge, verify_product_page

__all__ = [
    "login_sauce_demo",
    "remove_products",
    "verify_items_in_cart",
    "commit_purchase",
    "back_to_shopping",
    "fill_information",
    "verify_complete_shipping",
    "sum_total_from_items",
    "get_shipping_information",
    "add_or_remove_products",
    "change_filter_by_value",
    "get_products_detail",
    "verify_cart_badge",
    "verify_product_page",
]