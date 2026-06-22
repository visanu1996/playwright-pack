import { WebDriverManagement } from "../utils/driver_factory";

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
export class BasePage extends WebDriverManagement {
  // to passes typed parameters from parent class.
  constructor(...args: ConstructorParameters<typeof WebDriverManagement>) {
    super(...args);
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

  private set_timeout(timeout: number | null = null): number {
    return timeout == null ? this.config.globalWait : timeout;
  }
}
