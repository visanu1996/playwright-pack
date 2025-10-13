*** Settings ***
Resource    ${CURDIR}/../import.robot

Suite Setup    Run Keywords
...    common_keywords.Create Web Driver
...    AND    common_keywords.Open URL    sd
...    AND    sd_common.SET_PRODUCT_LIST

*** Test Cases ***
# Module Test
TC01 - Login with locked user
    sd_common.LOGIN_PROCESS    user=locked
    common_keywords.Toast Check    text_verify=locked
    Log    SD Page ID : ${PAGES['SD']}
    Sleep    5

TC02 - Login with normal user
    sd_common.LOGIN_PROCESS
    Sleep    5

TC03 - Added item to collection
    sd_common.ADDED_PRODUCT    Bike Light    Backpack    Fleece Jacket
    sd_common.ITEMS_COUNT

TC04 - Remove item from collection
    sd_common.REMOVE_PRODUCT    Backpack    Fleece Jacket
    sd_common.ITEMS_COUNT