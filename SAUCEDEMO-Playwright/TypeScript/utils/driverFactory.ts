import {
  Page,
  expect,
  Browser,
  BrowserContext,
  chromium,
} from "@playwright/test";
import * as configFile from "../config/config";
import * as testData from "../config/testdata";

export class WebDriverManagement {
  public pages: Record<string, Page> = {};
  public config = configFile;
  public testData = testData;
  public expect = expect;
  public page!: Page;
  public browser!: Browser;
  public context!: BrowserContext;

  async startBrowser() {
    this.browser = await chromium.launch({
      slowMo: 500,
      args: ["--start-maximized"],
    });
    this.context = await this.browser.newContext({ viewport: null });
    this.context.setDefaultTimeout(this.config.globalWait);
    this.context.setDefaultNavigationTimeout(this.config.navWait);
    console.log(`complete init browser.`);
  }

  async closeBrowser() {
    if (this.context) {
      await this.context.close();
      await this.browser.close();
    } else if (this.browser) {
      await this.browser.close();
    } else console.log(`No context or browser had opened.`);
  }

  async closeContext() {
    if (this.context) await this.context.close();
  }

  async ensureBrowserIsRunning() {
    if (!this.browser) await this.startBrowser();
    else if (!this.context)
      this.context = await this.browser.newContext({ viewport: null });
  }

}
