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
     * Returns browser/context for flexibility, can be ignore the return.
     */
    async createWebDriver() {
        this.browser = await chromium.launch({ slowMo: 500, args: ['--start-maximized'] })
        this.context = await this.browser.newContext({ viewport: null })
        return { browser: this.browser, context: this.context }
    }
    /**
     * Create page with specific name and web url.
     * @param webURL 
     * @param pageName 
     * Throw error if not create web driver first.
     */

    async closeWebDriver() {
        await this.context?.close()
        await this.browser?.close()
    }
    async createPage(webURL: string, pageName: string) {
        if (!this.context) throw new Error('Context is not created. Call createWebDriver() first.')
        this.pages[pageName] = await this.context.newPage()
        await this.pages[pageName].goto(webURL, { timeout: 30000, waitUntil: 'load' })
    }
    /**
     * Return all created pages.
     */
    getPages() {
        const pagesName = Object.keys(this.pages)
        console.log(`all pages : ${pagesName}`);
        return pagesName
    }
    /**
     * Return page based on page name.
     * @param pageName
     * @returns page or null if page not found.
     */
    getPage(pageName: string) {
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

    async verifyPageArrive(locator: string) {
        await expect(this.page.locator(locator)).toBeVisible({ timeout: configFile.globalWait })
    }

    async clickElement(locator: string) {
        await this.page.locator(locator).waitFor({ state: 'visible', timeout: configFile.globalWait })
        await this.page.locator(locator).click()
        console.log(`Element : ${locator} clicked.`)
    }
    /**
     * 
     * Fill text or value to specific locator.
     * Secret default as false, if it's true it will not log the text.
     * @param locator
     * @param text
     * @param secret
     */
    async fillText(locator: string, text: string, secret: boolean = false) {
        await this.page.locator(locator).waitFor({ state: 'visible', timeout: configFile.globalWait })
        await this.page.locator(locator).fill(text)
        if (!secret) console.log(`filled locator ${locator} with : ${text}`)
    }

    async verifyValueContain(locator: string, text: string) {
        try {
            await this.page.locator(locator).waitFor({ state: 'visible', timeout: configFile.globalWait })
            let value = await this.page.locator(locator).inputValue()
            expect(value).toContain(text)
            console.log(`Value of '${locator}' does contains ${text}`);
        } catch (error) {
            console.log(`Value of '${locator}' does NOT contain '${text}'`);
            throw error
        }
    }

    async getElementValue(locator: string) {
        await this.page.locator(locator).waitFor({ state: 'visible', timeout: configFile.globalWait })
        const value = await this.page.locator(locator).inputValue()
        return value
    }
}
// }