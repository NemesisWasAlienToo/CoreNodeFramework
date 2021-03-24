import WidgetModel from "../Models/WidgetModel.js"

export default class extends WidgetModel {

    constructor(Content = "" , Childs = []){
        super();
        this.Content = Content;
        this.Childs = Childs;
    }

    static Fields = () => {
        Title : "Card title";
        Helper : "Helper text bellow the title";
        Childs : "Inner widgets" 
    };

    Build(){
        return WidgetModel.CreateNode("footer","text-muted navbar-fixed-bottom", el => {}, [
            WidgetModel.CreateNode("div","container", el => {}, [
                WidgetModel.CreateNode("p","float-right", el => {}, [
                    WidgetModel.CreateNode("a","card-title", el => { el.innerText = "Back to top"; el.href = "#"; }),
                ]),
                WidgetModel.CreateNode("p","", el => {  el.innerText = this.Content; }, null),
            ]),
        ]);
    }
}