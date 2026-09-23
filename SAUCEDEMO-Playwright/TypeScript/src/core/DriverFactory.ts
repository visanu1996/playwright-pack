import {
  Page,
  Browser,
  BrowserContext,
  chromium,
} from "@playwright/test";
import { globalWait, isHeadless } from "../config/config";

export class WebDriver {
  public pages: Record<string, Page> = {};
  public page!: Page;
  public browser!: Browser;
  public context!: BrowserContext;

  async startBrowser() {
    this.browser = await chromium.launch();   // already set options in playwright.config.ts
    this.context = await this.browser.newContext({ viewport: null });
    this.context.setDefaultTimeout(globalWait);
    console.log(`Browser and Context successfully initialized.`);
  }

  async closeBrowser() {
    await this.context?.close()
    await this.browser?.close()
    this.pages = {}
    console.log(`Browser and Context successfully closed.`)
  }

}
