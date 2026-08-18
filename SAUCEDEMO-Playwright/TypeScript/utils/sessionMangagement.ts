import { WebDriverManagement } from "./driverFactory";
import { AppFactory } from "./AppFactory";

/** create test session
 * 
 * a function to setup test environment
 * 
 * usage : const[wd, webs] = await createTestSession()
 */
export async function createTestSession() {
    let wd = new WebDriverManagement();
  let webs = new AppFactory(wd);

  return [wd, webs];
}
