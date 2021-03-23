/**/
export default class WidgetModel{

    /**/    
    constructor(){
    }

    /**/
    static Fields = () => {};

    /**/
    static CreateNode(ElementTag, Classes = "", Initializer = el => {}, Childs = null) {

        let _Element =  document.createElement(ElementTag);
        _Element.className = Classes;
        
        if(Childs !== null & Childs !== undefined){

            Childs.forEach(element => {

                _Element.appendChild(element);
            });
        }

        Initializer(_Element);

        return _Element;
    }
    
    /**/
    static BuildWidget(ChildWidget){
        return ChildWidget.Build();
    }

    /**/
    static BuildWidgets(WidgetList){
        return WidgetList.map(child => child.Build());
    }

    /**/
    Build(){
    }
}