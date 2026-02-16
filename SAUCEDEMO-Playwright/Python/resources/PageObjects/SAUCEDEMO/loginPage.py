from resources.common import CommonKeywords

LOGIN_PAGE_LOCATOR = {
    "loginLogo": "xpath=//div[@class='login_logo']",
    "inputName": "xpath=//input[@id='user-name']",
    "inputPass": "xpath=//input[@id='password']",
    "submitBtn": "xpath=//input[@id='login-button']",
    "toast": "xpath=//h3[@data-test='error']",
}


def login_sauce_demo(common:CommonKeywords,user_name: str, password: str):
    common.fill_text(LOGIN_PAGE_LOCATOR["inputPass"], user_name)
    common.fill_text(LOGIN_PAGE_LOCATOR["inputPass"], password, True)
    common.click_element(LOGIN_PAGE_LOCATOR["submitBtn"])
