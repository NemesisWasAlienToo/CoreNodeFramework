import WidgetModel from "../Models/WidgetModel.js"

export default class ButtonWidget extends WidgetModel {

    constructor(Title = "", OnClicCallback = e => {}){
        super();
        this.Title = Title;
        this.OnClicCallback = OnClicCallback;
    }

    static Fields = () => {
        Helper : "Helper text bellow the title";
        OnClicCallback : "This function is fired when button is clicked";
    };

    Build(){
        return WidgetModel.CreateNode("button","btn btn-warning btn-min-width mr-1 mb-1 col-12", el => {
            el.innerText = this.Title;
            el.onclick = this.OnClicCallback;
        });
    }
}