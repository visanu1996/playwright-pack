import { CommonMat } from "./CommonMat";

type Menu = "Splash" | "Introduction" | "Cards" | "Motion" | "Buttons" | "Grid" | "Banner"
export class MainPage extends CommonMat{

    mainPageLocators = {
        notiDenyPermissionBtn : 'id=com.android.permissioncontroller:id/permission_deny_button',
        closeContactBtn : 'id=com.material.components:id/bt_close',

        menu : {
            main: '((//android.widget.FrameLayout[@resource-id="com.material.components:id/lyt_parent"])/android.widget.LinearLayout[./android.widget.TextView[contains(@text,"[TO_CHANGE]")]])[1]',
            sub : '(//androidx.recyclerview.widget.RecyclerView[@resource-id="com.material.components:id/main_recycler"]/android.widget.LinearLayout[.//*[contains(@text,"[TO_CHANGE]")]])[1]/android.widget.FrameLayout',
            fav : '(//androidx.recyclerview.widget.RecyclerView[@resource-id="com.material.components:id/main_recycler"]/android.widget.LinearLayout[.//*[contains(@text,"[TO_CHANGE]")]])[1]/android.widget.ImageView'
        }

    }

    async selectMenu(menu: Menu, subMenu: string, fav?: boolean){
        let target = this.mainPageLocators.menu.main.replace('[TO_CHANGE]',menu)
        await this.swipeToText(menu)
        await this.clickElement(target)
        if(subMenu){
            let subTarget = this.mainPageLocators.menu.sub.replace('[TO_CHANGE]', subMenu)
            await this.swipeToText(subMenu)

            if(fav){
                let favTarget = this.mainPageLocators.menu.fav.replace('[TO_CHANGE]',subMenu)
                await this.clickElement(favTarget)
            }

            await this.clickElement(subTarget)
        
        }
    }

    async closeNotification(){
        await this.clickElement(this.mainPageLocators.closeContactBtn)
    }

    async denyPermission(){
        await this.clickElement(this.mainPageLocators.notiDenyPermissionBtn)
    }

}