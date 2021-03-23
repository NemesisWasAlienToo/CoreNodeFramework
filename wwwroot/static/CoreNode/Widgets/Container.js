import WidgetModel from "../Models/WidgetModel.js"

export default class ButtonWidget extends WidgetModel {

    constructor(Childs){
        super();
        this.Childs = Childs;
    }

    static Fields = () => {
        Childs : "Child elements";
    };

    Build(){
        return WidgetModel.CreateNode("div","col-12", el => {}, WidgetModel.BuildWidgets(this.Childs));
    }
}