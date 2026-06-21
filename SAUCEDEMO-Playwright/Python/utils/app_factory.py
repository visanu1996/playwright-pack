from utils.driver_factory import WebDriverManagement

class AppFactory:
    def __init__(self,wd:WebDriverManagement , config):
        self.wd = wd
        self.config = config
    
    def web_setup(self):
        self.open_google()
        self.open_yt()
        self.open_sauce()
    
    def open_sauce(self):
        self.wd.create_page(self.config['WEB_URL'],"SAUCE")
        
    def open_yt(self):
        self.wd.create_page(self.config['YT'], "YT")
    
    def open_google(self):
        self.wd.create_page(self.config['GOOGLE'], "GOOGLE")