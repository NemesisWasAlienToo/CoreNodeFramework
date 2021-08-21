import  WidgetModel  from "/CoreNode/Models/WidgetModel.js";
import  Core  from "/CoreNode/Models/Core.js";
export default class extends WidgetModel {
	constructor(title, func = () => {}, type = "btn btn-primary mb-1")
	{
		super();
		this.type = type;
		this.title = title;
		this.func = func;
	}

	static Fields = () => { 
		type : "Button's color";
		title : "Button title";
		func : "Click function";
	}

	Build(){	
		return Core.Node("button", {"type":"button", "class":this.type, "onclick" : this.func, style:"color:var(--foreground-color)"}, [
			this.title,
		]);
	}
}