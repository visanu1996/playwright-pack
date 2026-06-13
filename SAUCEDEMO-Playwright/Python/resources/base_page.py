from utils.driver_factory import WebDriverManagement


class BasePage : 
    def __init__(self, wd: WebDriverManagement):
        self.wd = wd
        self.config  = wd.config
        self.test_data = wd.test_data
        
    @property
    def page(self):
        if self.wd.page is None:
            raise Exception("No active browser page!")
        return self.wd.page
        
    def verify_page_arrive(self,locator:str , timeout=None):
        t = self._get_timeout(timeout)
        self.wd.expect(self.page.locator(locator)).to_be_visible(timeout=t)
        
    def click_element(self, locator:str, timeout=None):
        self.page.locator(locator).click(timeout=timeout, force=True)

    def fill_text(self,locator:str, text:str, timeout=None, secret:bool=False,):
        t = self._get_timeout(timeout)        
        self.page.locator(locator).fill(text,timeout=t)
        
        if  not secret:
            print(f"filled loactor {locator} with : {text}")
        else :
            print(f"filled secret to locator {locator}")
            
    def verify_contains_value(self, locator: str, text: str, timeout=None):
        t = self._get_timeout(timeout)
        self.page.locator(locator).wait_for(state="visible", timeout=t)
        self.wd.expect(self.page.locator(locator)).to_contain_text(text)

    def get_element_value(self, locator: str, timeout=None):
        t = self._get_timeout(timeout)
        self.page.locator(locator).wait_for(state="visible", timeout=t)
        return self.page.locator(locator).input_value()
        
    def get_element_text(self, locator: str, timeout=None):
        t = self._get_timeout(timeout)
        self.page.locator(locator).wait_for(state="visible", timeout=t)
        text = self.page.locator(locator).text_content()
        return text
    
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #   
    def _get_timeout(self, timeout):
        return timeout if timeout is not None else self.config.get('GLOBAL_WAIT',10000)
    
    