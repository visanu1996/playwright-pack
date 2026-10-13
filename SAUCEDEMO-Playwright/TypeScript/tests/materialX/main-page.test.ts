import { CentralizeMat } from "@src/pages/mobile/materialX/CentralizeMat";
import { MobileDriver } from "@src/core/DriverFactory";
import { afterEach, before, beforeEach, describe, it } from "node:test";

describe("Material app main page", () => {
    const mobileDriver = new MobileDriver()
    let app: CentralizeMat = new CentralizeMat(mobileDriver)
    beforeEach(async()=>{
        await mobileDriver.createConnection()
        await app.mainPage.denyPermission()
        await app.mainPage.closeNotification()
    })

    afterEach(async()=>{
        await mobileDriver.sleep(2000)
        await mobileDriver.closeConnection()
    })

    it("opens the buttons section by clicking", async()=>{
        await app.mainPage.selectMenu('Buttons','Fab More')
        // add verify page arrive at this place.
    })

    it("opens the splash section by clicking", async()=>{
        await app.mainPage.selectMenu('Splash','Facebook')
        // add verify page arrive at this place.
    })

    it("opens the side sheet by searching", async() =>{
        await app.searchFor('Side Sheet','Dark')
        // add verify page arrive at this place.
    })

    it("goto another pages", async()=>{
        await app.gotoPage('update')
        await mobileDriver.sleep(2000)
        await app.gotoPage('setting')
        await mobileDriver.sleep(2000)
        await app.gotoPage('apps')
        await mobileDriver.sleep(2000)
        await app.gotoPage('screens')
        await mobileDriver.sleep(2000)
    })
})