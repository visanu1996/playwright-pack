import { CommonMat } from "./CommonMat";
import { MobileDriver } from "@src/core/DriverFactory";
import { MainPage } from "./MainPage";
export class CentralizeMat extends CommonMat{
    public mainPage : MainPage
    constructor(mb : MobileDriver){
        super(mb)
        this.mainPage = new MainPage(mb)
    } 
    
}