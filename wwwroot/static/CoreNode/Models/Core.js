import WidgetModel from "./WidgetModel.js";
export default class Core{
    constructor(){}

    static async Delay(ms){
        await new Promise(resolve => setTimeout(resolve, ms));
    }

    /* Creates html node */
    static Node(ElementTag, Properties = {}, Childs = null, Initializer = el => {}) {

        /* Build element's prototype */
        let _Element;

        if(ElementTag == "svg" || ElementTag == "rect"){
            _Element =  document.createElementNS('http://www.w3.org/2000/svg', ElementTag);
        }
        else{
            _Element =  document.createElement(ElementTag);
        }

        /* set element's properties */
        for (let property in Properties){
            if (!Properties.hasOwnProperty(property)) continue;
            if(property.indexOf("on") == 0){
                _Element[property] = Properties[property];
            }
            else{
                _Element.setAttribute(property, Properties[property]);
            }
        }
        
        /* Add element's childs */
        if(Childs !== null & Childs !== undefined){
            Childs.forEach(element => {
                element instanceof Element ? _Element.appendChild(element) : _Element.innerText += element;
            });
        }

        /* Intialize element */
        Initializer(_Element);

        return _Element;
    }

    /**/
    static App(Properties = {}) {

        /* Build element's prototype */
        let _Element =  document.createElement("main");

        /* set element's properties */
        for (let property in Properties){
            if (!Properties.hasOwnProperty(property)) continue;
            _Element.setAttribute(property, Properties[property]);
        }
        
        _Element.id = "app";
        return _Element;
    }

    /**/
    static BuildWidgets(WidgetList){
        return WidgetList.map(child => child instanceof WidgetModel ? child.Build() : child);
    }

    static async Delay(ms){
        await new Promise(resolve => setTimeout(resolve, ms));
    }
}