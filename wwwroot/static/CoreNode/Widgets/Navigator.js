/**/
import WidgetModel from "../Models/WidgetModel.js"

export default class ButtonWidget extends WidgetModel {

    constructor(Title = "", Href = "", Links){
        super();
        this.Title = Title;
        this.Href = Href;
        this.Links = Links;
    }

    static Fields = () => {
        Childs : "Child elements";
    };

    Build(){
        return WidgetModel.CreateNode("nav","navbar navbar-expand-lg navbar-light bg-light", el => {}, [
            WidgetModel.CreateNode("a","navbar-brand", el => {
                el.innerText = this.Title;
                el.href = this.Href;
                el.setAttribute('data-nav', '');
                el.setAttribute('data-link', '');
            }, null),
            WidgetModel.CreateNode("div","collapse navbar-collapse", el => { el.id = "navbarTogglerDemo03"; },[
                WidgetModel.CreateNode("ul","navbar-nav mr-auto mt-2 mt-lg-0", el => {}, WidgetModel.BuildWidgets(this.Links)),
            ]),
        ]);
    }
}