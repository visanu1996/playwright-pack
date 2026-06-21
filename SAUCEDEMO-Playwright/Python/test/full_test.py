from resources.PageObjects.SAUCEDEMO.sauce_common import SauceCommonFlows
from utils.session_manage import create_test_session

class TestFullFlow:
    def setup_method(self):
        self.wd, self.webs = create_test_session()
        self.sauce_common = SauceCommonFlows(self.wd)
        
        self.webs.web_setup()
        
    def teardown_method(self):
        self.wd.page.wait_for_timeout(1000)
        self.wd.close_browser()
        
    def test_complete_scenario(self):
        self.sauce_common.complete_purchase(
            self.wd.test_data["USER"]["standard"],
            self.wd.test_data["PASSWORD"],
            ['Backpack', 'Bike Light', 'T-Shirt'],
            ["Visan", "Laster", "12345"]
            )
           