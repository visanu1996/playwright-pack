import pytest
import os
from resources.common import CommonKeywords
from resources.PageObjects.SAUCEDEMO.loginPage import login_sauce_demo
from utils.file_loader import read_file


class TestLogin:
    @classmethod
    def setup_class(cls):
        _project_root = os.path.dirname(os.path.dirname(__file__))
        cls.user = read_file(os.path.join(_project_root, "config/testdata.yml"))
        cls.config = read_file(os.path.join(_project_root, "config/config.yml"))

        cls.common = CommonKeywords()
        cls.common.create_web_driver()
        cls.common.create_page(cls.config["WEB_URL"], "sauce")

    @classmethod
    def teardown_class(cls):
        cls.common.close_web_driver()

    @pytest.mark.std_usr
    def test_login_std(self):
        login_sauce_demo(
            self.common, self.user["USER"]["standard"], self.user["PASSWORD"]
        )
