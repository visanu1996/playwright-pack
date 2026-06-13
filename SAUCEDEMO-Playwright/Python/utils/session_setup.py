import os
from .file_loader import read_file
from resources.common import CommonKeywords
from resources.PageObjects.SAUCEDEMO.sauce_common import CommonSauceDemo


def create_sauce_session():
    """Create a Sauce demo session and return session objects.

    Initializes the web driver, opens the Sauce demo page,
    and loads the test data/config files.

    Returns:
        tuple[CommonKeywords, CommonSauceDemo, dict]:
            common: shared keyword helper
            sauce: page object for SauceDemo
            user_test_data: loaded contents of config/testdata.yml
    """
    user_test_data = load_user_data()
    config = load_config()
    
    common = CommonKeywords()
    sauce = CommonSauceDemo(common)

    common.create_web_driver()
    common.create_page(config["WEB_URL"], "sauce")

    return common, sauce, user_test_data
    
def get_project_root():
    return os.path.dirname(os.path.dirname(__file__))

def load_user_data():
    return read_file(os.path.join(get_project_root(), "config/testdata.yml"))

def load_config():
    return read_file(os.path.join(get_project_root(), "config/config.yml"))