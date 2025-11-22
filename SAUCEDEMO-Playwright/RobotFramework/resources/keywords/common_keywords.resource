*** Settings ***
Resource    ${CURDIR}/../../import.robot

*** Variables ***
${TOAST_BOX}    //*[@data-test='error']


*** Keywords ***
Create Web Driver
    VAR    &{PAGES}    scope=SUITE
    Browser.New Browser    chromium    False    args=['--start-maximized']
    Browser.New Context    viewport=None

Open URL
    [Arguments]    ${url}=sd
    Browser.New Page    ${WEB_URL['${url.upper()}']}    load
    ${page_id}    Browser.Get Page Ids    page=CURRENT
    Collections.Set To Dictionary    ${PAGES}    ${url.upper()}=${page_id}
    
Switch to ${page}
    [Documentation]    Use to switch to another page that has been saved in PAGES variables
    ...
    ...    Will not fail if page is not open, will try to open page by itself.
    TRY
        Browser.Switch Page    ${PAGES['${page.upper}']}
    EXCEPT
        Log    Page : ${page} is not currently or no longer exist.
        ...    re open
        Open URL    ${page.upper()} 
    END

Wait For Element Then Click
    [Documentation]    A common keyword use to wait for the element 
    ...                to be visible, then click.
    [Arguments]    ${locator}    ${state}=stable
    Browser.Wait For Elements State    selector=${locator}    state=${state}    timeout=${GLOBAL_WAIT}
    Browser.Click    selector=${locator}

Toast Check
    [Documentation]    Check that toast is visible or not, 
    ...    then return the text of it for later validate.
    [Arguments]    ${text_verify}
    ${is_visible}    Run Keyword And Return Status    Browser.Wait For Elements State    ${TOAST_BOX}
    IF    ${is_visible}
        Log    Toast found.
        ${toast_msg}    Browser.Get Text    ${TOAST_BOX}    contains    ${text_verify}
        Log    ${toast_msg}
        Browser.Click    ${TOAST_BOX}/button
    END
    