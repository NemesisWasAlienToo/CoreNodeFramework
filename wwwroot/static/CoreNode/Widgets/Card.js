import  WidgetModel  from "/CoreNode/Models/WidgetModel.js";
import  Core  from "/CoreNode/Models/Core.js";
export default class extends WidgetModel {
	constructor(title, col = 12, buttom = 4, center = false, content = [])
	{
		super();
		this.title = title;
		this.col = col;
		this.content = content;
		this.buttom = buttom;
		this.center = center;
	}

	static Fields = () => { 
		title : "Card title";
		content : "Card's content";
		col : "";
	}

	Build(){
		return Core.Node('div', {class : "mb-col-md-" + this.col +" col-lg-" + this.col + " mb-" + this.buttom}, [
			Core.Node("div", {"class":"card mb-" + this.buttom}, [
				Core.Node("div", {"class": this.center ? "card-body text-center":"card-body"}, [
					Core.Node("h5", {"class":"card-title"}, [
						this.title,
					], el => {}),
					...Core.BuildWidgets(this.content),
				], el => {}),
			], el => {})
		], el => {});
	}
}