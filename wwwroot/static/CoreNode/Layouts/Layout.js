import  LayoutModel  from "/CoreNode/Models/LayoutModel.js";
import  Core  from "/CoreNode/Models/Core.js";

export default class DefaultLayout extends LayoutModel {

	constructor(nav, menu, footer)
	{
		super();
		this.nav = nav;
		this.menu = menu;
		this.footer = footer;
	}

	Build(){
		return Core.Node("div", {}, [
			Core.BuildWidgets([this.nav])[0],
			Core.BuildWidgets([this.menu])[0],
			Core.Node("main", {"id":"app"}, [
				Core.Node('div', {class : "container-fluid"}, [
					Core.Node('div', {class : "loading"}, [], el => {}),
				], el => {})
			], el => {}),
			Core.BuildWidgets([this.footer])[0],
		], el => {});
	}
}