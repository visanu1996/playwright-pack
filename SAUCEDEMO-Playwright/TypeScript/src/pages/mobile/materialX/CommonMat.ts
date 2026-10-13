import { BaseMobile } from "@src/core/BaseMobile";

export class CommonMat extends BaseMobile{

    commonLocators = {
        notiBell : 'id=com.material.components:id/action_notifications',
        searchBtn : 'id=com.material.components:id/action_search',
        searchField : 'id=com.material.components:id/search_src_text',

        pages: {
            setting : '(//android.widget.TextView[@text="Settings"])',
            apps : '(//android.widget.TextView[@text="Apps"])',
            update : '(//android.widget.TextView[@text="Updates"])',
            screens : '(//android.widget.TextView[@text="Screens"])'
        },

        searchTarget : '(//android.widget.FrameLayout[@resource-id="com.material.components:id/lyt_parent"]/android.widget.LinearLayout/android.widget.TextView[@text="[TO_CHANGE]"])[1]'
    }

    async gotoPage(page: keyof typeof this.commonLocators.pages){
        await this.clickElement(this.commonLocators.pages[page])
    }

    async searchFor(msg: string, targetName?:string){
        await this.clickElement(this.commonLocators.searchBtn)
        await this.sendKey(this.commonLocators.searchField, msg)
        if(targetName){
            let target = this.commonLocators.searchTarget.replace('[TO_CHANGE]',targetName)
            await this.clickElement(target)
        }
    }
    
}