from resources.PageObjects.SAUCEDEMO.login_page import LoginPage
from resources.PageObjects.SAUCEDEMO.product_page import ProductPage
from resources.PageObjects.SAUCEDEMO.cart_page import CartPage
from resources.PageObjects.SAUCEDEMO.checkout_page import CheckoutPage
from utils.session_manage import create_test_session

class TestCheckout:
    
    def setup_method(self):
        self.wd, self.webs = create_test_session()
        self.login_page = LoginPage(self.wd)
        self.product_page = ProductPage(self.wd)
        self.cart_page = CartPage(self.wd)
        self.checkout_page = CheckoutPage(self.wd)
        
        self.webs.web_setup()
        self.login_page.login_with_std_cred()
        self.product_page.add_or_remove_products(['Backpack', 'Bike Light', 'T-Shirt'])
        self.product_page.goto_page('cart')
        self.cart_page.verify_items_in_cart(['Backpack', 'Bike Light', 'T-Shirt'])
        self.cart_page.commit_purchase()
        
    def teardown_method(self):
        self.wd.close_browser()
            
    def test_fill_information(self):
        """TC001 Not adding information in checkout information page."""
        self.checkout_page.fill_information_and_verify_toast("","","", "First Name is required")
        self.checkout_page.fill_information_and_verify_toast("Visan", "", "1235", "Last Name is required")
        self.checkout_page.fill_information_and_verify_toast("Visan", "Damn", "", "Postal Code is required")
        self.checkout_page.fill_information_and_verify_toast("Visan", "Laster", "12345")
        
    def test_check_total_sum(self):
        """TC002 Check total price, items price compare to total price."""
        self.checkout_page.fill_information("Visan", "Laster", "12345")
        self.checkout_page.sum_total_from_items(55.97)
    
    def test_get_shipping_information(self):
        """TC003 Get Shipping Information"""
        self.checkout_page.fill_information("Visan", "Laster", "12345")
        self.checkout_page.get_shipping_information()
        
    def test_verify_shipping_complete(self):
        """TC004 Verify complete message."""
        self.checkout_page.fill_information("Visan", "Laster", "12345")
        self.checkout_page.verify_complete_shipping("Thank you for your order!")
    