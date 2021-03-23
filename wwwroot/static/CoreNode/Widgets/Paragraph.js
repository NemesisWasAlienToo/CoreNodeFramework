import WidgetModel from "../Models/WidgetModel.js"

export default class extends WidgetModel {

    constructor(Content = ""){
        super();
        this.Content = Content;
    }

    Build(){
        return WidgetModel.CreateNode("p","form-control-static", el => { el.innerText = this.Content; });
    }
}