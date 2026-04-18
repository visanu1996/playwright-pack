from resources.common import CommonKeywords
from .loginPage import login_sauce_demo
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
        login_sauce_demo(self.common,user_name,password)
        if  check_toast :
            self.toast_check(toast_text)
            print("Toast error match!")
            
    def toast_check(self,error_text):
        locator = self.common.page.locator(COMMON_LOCATORS["toast"])
        if locator.is_visible() :
            expect(locator).to_contain_text(error_text)
        else:
            raise Exception ("No Toast were found on this page.")
        