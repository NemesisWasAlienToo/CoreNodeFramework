/**/
import WidgetModel from "../Models/WidgetModel.js"

export default class extends WidgetModel {

    constructor(Title = "", Href = ""){
        super();
        this.Title = Title;
        this.Href = Href;
    }

    static Fields = () => {
        Childs : "Child elements";
    };

    Build(){
        return WidgetModel.CreateNode("li","nav-item", el => {}, [
            WidgetModel.CreateNode("a","nav-link", el => {
                el.innerText = this.Title;
                el.setAttribute('href', this.Href);
                el.setAttribute('data-nav', '');
                el.setAttribute('data-link', '');
            }, null),
        ]);
    }
}