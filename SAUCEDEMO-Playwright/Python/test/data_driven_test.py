from utils.session_setup import create_sauce_session

class TestRunFull:
    def setup_method(self):
        self.common, self.sauce , self.user = create_sauce_session()
    
    def teardown_method(self):
        self.common.page.wait_for_timeout(1000)
        self.common.close_web_driver()
        
    def test_run_full(self):
        ''' Can be a driven data test if read data from a file as a loop. '''
        self.sauce.run_full_test(self.user["USER"]["standard"], 
                                 self.user["PASSWORD"],
                                 ['Backpack','Bike Light', 'T-Shirt'],
                                 "Berk", "Rising", "12345")