/**/
export default class CotrollerModel{
    constructor(Params){
        this.Params = Params;
    }

    async Build(){
        return '';
    }

    Render(PageContent){

        /**/
        document.getElementById("app").innerHTML = "";
        document.getElementById("app").appendChild(PageContent.Build());
    }
}