import WidgetModel from "./WidgetModel.js";

/**/
export default class LayoutModel extends WidgetModel{

    static LayoutContext;

    /**/    
    constructor(){
        super();
    }

    /**/
    static Fields = () => {};

    /**/
    async Init(){

    }

    /**/
    Build(){

    }

    Render(){
        /* Renders the body of Layput */
        document.body.childNodes.forEach(node => {
            if(node.nodeName != "SCRIPT" && node.nodeName != "LINK") node.remove();
        });
        document.body.prepend(this.Build());
    }

    async Final(){
        
    }
}