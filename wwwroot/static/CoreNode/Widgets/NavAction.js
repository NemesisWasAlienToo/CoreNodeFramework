import  WidgetModel  from "/CoreNode/Models/WidgetModel.js";
import  Core  from "/CoreNode/Models/Core.js";

export default class extends WidgetModel {
	constructor(href, icon, name)
	{
		super();
		this.href = href;
		this.icon = icon;
		this.name = name;
	}

	static Fields = () => { 
		href : "Action redirect address";
		icon : "Action icon";
		name : "Action content";
	}

	Build(){	
		return Core.Node("a", {"href":this.href, "class":"icon-menu-item"}, [
			Core.Node("i", {"class":(this.icon + " d-block")}, [], el => {}),
			Core.Node("span", {}, [
				this.name,
			], el => {}),
		], el => {});
	}
}