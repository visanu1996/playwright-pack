from resources.PageObjects.SAUCEDEMO.login_page import LoginPage
from utils.session_manage import create_test_session

class TestLogin:
    def setup_method(self):
        self.wd, self.webs = create_test_session()
        self.login_page = LoginPage(self.wd)
        self.webs.web_setup()
        
    def teardown_method(self):
        self.wd.page.wait_for_timeout(1000)
        self.wd.close_browser()
        
    def test_login1(self):
        self.login_page.login("","Hi")
        self.login_page.verify_toast("Username is required")
        
    def test_login2(self):
        self.login_page.login("Test","")
        self.login_page.verify_toast("Password is required")
    
    def test_login3(self):
        self.login_page.login_with_std_cred()
        
    def test_switch_yt(self):
        self.wd.switch_to_page('YT')
        self.wd.page.wait_for_timeout(5000)
        
    def test_switch_google(self):
        self.wd.switch_to_page('GOOGLE')
        self.wd.page.wait_for_timeout(5000)