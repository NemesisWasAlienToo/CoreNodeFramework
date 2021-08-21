import  WidgetModel  from "/CoreNode/Models/WidgetModel.js";
import  Core  from "/CoreNode/Models/Core.js";

export default class extends WidgetModel {
    constructor(TagName = "", Properties = {}, Childs = [], Initializer = () => {}){
        super();
        this.TagName = TagName;
        this.Properties = Properties;
        this.Childs = Childs;
        this.Initializer = Initializer;
    }

    static Fields = () => { 
		TagName : "Node's tag name";
		Properties : "Node's properties";
		Childs : "Node's childs";
		Initializer : "Node's intializer function";
	}

    Build(){
        return Core.Node(this.TagName, this.Properties , Core.BuildWidgets(this.Childs), this.Initializer);
    }
}