from resources.PageObjects.SAUCEDEMO.login_page import LoginPage
from resources.PageObjects.SAUCEDEMO.product_page import ProductPage
from resources.PageObjects.SAUCEDEMO.cart_page import CartPage
from utils.session_manage import create_test_session

class TestCart:
    
    def setup_method(self):
        self.wd, self.webs = create_test_session()
        self.login_page = LoginPage(self.wd)
        self.product_page = ProductPage(self.wd)
        self.cart_page = CartPage(self.wd)
        self.webs.web_setup()
        self.login_page.login_with_std_cred()
        self.product_page.add_or_remove_products(['Backpack', 'Bike Light', 'T-Shirt'])
        self.product_page.goto_page('cart')
        
    def teardown_method(self):
        self.wd.page.wait_for_timeout(1000)
        self.wd.close_browser()
        
    def test_check_item_in_cart(self):
        """ TC001 Add valid products and check it from cart """
        self.cart_page.verify_items_in_cart(['Backpack', 'Bike Light', 'T-Shirt'])
        
    def test_remove_item_from_cart(self):
        """ TC002 Remove item from cart """
        self.cart_page.remove_products(['Backpack', 'T-Shirt'])
    
    def test_commit_purchases(self):
        """ TC003 Continue shoping then add new items and commit purchase """
        self.cart_page.back_to_shopping()
        self.product_page.add_or_remove_products(['Onesie'])
        self.cart_page.goto_page("cart")
        self.cart_page.verify_items_in_cart(['Backpack','Bike Light', 'T-Shirt', 'Onesie'])
        self.cart_page.commit_purchase()