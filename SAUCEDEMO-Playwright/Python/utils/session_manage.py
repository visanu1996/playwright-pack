from utils.file_loader import load_config
from utils.driver_factory import WebDriverManagement
from utils.app_factory import AppFactory

def create_test_session():
    """Initialize and create a test session with WebDriver and application factory.

    Loads configuration and test data files, then sets up both the WebDriver
    management instance and application factory for use in tests.

    Returns:
        tuple: A tuple containing:
            - WebDriverManagement: Instance managing the WebDriver and browser context.
            - AppFactory: Factory instance for accessing page objects and utilities.
    """
    
    config = load_config("config.yml")
    test_data = load_config("testdata.yml")
    wd = WebDriverManagement(config, test_data)
    webs = AppFactory(wd,config)
    
    return  wd, webs
        
