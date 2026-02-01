import re
from playwright.sync_api import Page, Browser, BrowserContext, expect, Playwright, sync_playwright

class CommonKeywords :
    
    def __init__ (self) :
        self.pages = {}
        self.page = Page
        self.browser = Browser
        self.context = BrowserContext
        self.playwright = Playwright
        
    def create_web_driver(self):
        """
        Create a webdriver and context with fix options.
        Returns browser/context for flexibility, can be ignore the return.
        """
        self.playwright = sync_playwright().start()
        chromium = self.playwright.chromium
        self.browser = chromium.launch(
            headless=False, 
            args=['--start-maximized'], 
            slow_mo=1000
        )
        self.context = self.browser.new_context(no_viewport=True)
        
    def close_web_driver(self):
        """
        close context, browser and playwright        
        """
        if self.context :
            self.context.close()
            self.browser.close()
            self.playwright.stop()
        else:
            print("The browser is currently not openning.")
            
            
    def create_page(self, web_string, page_name):
        """
        Create page and store it in self.pages dictionary
        
        :param web_string: Web URL
        :param page_name: Name to store in self.pages dictionary.
        """
        if not self.context : raise   Exception('Context is not created. Call create_web_driver() first.')  
        
        page = self.context.new_page()
        page.goto(web_string,timeout=30000, wait_until='commit')

        self.pages[page_name] = self.page
        self.page = page # not to confuse self.page and page in this function.

    def get_pages(self):
        """
        Return all created pages name as a set.
        """
        if self.pages:
            all_pages = self.pages.keys()
            print(f"all stored pages : {all_pages}")
            return all_pages
        else:
            print(f"Currently there is no page store.")
    
    def get_page(self, page_name):
        """
        Get page from self.pages as an object
        Return None if there is no page in self.pages
        
        :param page_name: Description
        """
        if page_name in self.pages:
            return self.pages[page_name]
        else:
            return None
        
    def set_page(self, page_name):
        """
        Set current page.
        
        :param page_name: to set as current page from self.pages[page_name]
        """
        if page_name in self.pages:
            self.page = self.pages[page_name]   
        else:
            print(f"Page {page_name} not found in stored pages.")

    # TODO: verify page arrive
    # TODO: click element : click does have auto wait so no need to use waitfor
    # TODO: fill text : Fill does have auto wait so no need to use waitfor
    # TODO: Verify contains value
    # TODO: Get element value