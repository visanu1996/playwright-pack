*** Settings ***
Resource    ${CURDIR}/../../../../import.robot


*** Variables ***
${BURGER}    id=react-burger-menu-btn
&{NAV}    all=//a[text()='All Items']
...       about=//a[text()='About']
...       logout=//a[text()='Logout']
...       state-reset=//a[text()='Reset App State']
...       close=//button[text()='Close Menu']



*** Keywords ***
LOGIN_PROCESS
    [Arguments]    ${user}=normal
    sd_login_page.Verify Landing Login Page
    sd_login_page.Login    ${user}

ADDED_PRODUCT
    [Arguments]    @{product_name}
    sd_product_page.Verify Landing Product Page
    sd_product_page.Select Product And Append To List    @{product_name}
    Log Many    ${PRODUCT_LIST}

REMOVE_PRODUCT
    [Arguments]    @{product_name}
    sd_product_page.Verify Landing Product Page
    sd_product_page.Remove Items    @{product_name}
    Log Many    ${PRODUCT_LIST}

ITEMS_COUNT
    [Documentation]    Use to count the items in PRODUCT_LIST.
    ${item_count}    Get Length    ${PRODUCT_LIST}
    Log    ${item_count}
    RETURN    ${item_count}

SET_PRODUCT_LIST
    [Documentation]    Use to set a list to hold a product details
    VAR    @{PRODUCT_LIST}    scope=SUITE

GO_TO_PRODUCT_PAGE
    [Documentation]    Use to go back to main/product page whether you are at.
    Browser.Click    selector=${BURGER}
    Browser.Click    selector=${NAV['all']}

GO_TO_ANOTHER_PAGE
    [Documentation]    Use to go to another page via navigate bar.
    
    ...       navigate choices : all, about, logout
    [Arguments]    ${navigate_choice}
    Browser.Click    selector=${BURGER}
    Browser.Click    selector=${NAV['${navigate_choice}']}

RESET_WEB_STATE
    [Documentation]    Use to reset web state.
    Browser.Click    selector=${BURGER}
    Browser.Click    selector=${NAV['state-reset']}