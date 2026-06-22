import { WebDriverManagement } from "./driverFactory";

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
