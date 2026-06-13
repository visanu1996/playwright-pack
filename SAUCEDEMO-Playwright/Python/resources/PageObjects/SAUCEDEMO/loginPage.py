from resources.common import CommonKeywords
from playwright.sync_api import expect

LOGIN_PAGE_LOCATOR = {
    "loginLogo": "xpath=//div[@class='login_logo']",
    "inputName": "xpath=//input[@id='user-name']",
    "inputPass": "xpath=//input[@id='password']",
    "submitBtn": "xpath=//input[@id='login-button']",
    "toast": "xpath=//h3[@data-test='error']",
}


def login_sauce_demo(common:CommonKeywords,user_name: str, password: str):
    common.fill_text(LOGIN_PAGE_LOCATOR["inputName"], user_name)
    common.fill_text(LOGIN_PAGE_LOCATOR["inputPass"], password, True)
    common.click_element(LOGIN_PAGE_LOCATOR["submitBtn"])

def toast_check(common: CommonKeywords,error_text):
    locator = common.page.locator(LOGIN_PAGE_LOCATOR["toast"])
    if locator.is_visible() :
        expect(locator).to_contain_text(error_text)
    else:
        raise Exception ("No Toast were found on this page.")