from resources.PageObjects.SAUCEDEMO.sauce_common import SauceDemoBase



class ProductPage(SauceDemoBase):

    PRODUCT_PAGE_LOCATORS = {
        "productHeader": "xpath=//span[@class='title' and text()='Products']",
        "itemBox": {
            "mainBox": "xpath=(//div[@class='inventory_item' and .//div[@class='inventory_item_name ' and contains(text(),'[TO_CHANGE]')]])[1]",
            "itemImg": "/div[@class='inventory_item_img']",  # use after mainBox
            "itemName": "//div[@class='inventory_item_name ']",
            "itemDesc": "//div[@class='inventory_item_desc']",
            "itemPrice": "//div[@class='inventory_item_price']",
            "addBtn": "//button",
        },
        "filter": "xpath=//select[@class='product_sort_container']",
        "cart_badge" : "xpath=//span[@class='shopping_cart_badge']"
    }

    products_detail = {}


    def add_or_remove_products(self, products: list):
        """Add specific products to cart from the product page.

        Clicks the add button for each product in the list.
        
        Args:
            products (list): List of product names to add to cart.

        """
        for product in products:
            product_box = self.PRODUCT_PAGE_LOCATORS["itemBox"]["mainBox"].replace(
                "[TO_CHANGE]", product
            )
            add_btn = product_box + self.PRODUCT_PAGE_LOCATORS["itemBox"]["addBtn"]

            self.page.wait_for_timeout(1000)

            if self.page.locator(add_btn).is_visible():
                self.page.locator(add_btn).click()
            else:
                print(f"\nThere is no product named : {product}")


    def get_products_detail(self, products: list):
        """Extract description and price for specific products.

        Retrieves product details for each product in the list and stores them internally.

        Args:
            products (list): List of product names to get details for.

        Returns:
            dict: Dictionary with product names as keys and product details as values.
                Structure: {'product_name': {'description': str, 'price': str}, ...}

        Example:
            >>> products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light']
            >>> products_detail = get_products_detail(products)
            {'Sauce Labs Backpack': {'description': '...', 'price': '$29.99'}, ...}
        """
        for product in products:
            product_box = self.PRODUCT_PAGE_LOCATORS["itemBox"]["mainBox"].replace(
                "[TO_CHANGE]", product
            )

            try:
                product_desc = self.page.locator(
                    product_box + self.PRODUCT_PAGE_LOCATORS["itemBox"]["itemDesc"]
                ).text_content()
                product_price = self.page.locator(
                    product_box + self.PRODUCT_PAGE_LOCATORS["itemBox"]["itemPrice"]
                ).text_content()
                self.products_detail[product] = {
                    "description": product_desc,
                    "price": product_price,
                }
            except:
                print(f"\nThere is no product named : {product}")
        
        print(self.products_detail)
        return self.products_detail

    def change_filter_by_value(self, method="az"):
        """Change product sorting filter by selected method.

        Args:
            method (str): Sorting method. Valid options: 'az' (A-Z), 'za' (Z-A), 
                         'lohi' (low to high price), 'hilo' (high to low price).
                         Defaults to 'az'.

        Raises:
            Exception: If the specified method is not in the valid options list.
        """
        methods = ["az", "za", "lohi", "hilo"]
        
        if method not in methods :
            raise Exception(f"There is no such {method} in {methods}")
        
        filter_locator = self.page.locator(self.PRODUCT_PAGE_LOCATORS["filter"])
        filter_locator.select_option(value=method)
        self.expect(filter_locator,f'locator suppose to have value of {method}').to_have_value(method)
        
    def verify_product_page(self):
        """Verify that the product page has loaded successfully."""
        self.verify_page_arrive(self.PRODUCT_PAGE_LOCATORS["productHeader"])
