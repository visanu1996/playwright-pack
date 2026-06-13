from utils.session_setup import create_sauce_session
from resources.PageObjects.SAUCEDEMO.checkout_page import *
from resources.PageObjects.SAUCEDEMO.cart_page import verify_items_in_cart, commit_purchase

class TestCheckout:
    def setup_method(self):
        self.common, self.sauce, self.user = create_sauce_session()
        self.sauce.run_login_test(self.user["USER"]["standard"], self.user["PASSWORD"])
        self.sauce.run_add_products_test(['Backpack','Bike Light', 'T-Shirt'])
        self.sauce.goto_page("cart")
        verify_items_in_cart(self.common,['Backpack', 'Bike Light', 'T-Shirt'])
        commit_purchase(self.common)
        
    def teardown_method(self):
        self.common.page.wait_for_timeout(1000)
        self.common.close_web_driver()
        
    def test_fill_information(self):
        """TC001 Not adding information in checkout information page."""
        self.sauce.fill_informatio_test("","","", True, "First Name is required")
        self.sauce.fill_informatio_test("Visan", "", "1235", True, "Last Name is required")
        self.sauce.fill_informatio_test("Visan", "Damn", "", True, "Postal Code is required")
        self.sauce.fill_informatio_test("Visan", "Laster", "12345")
        
    def test_check_total_sum(self):
        """TC002 Check total price, items price compare to total price."""
        self.sauce.fill_informatio_test("Visan", "Laster", "12345")
        sum_total_from_items(self.common, 55.97)
    
    def test_get_shipping_information(self):
        """TC003 Get Shipping Information"""
        self.sauce.fill_informatio_test("Visan", "Laster", "12345")
        get_shipping_information(self.common)
        
    def test_verify_shipping_complete(self):
        """TC004 Verify complete message."""
        self.sauce.fill_informatio_test("Visan", "Laster", "12345")
        verify_complete_shipping(self.common, "Thank you for your order!")