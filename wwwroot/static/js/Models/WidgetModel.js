/**/
export default class WidgetModel{
    
    constructor(){
    }

    CreateNode(ElementTag, Classes = "", Initializer = el => {}, Childs = null) {

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

    BuildChilds(){
        return this.Childs.map(child => child.Build());
    }

    Build(){
        return '';
    }
}