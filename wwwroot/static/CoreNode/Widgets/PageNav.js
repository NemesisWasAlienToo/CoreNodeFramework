import  WidgetModel  from "/CoreNode/Models/WidgetModel.js";
import  Core  from "/CoreNode/Models/Core.js";

export default class extends WidgetModel {
	constructor()
	{
		super();
	}

	static Fields = () => {}

	Build(){	
		return Core.Node("nav", {"class":"mt-4 mb-3"}, [
			Core.Node("ul", {"class":"pagination justify-content-center mb-0"}, [
				Core.Node("li", {"class":"page-item"}, [
					Core.Node("a", {"class":"page-link first", "href":"#"}, [
						Core.Node("i", {"class":"simple-icon-control-start"}, [], el => {}),
					], el => {}),
				], el => {}),
				Core.Node("li", {"class":"page-item"}, [
					Core.Node("a", {"class":"page-link prev", "href":"#"}, [
						Core.Node("i", {"class":"simple-icon-arrow-left"}, [], el => {}),
					], el => {}),
				], el => {}),
				Core.Node("li", {"class":"page-item active"}, [
					Core.Node("a", {"class":"page-link", "href":"#"}, [
						"1",
					], el => {}),
				], el => {}),
				Core.Node("li", {"class":"page-item"}, [
					Core.Node("a", {"class":"page-link next", "href":"#", "aria-label":"Next"}, [
						Core.Node("i", {"class":"simple-icon-arrow-right"}, [], el => {}),
					], el => {}),
				], el => {}),
				Core.Node("li", {"class":"page-item"}, [
					Core.Node("a", {"class":"page-link last", "href":"#"}, [
						Core.Node("i", {"class":"simple-icon-control-end"}, [], el => {}),
					], el => {}),
				], el => {}),
			], el => {}),
		], el => {});
	}
}