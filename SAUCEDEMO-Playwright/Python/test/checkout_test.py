from resources.PageObjects.SAUCEDEMO.sauce_common import SauceCommonFlows
from utils.session_manage import create_test_session

class TestCheckout:
    
    def setup_method(self):
        self.wd, self.webs = create_test_session()
        self.sauce_common = SauceCommonFlows(self.wd)
        
        self.webs.web_setup()
        self.sauce_common.login_page.login_with_std_cred()
        self.sauce_common.product_page.add_or_remove_products(['Backpack', 'Bike Light', 'T-Shirt'])
        self.sauce_common.product_page.goto_page('cart')
        self.sauce_common.cart_page.verify_items_in_cart(['Backpack', 'Bike Light', 'T-Shirt'])
        self.sauce_common.cart_page.commit_purchase()
        
    def teardown_method(self):
        self.wd.close_browser()
            
    def test_fill_information(self):
        """TC001 Not adding information in checkout information page."""
        self.sauce_common.checkout_page.fill_information_and_verify_toast("","","", "First Name is required")
        self.sauce_common.checkout_page.fill_information_and_verify_toast("Visan", "", "1235", "Last Name is required")
        self.sauce_common.checkout_page.fill_information_and_verify_toast("Visan", "Damn", "", "Postal Code is required")
        self.sauce_common.checkout_page.fill_information_and_verify_toast("Visan", "Laster", "12345")
        
    def test_check_total_sum(self):
        """TC002 Check total price, items price compare to total price."""
        self.sauce_common.checkout_page.fill_information("Visan", "Laster", "12345")
        self.sauce_common.checkout_page.sum_total_from_items(55.97)
    
    def test_get_shipping_information(self):
        """TC003 Get Shipping Information"""
        self.sauce_common.checkout_page.fill_information("Visan", "Laster", "12345")
        self.sauce_common.checkout_page.get_shipping_information()
        
    def test_verify_shipping_complete(self):
        """TC004 Verify complete message."""
        self.sauce_common.checkout_page.fill_information("Visan", "Laster", "12345")
        self.sauce_common.checkout_page.verify_complete_shipping("Thank you for your order!")
    