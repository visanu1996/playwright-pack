from resources.common import CommonKeywords
from .loginPage import login_sauce_demo, toast_check
from .productPage import add_or_remove_products, verify_product_page, verify_cart_badge
from playwright.sync_api import  expect

COMMON_LOCATORS = {
    "burger": "xpath=//button[@id='react-burger-menu-btn']",
    "menuBar": {
        "allItems": "xpath=//a[text()='All Items']",
        "about": "xpath=//a[text()='About']",
        "logout": "xpath=//a[text()='Logout']",
        "resetAppState": "xpath=//a[text()='Reset App State']",
        "closeMenu": "xpath=//button[text()='Close Menu']"
    },
    "pages": {
        "cart": "xpath=//a[@class='shopping_cart_link']",
        "cartLink": "https://www.saucedemo.com/cart.html",
        "productLink": "https://www.saucedemo.com/inventory.html",
        "checkout": "https://www.saucedemo.com/checkout-step-one.html",
    },
    "toast": "xpath=//h3[@data-test='error']"

}

class CommonSauceDemo:
    def __init__(self, common):
        self.common: CommonKeywords = common
        
    def run_login_test(self, user_name, password, check_toast = False, toast_text: any = None):
        login_sauce_demo(self.common, user_name,password)
        if  check_toast :
            toast_check(self.common, toast_text)
            print("Toast error match!")

    def run_add_products_test(self, products:list):
        verify_product_page(self.common)
        add_or_remove_products(self.common, products)

    def menu_select(self, menu_name):
        self.common.page.locator(COMMON_LOCATORS["burger"]).click()
        self.common.page.locator(COMMON_LOCATORS["menuBar"][menu_name]).wait_for(state="visible")
        self.common.page.locator(COMMON_LOCATORS["menuBar"][menu_name]).click()
        print(menu_name)
        if menu_name == 'resetAppState' : verify_cart_badge(self.common, is_empty=True)
        