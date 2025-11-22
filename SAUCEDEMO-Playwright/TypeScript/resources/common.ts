import { Page, expect, Browser, BrowserContext, chromium } from "@playwright/test"
import * as configFile from '../config/config'

export class CommonKeywords {
    // constructor(public page: Page, public browser: Browser, public context: BrowserContext) {
    public pages: Record<string, Page> = {};
    
    public page!: Page;
    public browser!: Browser;
    public context!: BrowserContext;

    /**
     * Create a webdriver and context with fix options.
     */
    async createWebDriver() {
        this.browser = await chromium.launch({ slowMo: 500, args: ['--start-maximized'] })
        this.context = await this.browser.newContext({ viewport: null })
    }
    /**
     * Create page with specific name and web url.
     * @param webURL 
     * @param pageName 
     * Throw error if not create web driver first.
     */
    async createPage(webURL: string, pageName: string) {
        if(!this.context) throw new Error('Context is not create. Call createWebDriver() first.')
        this.pages[pageName] = await this.context.newPage()
        await this.pages[pageName].goto(webURL,{ timeout: 30000, waitUntil: 'load' })
    }
    /**
     * Return all created pages.
     */
    getPages(){
        const pagesName = Object.keys(this.pages)
        console.log(`all pages : ${pagesName}`);
        return pagesName
    }
    /**
     * Return page based on page name.
     * @param pageName
     * @returns page or null if page not found.
     */
    getPage(pageName:string){
       return this.pages[pageName] ?? null
    }
    /**
     * Set this.page to use specific page instead of using getPage.
     * @param pageName 
     */
    setPage(pageName: string) {
    const page = this.pages[pageName];
    if (!page) throw new Error(`Page '${pageName}' not found`);
    this.page = page;
    }

    async verifyPageArrive(locator: string, page: Page = this.page) {
        await expect(page.locator(locator)).toBeVisible({ timeout: configFile.globalWait })
    }

    async clickElement(locator: string, page: Page = this.page) {
        await page.locator(locator).waitFor({ state: 'visible', timeout: configFile.globalWait })
        await page.locator(locator).click()
        console.log(`Element : ${locator} clicked.`)
    }

    async fillText(locator: string, text: string, secret:boolean = false , page: Page = this.page) {
        await page.locator(locator).waitFor({ state: 'visible', timeout: configFile.globalWait })
        await page.locator(locator).fill(text)
        if(!secret) console.log(`filled locator ${locator} with : ${text}`)
    }

    async verifyValueContain(locator: string, text: string, page: Page = this.page) {
        try{
            await page.locator(locator).waitFor({ state: 'visible', timeout: configFile.globalWait })
            await expect(page.locator(locator)).toHaveValue(text)
            console.log(`Value of '${locator}' does contains ${text}`);
        }catch(error){
            console.log(`Value of '${locator}' does NOT contain '${text}'`);
            throw error
        }
    }

    async getElementValue(locator: string, page: Page = this.page) {
        await page.locator(locator).waitFor({ state: 'visible', timeout: configFile.globalWait })
        const value = await page.locator(locator).inputValue()
    }
}
// }