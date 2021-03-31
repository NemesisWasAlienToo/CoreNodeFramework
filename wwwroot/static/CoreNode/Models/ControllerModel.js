/**/
export default class CotrollerModel{

    static ControllerContext;

    /**/
    constructor(layoutBuilder = (LayoutParams = {}) => {}, OnErrorCallBack = ErrorContent => {}, Params = {}){

        /**/
        this.layoutBuilder = layoutBuilder;

        /**/
        this.OnErrorCallBack = OnErrorCallBack;

        /**/
        this.Params = Params;
    }

    /*static */async Delay(ms){
        await new Promise(resolve => setTimeout(resolve, ms));
    }

    async ReRender(){
        this.layoutBuilder().Render();
        await this.Render();
    }

    async Init(){

    }

    /**/
    async Body(){
        
    }

    /**/
    async Render(){

        /* Renders the body  of controller */
        let BodyWidget = await this.Body();
        let AppContent = document.getElementById("app");
        AppContent.innerHTML = "";
        AppContent.appendChild(BodyWidget.Build());
    }

    async Final(){

    }
}