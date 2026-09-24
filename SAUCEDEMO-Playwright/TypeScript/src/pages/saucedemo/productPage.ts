import { BasePage } from "@core/BasePage";

export class SDProductPage extends BasePage{
    public productPageLocators = {
        productHeader: "xpath=//span[@class='title' and text()='Products']",
        itemBox:
        'xpath=//div[@class="inventory_item_description" and .//div[@data-test="inventory-item-name" and contains(text(),"[TO_CHANGE]")]]',
        // ------------- combo use with itemBox
        itemName: '//div[@data-test="inventory-item-name"]',
        itemPrice: '//div[@data-test="inventory-item-desc"]',
        itemDesc: '//div[@data-test="inventory-item-price"]',
        itemAddBtn: '//button[contains(@data-test,"add")]',
        itemRevBtn: '//button[contains(@data-test,"remove")]',
        // ------------- end of combo
        itemCount: 'xpath=//span[@data-test="shopping-cart-badge"]',
        filter: 'xpath=//select[@data-test="product-sort-container"]',
    }

    async addItems(...products: string[]) {
        let productList = await this.setProducts(true, ...products);
        console.log(`Products add to cart : ${productList}`);
        return productList
    }

    async removeItems(...products: string[]) {
        let productList = await this.setProducts(false, ...products);
        console.log(`Products remove from cart : ${productList}`);
        return productList
    }

    async changeProductFilter(value: "za" | "az" | "hilo" | "lohi") {
        await this.changeFilter(this.productPageLocators.filter, { value: value });
        await this.expect(this.page.locator(this.productPageLocators.filter)).toHaveJSProperty('value',value)
    }

    async countItems(expectedCount: number) {
        if (expectedCount !== 0){
            await this.expect(
            this.page.locator(this.productPageLocators.itemCount),
            ).toContainText(expectedCount.toString());
        }
        else await this.expect(
            this.page.locator(this.productPageLocators.itemCount),
            ).not.toBeVisible();
    }

    private async setProducts(isAdd: boolean, ...products: string[]) {
        const productList: any[] = [];

        for (const product of products) {
        const productDetail: Record<string, any> = {};
        const productBox = this.productPageLocators.itemBox.replace(
            "[TO_CHANGE]",
            product,
        );
        const productName = await this.page
            .locator(productBox + this.productPageLocators.itemName)
            .innerText();
        const productPrice = await this.page
            .locator(productBox + this.productPageLocators.itemPrice)
            .innerText();
        const productDesc = await this.page
            .locator(productBox + this.productPageLocators.itemDesc)
            .innerText();

        if (isAdd)
            await this.page
            .locator(productBox + this.productPageLocators.itemAddBtn)
            .click();
        else
            await this.page
            .locator(productBox + this.productPageLocators.itemRevBtn)
            .click();

        productDetail[productName] = { desc: productDesc, price: productPrice };
        productList.push(productDetail);
        }
        return productList;
    }
}
