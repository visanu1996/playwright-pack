from utils.file_loader import load_config
from utils.driver_factory import WebDriverManagement
from utils.app_factory import AppFactory

def create_test_session():
    config = load_config("config.yml")
    test_data = load_config("testdata.yml")
    wd = WebDriverManagement(config, test_data)
    webs = AppFactory(wd,config)
    
    return  wd, webs
        
