from resources.base_page import BasePage

class LoginPage(BasePage):
    # locators
    LOGIN_PAGE_LOCATOR = {
        "loginLogo": "xpath=//div[@class='login_logo']",
        "inputName": "xpath=//input[@id='user-name']",
        "inputPass": "xpath=//input[@id='password']",
        "submitBtn": "xpath=//input[@id='login-button']",
        "toast": "xpath=//h3[@data-test='error']",
    }
    
    def login(self, username, password):
        ''' customize able login functions '''
        self.verify_page_arrive(self.LOGIN_PAGE_LOCATOR['loginLogo'], 5000)
        self.fill_text(self.LOGIN_PAGE_LOCATOR['inputName'], username)
        self.fill_text(self.LOGIN_PAGE_LOCATOR['inputPass'],password, None, True)
        self.click_element(self.LOGIN_PAGE_LOCATOR['submitBtn'])
    
    def verify_toast(self, error_text):
        toast = self.page.locator(self.LOGIN_PAGE_LOCATOR['toast'])
        if toast.is_visible() :
            self.wd.expect(toast).to_contain_text(error_text)
        else:
            raise Exception('No toast found on this page.')     # for checking that there is toast or not in test.
        
    # # # # # # # # # # # # # # # # # PRE SETTING
    
    def login_with_std_cred(self):
        ''' a complete of login with standard user '''
        self.verify_page_arrive(self.LOGIN_PAGE_LOCATOR['loginLogo'], 5000)
        self.fill_text(self.LOGIN_PAGE_LOCATOR['inputName'], self.test_data['USER']['standard'])
        self.fill_text(self.LOGIN_PAGE_LOCATOR['inputPass'],self.test_data['PASSWORD'], None, True)
        self.click_element(self.LOGIN_PAGE_LOCATOR['submitBtn'])
        
    def login_with_lck_user(self):
        ''' a complete of login with locked user '''
        self.verify_page_arrive(self.LOGIN_PAGE_LOCATOR['loginLogo'], 5000)
        self.fill_text(self.LOGIN_PAGE_LOCATOR['inputName'], self.test_data['USER']['locked'])
        self.fill_text(self.LOGIN_PAGE_LOCATOR['inputPass'],self.test_data['PASSWORD'], None, True)
        self.click_element(self.LOGIN_PAGE_LOCATOR['submitBtn'])
    
    def login_with_problem_user(self):
        ''' a complete of login with problem user '''
        self.verify_page_arrive(self.LOGIN_PAGE_LOCATOR['loginLogo'], 5000)
        self.fill_text(self.LOGIN_PAGE_LOCATOR['inputName'], self.test_data['USER']['problem'])
        self.fill_text(self.LOGIN_PAGE_LOCATOR['inputPass'],self.test_data['PASSWORD'], None, True)
        self.click_element(self.LOGIN_PAGE_LOCATOR['submitBtn'])        