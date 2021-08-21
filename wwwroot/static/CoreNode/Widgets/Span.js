import  WidgetModel  from "/CoreNode/Models/WidgetModel.js";
import  Core  from "/CoreNode/Models/Core.js";

export default class extends WidgetModel {
    constructor(col, text){
        super();
        this.col = col;
        this.text = text;
    }
    Build(){
        return Core.Node("span", {"class" : this.col} , [
            this.text
        ], el => {});
    }
}