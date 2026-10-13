/// <reference types="@wdio/globals/types">
import { Selector } from 'webdriverio'
import { expect } from 'expect-webdriverio'
import { MobileDriver } from './DriverFactory'

export abstract class BaseMobile {
    protected md : MobileDriver
    constructor(md: MobileDriver){
        this.md = md
    }
    
    get driver(){
        return this.md.driver
    }
    
    async switchApplication(appId : string){
        await this.driver.activateApp(appId)
    }

    async verifyElementVisible(locator: Selector){
        const element = await this.driver.$(locator)
        await expect(element).toBeDisplayedInViewport()
        
    }

    async swipeUntilFoundElement(locator: Selector,direction: "up"|"down"|"left"|"right", maxSwipe: number = 5){
        const element = await this.driver.$(locator)
        let isVisible = await this.runFunctionAndReturnStatus(this.verifyElementVisible(locator))
        let isFound = false
        for(let index = 0 ; index < maxSwipe; index++){
            if(isVisible){
                isFound = true
                break
            }
            await this.driver.swipe({direction:direction, duration: 700, percent:0.3})
            isVisible = await this.runFunctionAndReturnStatus(this.verifyElementVisible(locator))
        }
    }

    async clickElement(locator: Selector, timeout: number = 15000){
        const element = await this.driver.$(locator)
        await element.waitForDisplayed({timeout:timeout})
        await element.click()
    }

    async sendKey(locator: Selector, msg: string, options?:{timeout?:number, pressEnter?:boolean}){
        const element = await this.driver.$(locator)
        await element.waitForDisplayed({timeout:options?.timeout})
        await element.setValue(msg)
        if(options?.pressEnter) await this.driver.keys(['Enter'])
    }

    async swipeToResourceId(resourceId : string){
        const targetElement = await this.driver.$(
        `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().resourceId(${resourceId}))`
        )
    }

    async swipeToText(text: string){
        const targetElement = await this.driver.$(
        `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${text}"))`
        )

    }

    async goBack(){
        await this.driver.back()
    }

    async runFunctionAndReturnStatus(func: Promise<any>){
        try{
            await func
            return true
        }catch{
            return false
        }
    }
}