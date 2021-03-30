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
        let AppContent = document.getElementById("app");
        AppContent.innerHTML = "";
        let BodyWidget = await this.Body();
        AppContent.appendChild(BodyWidget.Build());
    }
}