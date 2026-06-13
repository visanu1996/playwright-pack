from utils.session_setup import create_sauce_session
from resources.PageObjects.SAUCEDEMO.productPage import *

class TestProduct:
    def setup_method(self):
        self.common, self.sauce, self.user = create_sauce_session()        
        self.sauce.run_login_test(self.user["USER"]["standard"], self.user["PASSWORD"])
        
    def teardown_method(self):
        self.common.page.wait_for_timeout(1000)
        self.common.close_web_driver()
        
    def test_add_valid_products(self):
        """TC001 Add valid products"""
        self.sauce.run_add_products_test(['Backpack','Bike Light', 'T-Shirt'])
    
    def test_add_invalid_product(self):
        """TC002 Add invalid product"""
        self.sauce.run_add_products_test(['Hello Friends'])
    
    def test_remove_valid_products(self):
        """TC003 Remove valid products"""
        self.sauce.run_add_products_test(['Backpack','Bike Light', 'T-Shirt']) #add
        self.sauce.run_add_products_test(['Backpack', 'T-Shirt']) # remove
    
    def test_remove_invalid_product(self):
        """TC004 Remove invalid products"""
        self.sauce.run_add_products_test(['Backpack', 'T-Shirt']) #add
        self.sauce.run_add_products_test(['World']) #remove
        
    def test_reset_app_state(self):
        """TC005 Reset App State, clear all items cart."""
        #  defect from clear cart items (not remove added item from product page.)
        self.sauce.run_add_products_test(['Backpack', 'T-Shirt'])
        self.sauce.menu_select('resetAppState')
    
    def test_change_sort(self):
        """TC006 Change Value from A to Z to Z to A"""
        change_filter_by_value(self.common, "za")
        self.common.page.wait_for_timeout(5000)
    
    def test_retrieve_products_detail(self):
        """TC007 Get Products Detail"""
        get_products_detail(self.common, ['Backpack', 'Bike Light', 'T-Shirt'])
        