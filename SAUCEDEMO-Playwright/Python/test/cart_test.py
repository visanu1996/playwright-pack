from utils.session_setup import create_sauce_session
from resources.PageObjects.SAUCEDEMO.cart_page import *

class TestCart:
    def setup_method(self):
        self.common, self.sauce, self.user = create_sauce_session()
        self.sauce.run_login_test(self.user["USER"]["standard"], self.user["PASSWORD"])
        self.sauce.run_add_products_test(['Backpack','Bike Light', 'T-Shirt'])
        self.sauce.goto_page("cart")
        
    def teardown_method(self):
        self.common.page.wait_for_timeout(1000)
        self.common.close_web_driver()
        
    def test_check_item_in_cart(self):
        """ TC001 Add valid products and check it from cart """
        verify_items_in_cart(self.common,['Backpack', 'Bike Light', 'T-Shirt'])
        
    def test_remove_item_from_cart(self):
        """ TC002 Remove item from cart """
        remove_products(self.common,['Backpack', 'T-Shirt'])
    
    def test_commit_purchases(self):
        """ TC003 Continue shoping then add new items and commit purchase """
        back_to_shopping(self.common)
        self.sauce.run_add_products_test(['Onesie'])
        self.sauce.goto_page("cart")
        verify_items_in_cart(self.common,['Backpack','Bike Light', 'T-Shirt', 'Onesie'])
        commit_purchase(self.common)