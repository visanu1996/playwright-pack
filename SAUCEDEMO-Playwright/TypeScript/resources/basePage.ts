import { WebDriverManagement } from "../utils/driverFactory";
import { Page } from "@playwright/test";

/**
 * BasePage
 *
 * Thin wrapper around `WebDriverManagement` used by page objects.
 *
 * - Forwards constructor arguments to `WebDriverManagement` using
 *   `ConstructorParameters<typeof WebDriverManagement>` so the concrete
 *   parameter types are preserved.
 * - Use `this.<prop>` to access inherited instance properties.
 * - args: [page: Page, browser: Browser, context: BrowserContext]
 */
export class BasePage {
  constructor(protected wd: WebDriverManagement) {}

  get expect(): typeof import("@playwright/test").expect {
    return this.wd.expect;
  }

  get page(): Page {
    return this.wd.page;
  }

  set page(p: Page) {
    this.wd.page = p;
  }

  get pages(): Record<string, Page> {
    return this.wd.pages;
  }

  get config(): typeof import("../config/config") {
    return this.wd.config;
  }

  get testData(): typeof import("../config/testdata") {
    return this.wd.testData;
  }

  async verifyPageArrive(locator: string, timeout: number | null = null) {
    let t = this.set_timeout(timeout);
    await this.expect(this.page.locator(locator)).toBeVisible({ timeout: t });
  }

  async clickElement(locator: string, timeout: number | null = null) {
    let t = this.set_timeout(timeout);
    await this.page.locator(locator).click({ timeout: t });
  }

  async fillText(
    locator: string,
    text: string,
    isSecret: boolean = false,
    timeout: number | null = null,
  ) {
    let t = this.set_timeout(timeout);
    await this.page.locator(locator).fill(text, { timeout: t });
    if (!isSecret) console.log(`filled locator ${locator} with : ${text}`);
    else console.log(`filled secret to locator ${locator}`);
  }

  async verifyContainsValue(
    locator: string,
    text: string,
    timeout: number | null = null,
  ) {
    let t = this.set_timeout(timeout);
    await this.expect(this.page.locator(locator)).toContainText(text, {
      timeout: t,
    });
  }

  async getElementValue(locator: string, timeout: number | null = null) {
    let t = this.set_timeout(timeout);
    return await this.page.locator(locator).inputValue({ timeout: t });
  }

  async getElementText(locator: string, timeout: number | null = null) {
    let t = this.set_timeout(timeout);
    return await this.page.locator(locator).textContent({ timeout: t });
  }

  /**
   * Return all created pages.
   */
  getPages(): string[] {
    const pagesName = Object.keys(this.pages);
    console.log(`all pages : ${pagesName}`);
    return pagesName;
  }

  async createPage(url: string, pageName: string) {
    await this.wd.ensureBrowserIsRunning();
    this.page = await this.wd.context.newPage();
    this.page.goto(url, { waitUntil: "load" });
    this.pages[pageName] = this.page;
  }

  async switchPage(pageName: string) {
    if (pageName in this.pages) {
      this.page = this.pages[pageName];
      await this.page.bringToFront();
    } else
      console.error(`There is no such page name ${pageName} stored in pages.`);
  }

  
  private set_timeout(timeout: number | null = null): number {
    return timeout == null ? this.config.globalWait : timeout;
  }
}
