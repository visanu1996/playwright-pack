import { WebDriverManagement } from "./driverFactory";
import { AppFactory } from "./AppFactory";

export async function createTestSession() {
  let wd = new WebDriverManagement();
  let webs = new AppFactory(wd);
  
  return [wd, webs];
}
