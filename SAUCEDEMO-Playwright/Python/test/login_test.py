from utils.session_setup import create_sauce_session

class TestLogin:
    # @classmethod
    # def setup_class(cls):
    # @classmethod
    # def teardown_class(cls):
        
    def setup_method(self):
        self.common, self.sauce, self.user = create_sauce_session()

    def teardown_method(self):
        self.common.page.wait_for_timeout(1000)
        self.common.close_web_driver()

    def test_login_lck(self):
        """TC001 Login with lock credential"""
        self.sauce.run_login_test(self.user["USER"]["locked"], self.user["PASSWORD"], True, 'has been locked out.')

    def test_login_invalid_cred(self):
        """TC002 Login with wrong cred"""
        self.sauce.run_login_test("Hello", "World", True, "not match")

    def test_login_without_password(self):
        """C003 Login without password"""
        self.sauce.run_login_test(
            self.user["USER"]["standard"], "", True, "Password is required"
        )

    def test_login_without_username(self):
        """TC004 Login without username"""
        self.sauce.run_login_test(
            "", self.user["PASSWORD"], True, "Username is required"
        )

    def test_login_std(self):
        """TC005 Login with valid credential"""
        self.sauce.run_login_test(self.user["USER"]["standard"], self.user["PASSWORD"])