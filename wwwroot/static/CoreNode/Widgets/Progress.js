import WidgetModel from "../Models/WidgetModel.js"

export default class extends WidgetModel {
	constructor(progressvalue)
	{
		super();
		this.progressvalue = progressvalue;
	}

	static Fields = () => { 
		progressvalue : "Progressbar value";
	}

	Build(){	
		return WidgetModel.CreateNode("div"," progress", el => {}, [
			WidgetModel.CreateNode("div"," progress-bar progress-bar-striped progress-bar-animated", el => {
				el.setAttribute("role", "progressbar");
				el.setAttribute("aria-valuenow", "75");
				el.setAttribute("aria-valuemin", "0");
				el.setAttribute("aria-valuemax", "100");
				el.style.width = this.progressvalue;
			}, []),
		]);
	}
}