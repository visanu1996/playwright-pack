export const productPageLocators = {
    productHeader:"xpath=//span[@class='title' and text()='Products']",
    itemBox:{
        mainBox:"xpath=//div[@class='inventory_item' and .//div[@class='inventory_item_name ' and contains(text(),'[TO_CHANGE]')]]",
        itemImg:"/div[@class='inventory_item_img']", // use after mainBox
        itemName:"//div[@class='inventory_item_name ']",
        itemDesc:"//div[@class='inventory_item_desc']",
        itemPrice:"//div[@class='inventory_item_price']",
        addBtn:"//button[text()='Add to cart']",
    }
}