*** Settings ***
Resource    ${CURDIR}/../../../../import.robot

*** Variables ***
${LOGIN_HEADER}    //div[@class='login_logo']
${USER_INPUT}    id=user-name
${PASS_INPUT}    id=password
${LOGIN_BTN}    id=login-button

*** Keywords ***
Login
    [Documentation]    Use to login to Sauce Demo website with varius user.
    ...
    ...    Type of user : [NORMAL, LOCKED, PROBLEM, GLITCH, ERROR, VISUAL_BUG]
    ...    The default is normal, to use it pick one an pass it as a parameter. 
    [Arguments]    ${user}=normal
    Browser.Fill Text    ${USER_INPUT}    ${ALL_CRED['${user.upper()}']}
    Browser.Fill Secret    ${PASS_INPUT}    $PASSWORD
    common_keywords.Wait For Element Then Click    ${LOGIN_BTN}


Verify Landing Login Page
    [Documentation]    Verify that you are landing in login page.
    Browser.Wait For Elements State    ${LOGIN_HEADER}
    
