import { WebDriver } from "@core/DriverFactory";
import { Page } from "@playwright/test";
import { expect } from '@playwright/test'
import { getFilesPath } from "@utils/getFilePath";
import * as config from '../config/config'
import * as secret from '../config/testdata'

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

export abstract class BasePage {
  public expect = expect
  public config = config 
  public secret = secret
  protected wd : WebDriver

  constructor(wd: WebDriver) {
    this.wd = wd
  }
  
  get page(){
    return this.wd.page;
  }

  set page(p: Page) {
    this.wd.page = p;
  }

  get pages(){
    return this.wd.pages;
  }

  get context() {
    return this.wd.context
  }

  async verifyPageArrive(locator: string, timeout?: number){
    await this.expect(this.page.locator(locator)).toBeVisible({timeout:timeout})
  }

  async clickElement(locator: string, options?:{timeout?:number, force?: boolean}){
    await this.page.locator(locator).click({timeout:options?.timeout, force:options?.force})
  }

  async fillText(
    locator: string,
    text: string,
    options?:{isSecret?:boolean, timeout?:number},
  ) {
    await this.page.locator(locator).fill(text, { timeout: options?.timeout});
    if (!options?.isSecret) console.log(`filled locator ${locator} with : ${text}`);
    else console.log(`filled secret to locator ${locator}`);
  }

  async verifyContainsValue(
    locator: string,
    text: string,
    timeout?: number,
  ) {

    await this.expect(this.page.locator(locator)).toContainText(text, {
      timeout: timeout,
    });
  }

  async getInputValue(locator: string, timeout?: number) {
    return await this.page.locator(locator).inputValue({ timeout: timeout });
  }

  async getInnerText(locator: string, timeout?: number) {
    return await this.page.locator(locator).innerText({ timeout: timeout});
  }

  /**
   * Return all created pages.
   */
  getPages(): string[] {
    const pagesName = Object.keys(this.pages);
    console.log(`all pages : ${pagesName}`);
    return pagesName;
  }

  protected async createPage(url: string, pageName: string) {
    this.page = await this.context.newPage();
    await this.page.goto(url, { waitUntil: "load" });
    this.pages[pageName] = this.page;
  }

  async switchPage(pageName: string) {
    if (pageName in this.pages) {
      this.page = this.pages[pageName];
      await this.page.bringToFront();
    } else
      console.error(`There is no such page name ${pageName} stored in pages.`);
  }

  async verifyToast(locator: string, containsMsg: string){
    console.log(containsMsg);
    (containsMsg)
    await this.expect(this.page.locator(locator)).toContainText(containsMsg,{ignoreCase:true})
  }

  protected async changeFilter(loc: string, options?:{value?:string, label?:string, index?:number}){
    await this.page.locator(loc).selectOption({value: options?.value, label:options?.label, index:options?.index})
  }

  /** Beware some input only except one file. */
  async uploadFiles(locator: string , ...fileInput: string[]){
      const files = getFilesPath(...fileInput)

      await this.page.locator(locator).waitFor({state:'visible'})
      await this.page.locator(locator).setInputFiles(files)
      await this.expect(this.page.locator(locator)).toHaveJSProperty('files.length',fileInput.length)
  }

}
