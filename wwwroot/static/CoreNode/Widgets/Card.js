import WidgetModel from "../Models/WidgetModel.js"

export default class extends WidgetModel {
	constructor(Title = "", Helper = "", Childs = [], Size = 0){
		super();
		this.Title = Title;
		this. Helper = Helper;
		this.Childs = Childs;
		this.Size = Size;
	}

	Build(){
		return WidgetModel.CreateNode("div"," card ", el => {
			el.setAttribute('style', 'width: 50%;');
		} , [
			WidgetModel.CreateNode("div"," card-body", el => {
				
			} , [
				WidgetModel.CreateNode("h5"," card-title", el => {
					
					el.innerText = this.Title;
				} , [
				]),
				WidgetModel.CreateNode("p"," card-text", el => {
					
					el.innerText = this.Helper;
				} , [
				]),
				WidgetModel.CreateNode("div", "", el => {}, WidgetModel.BuildWidgets(this.Childs)),
			]),
		]);
	}
}