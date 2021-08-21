import  WidgetModel  from "/CoreNode/Models/WidgetModel.js";
import  Core  from "/CoreNode/Models/Core.js";

export default class extends WidgetModel {
	constructor(text, margin = {})
	{
		super();
		this.text = text;
		this.margin = "";
		if(margin.top){
			this.margin += "margin-top:" + margin.top + " !important;";
		}
		if(margin.bottom){
			this.margin += "margin-bottom:" + margin.bottom + " !important;";
		}
		if(margin.right){
			this.margin += "margin-right:" + margin.right + " !important;";
		}
		if(margin.left){
			this.margin += "margin-left:" + margin.left + " !important;";
		}
	}

	static Fields = () => { 
		text : "Text";
	}

	Build(){	
		return Core.Node("p", {"style": this.margin}, [
			this.text,
		], el => {});
	}
}