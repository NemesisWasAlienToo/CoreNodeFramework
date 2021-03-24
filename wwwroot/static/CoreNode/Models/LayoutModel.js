import WidgetModel from "./WidgetModel.js";

/**/
export default class LayoutModel extends WidgetModel{

    /**/    
    constructor(){
        super();
    }

    /**/
    static Fields = () => {};

    /**/
    static App(Classes = "") {

        let _Element =  document.createElement("main");
        _Element.className = Classes;
        _Element.id = "app";
        return _Element;
    }
    
    /**/
    static BuildWidget(InnerWidgets){
        return InnerWidgets.Build();
    }

    /**/
    BuildChilds(){
        return this.Childs.map(Widget => Widget.Build());
    }

    /**/
    Loading(IsLoading){

    }

    /**/
    Build(){

    }

    Render(){
        /* Renders the body of Layput */
        document.body.innerHTML = "";
        document.body.prepend(this.Build());
    }
}