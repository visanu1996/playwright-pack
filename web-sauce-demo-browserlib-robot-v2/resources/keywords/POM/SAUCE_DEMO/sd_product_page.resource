*** Settings ***
Resource    ${CURDIR}/../../../../import.robot

*** Variables ***
${PRODUCT_HEADER}    //span[text()='Products']
&{PRODUCT_ITEMS}    box=//div[@class='inventory_item' and .//div[@class='inventory_item_name ' and contains(text(),'{{item_name}}')]]
...        name=//div[@class='inventory_item_name ']
...        desc=//div[@class='inventory_item_desc']
...        price=//div[@class='inventory_item_price']
...        add=//button

${CART}    //a[@class='shopping_cart_link']

*** Keywords ***
Verify Landing Product Page
    [Documentation]    Verify that you are landing in product page.
    Browser.Wait For Elements State    ${PRODUCT_HEADER}

Select Product And Append To List
    [Documentation]    Select an item or items then append it dict to product list.
    [Arguments]    @{items}

    FOR    ${item}    IN    @{items}
        ${item_box}    Replace String    ${PRODUCT_ITEMS['box']}    {{item_name}}    ${item}
        Wait For Element Then Click    ${item_box}${PRODUCT_ITEMS['add']}
        
        ${name}    Browser.Get Text    ${item_box}${PRODUCT_ITEMS['name']}
        ${desc}    Browser.Get Text    ${item_box}${PRODUCT_ITEMS['desc']}
        ${price}    Browser.Get Text    ${item_box}${PRODUCT_ITEMS['price']}

        &{item_details}    Create Dictionary    
        ...    name=${name}
        ...    desc=${desc}
        ...    price=${price}
        Append To List    ${PRODUCT_LIST}    ${item_details}
    END
    
Remove Items
    [Documentation]    Use to remove an item or items from product list and cart.
    [Arguments]    @{items}
    
    FOR    ${item}    IN    @{items}
        ${INDEX_TO_REMOVE}    Set Variable    ${-1}
        ${item_box}    Replace String    ${PRODUCT_ITEMS['box']}    {{item_name}}    ${item}
        Wait For Element Then Click    ${item_box}${PRODUCT_ITEMS['add']}
        ${name}    Browser.Get Text    ${item_box}${PRODUCT_ITEMS['name']}

        FOR    ${index}    ${i}    IN ENUMERATE    @{PRODUCT_LIST}
            IF    "${i['name']}" == "${name}"
                ${INDEX_TO_REMOVE}    Set Variable    ${index}
                Exit For Loop
            END
        END
        
        IF    ${INDEX_TO_REMOVE} >= 0    Remove From List    ${PRODUCT_LIST}    ${INDEX_TO_REMOVE}       ELSE    Log    Product ${i['name']} not found. Can't delete.

    END
