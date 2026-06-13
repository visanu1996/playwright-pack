from playwright.sync_api import Page, Browser, BrowserContext, expect, Playwright, sync_playwright


class WebDriverManagement:
    def __init__(self, config, test_data):
        self.pages = {}
        self.config = config
        self.test_data = test_data
        self.browser : Browser = None
        self.context : BrowserContext = None
        self.page : Page = None
        self.Playwright: Playwright = None
        self.expect = expect
        
        
    def start_browser(self):
        ''' create a customable and manageable web driver '''
        try :
            print('Browser initialize.')
            self.Playwright = sync_playwright().start()
            web_driver = self.Playwright.chromium
            self.browser = web_driver.launch(
                headless=self.config['HEADLESS'],
                args=['--start-maximized'],
                slow_mo=self.config.get('INTERACT_DELAY',500)
            )
            self.context = self.browser.new_context(no_viewport=True)
            global_wait = self.config.get('GLOBAL_WAIT', 10000)
            navigation_wait = self.config.get('NAV_WAIT', 10000)
            self.context.set_default_navigation_timeout(navigation_wait)
            self.context.set_default_timeout(global_wait)
            print('Complete init browser.')
            return self.context
        except Exception as e:
            raise e    
    def close_browser(self):
        if self.context:
            self.context.close()
            self.browser.close()
            self.Playwright.stop()
        else: 
            print("No Browser is opened.")
            
    def _ensure_browser_is_running(self):
        if not self.browser:
            self.start_browser()
        elif not self.context:
            self.context = self.browser.new_context(no_viewport=True)
            
    def create_page(self,url,page_name):
        self._ensure_browser_is_running()
        new_page = self.context.new_page()
        new_page.goto(url, timeout=10000, wait_until="load")
        
        self.page = new_page
        self.pages[page_name] = new_page
        
        return new_page
    
    def switch_to_page(self, page_name):
        if page_name in self.pages:
            self.page = self.pages[page_name]
            self.page.bring_to_front()
        else:
            raise Exception(f"There is no such page name {page_name} stored in pages.")