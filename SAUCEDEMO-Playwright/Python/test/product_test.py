from resources.PageObjects.SAUCEDEMO.sauce_common import SauceCommonFlows
from utils.session_manage import create_test_session

class TestProduct:
    
    def setup_method(self):
        self.wd, self.webs = create_test_session()
        self.sauce_common = SauceCommonFlows(self.wd)
        self.product_page = self.sauce_common.product_page
        self.login_class = self.sauce_common.login_page
        self.webs.web_setup()
        self.login_class.login_with_std_cred()
        
    def teardown_method(self):
        self.wd.page.wait_for_timeout(1000)
        self.wd.close_browser()
        
    def test_add_valid_products(self):
        """TC001 Add valid products"""
        self.product_page.add_or_remove_products(['Backpack','Bike Light', 'T-Shirt'])
    
    def test_add_invalid_product(self):
        """TC002 Add invalid product"""
        self.product_page.add_or_remove_products(['Hello Friends'])
    
    def test_remove_valid_products(self):
        """TC003 Remove valid products"""
        self.product_page.add_or_remove_products(['Backpack','Bike Light', 'T-Shirt']) #add
        self.product_page.add_or_remove_products(['Backpack', 'T-Shirt']) # remove
    
    def test_remove_invalid_product(self):
        """TC004 Remove invalid products"""
        self.product_page.add_or_remove_products(['Backpack', 'T-Shirt']) #add
        self.product_page.add_or_remove_products(['World']) #remove
        
    def test_reset_app_state(self):
        """TC005 Reset App State, clear all items cart."""
        #  defect from clear cart items (not remove added item from product page.)
        self.product_page.add_or_remove_products(['Backpack', 'T-Shirt'])
        self.product_page.menu_select('resetAppState')
    
    def test_change_sort(self):
        """TC006 Change Value from A to Z to Z to A"""
        self.product_page.change_filter_by_value("za")
        self.product_page.page.wait_for_timeout(5000)
    
    def test_retrieve_products_detail(self):
        """TC007 Get Products Detail"""
        self.product_page.get_products_detail(['Backpack', 'Bike Light', 'T-Shirt'])