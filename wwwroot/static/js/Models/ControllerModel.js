/**/
export default class CotrollerModel{
    constructor(Params){
        this.Params = Params;
    }

    async Body(){
        return '';
    }

    async Render(){

        /* Renders the body  of controller */
        document.getElementById("app").innerHTML = "";
        let BodyWidget = await this.Body();
        document.getElementById("app").appendChild(BodyWidget.Build());
    }
}