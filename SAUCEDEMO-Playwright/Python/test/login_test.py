import pytest
import os
from resources.common import CommonKeywords
from resources.PageObjects.SAUCEDEMO.sauce_common import CommonSauceDemo
from resources.PageObjects.SAUCEDEMO.loginPage import login_sauce_demo
from utils.file_loader import read_file


class TestLogin:
    # @classmethod
    # def setup_class(cls):
    # @classmethod
    # def teardown_class(cls):
        
    def setup_method(self):
        _project_root = os.path.dirname(os.path.dirname(__file__))
        self.user = read_file(os.path.join(_project_root, "config/testdata.yml"))
        self.config = read_file(os.path.join(_project_root, "config/config.yml"))

        self.common = CommonKeywords()
        self.sauce = CommonSauceDemo(self.common)

        self.common.create_web_driver()
        self.common.create_page(self.config["WEB_URL"], "sauce")

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
        self.common.verify_page_arrive()