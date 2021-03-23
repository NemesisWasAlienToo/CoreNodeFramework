import WidgetModel from "../Models/WidgetModel.js"

export default class extends WidgetModel {

    constructor(Title = "", Helper = "" , Childs = []){
        super();
        this.Title = Title;
        this.Helper = Helper;
        this.Childs = Childs;
    }

    static Fields = () => {
        Title : "Card title";
        Helper : "Helper text bellow the title";
        Childs : "Inner widgets" 
    };

    Build(){
        return WidgetModel.CreateNode("div","col-xl-4 col-lg-6 col-md-12", el => {}, [
            WidgetModel.CreateNode("div","card", el => {}, [
                WidgetModel.CreateNode("div","card-header", el => {}, [
                    WidgetModel.CreateNode("h4","card-title", el => { el.innerText = WidgetModel.Title; }),
                ]),
                WidgetModel.CreateNode("div","card-block", el => {}, [
                    WidgetModel.CreateNode("div","card-body", el => {}, [
                        WidgetModel.CreateNode("fieldset","form-group", el => {}, WidgetModel.BuildWidgets(this.Childs)),
                    ]),
                ]),
            ]),
        ]);
    }
}