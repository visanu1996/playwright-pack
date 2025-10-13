*** Settings ***
Library    Browser
Library    String
Library    OperatingSystem
Library    os
Library    DateTime
Library    Collections

# Resources section.
Resource    ${CURDIR}/resources/keywords/common_keywords.resource
Resource    ${CURDIR}/resources/keywords/POM/SAUCE_DEMO/sd_common.resource
Resource    ${CURDIR}/resources/keywords/POM/SAUCE_DEMO/sd_login_page.resource
Resource    ${CURDIR}/resources/keywords/POM/SAUCE_DEMO/sd_product_page.resource
# Variable section.
Variables    ${CURDIR}/resources/data/variable.yaml
Variables    ${CURDIR}/resources/config/config.yaml