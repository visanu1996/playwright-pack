from resources.base_page import BasePage

class SauceDemoBase(BasePage):

    COMMON_LOCATORS = {
        "burger": "xpath=//button[@id='react-burger-menu-btn']",
        "menuBar": {
            "allItems": "xpath=//a[text()='All Items']",
            "about": "xpath=//a[text()='About']",
            "logout": "xpath=//a[text()='Logout']",
            "resetAppState": "xpath=//a[text()='Reset App State']",
            "closeMenu": "xpath=//button[text()='Close Menu']"
        },
        "pages_locator": {
            "cart": "xpath=//a[@class='shopping_cart_link']",
        },
        "pages_url":{
            "cartLink": "https://www.saucedemo.com/cart.html",
            "productLink": "https://www.saucedemo.com/inventory.html",
            "checkoutLink": "https://www.saucedemo.com/checkout-step-one.html",       
        },
        "toast": "xpath=//h3[@data-test='error']"

    }   
            
    def menu_select(self, menu_name):
        self.page.locator(self.COMMON_LOCATORS["burger"]).click()
        self.page.locator(self.COMMON_LOCATORS["menuBar"][menu_name]).wait_for(state="visible")
        self.page.locator(self.COMMON_LOCATORS["menuBar"][menu_name]).click()
        print(menu_name)
        if menu_name == 'resetAppState' : self.verify_cart_badge(is_empty=True)
    
    def goto_page(self, page_name):
        """ Goto selected page by locator or link based on page_name.

            Currently there is only cart available as locator not link.
        Args:
            page_name (string): a page to select ['cart', 'cartLink', 'productLink', 'checkoutLink']
        """
        try:
            if "link" in page_name.casefold():
                self.page.goto(self.COMMON_LOCATORS["pages_url"][page_name])
            else :
                self.page.locator(self.COMMON_LOCATORS["pages_locator"][page_name]).click()        
        except :
            ValueError(f"There is no page name : {page_name}")
            
    def verify_cart_badge(self, is_empty: False):
        """Verify the cart badge visibility state.

        Args:
            is_empty (bool): If True, verifies that cart badge and remove buttons are not visible.
                           If False, verifies that cart badge is visible. Defaults to False.
        """
        if is_empty : 
            self.expect(self.page.locator(self.PRODUCT_PAGE_LOCATORS["cart_badge"]),"cart badge is still visible, it shouldn't be").not_to_be_visible()
            self.expect(self.page.locator("xpath=(//div[@class='inventory_item' and .//div[@class='inventory_item_name ']]//button[text()='Remove'])[1]"),"All Item's should be remove").not_to_be_visible()
        else :
            self.expect(self.page.locator(self.PRODUCT_PAGE_LOCATORS["cart_badge"]),"cart badge is not visible, it should be").to_be_visible()