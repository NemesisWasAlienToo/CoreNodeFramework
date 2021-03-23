import WidgetModel from "../Models/WidgetModel.js"

export default class extends WidgetModel {

    constructor(Childs = []){
        super();
        this.Childs = Childs;
    }

    static Fields = () => {
        Childs : "Inner widgets"
    };

    Build(){
        return WidgetModel.CreateNode("section","basic-inputs", el => {}, [
            WidgetModel.CreateNode("div","row", el => {}, WidgetModel.BuildWidgets(this.Childs)),
        ]);
    }
}