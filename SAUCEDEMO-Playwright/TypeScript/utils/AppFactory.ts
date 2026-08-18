import { WebDriverManagement } from "./driverFactory";

/** AppFactory 
 * 
 * A centralized place for setup webs testing and register it in pages to be select and use later.
*/
export class AppFactory {
  constructor(public wd: WebDriverManagement) {}

  async websSetup() {
    await this.openSauce();
    await this.openGoogle();
  }
  async openSauce() {
    await this.wd.createPage(this.wd.config.webURL, "SAUCE");
  }
  async openGoogle() {
    await this.wd.createPage(this.wd.config.google, "GOOGLE");
  }
  
}
