import  WidgetModel  from "/CoreNode/Models/WidgetModel.js";
import  Core  from "/CoreNode/Models/Core.js";

export default class extends WidgetModel {
    constructor(content){
        super();
        this.content = content;
    }
    Build(){
        return Core.Node("div", {"class" : "row"} , Core.BuildWidgets(this.content), el => {});
    }
}