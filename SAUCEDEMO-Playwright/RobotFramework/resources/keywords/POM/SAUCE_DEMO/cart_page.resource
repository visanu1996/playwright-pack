*** Settings ***
Resource    ${CURDIR}/../../../../import.robot

*** Variables ***

*** Keywords ***
Verify Landing Login Page
    [Documentation]    Verify that you are landing in login page.
    Browser.Wait For Elements State    ${LOGIN_HEADER}
    
