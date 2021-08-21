import  LayoutModel  from "/CoreNode/Models/LayoutModel.js";
import  Core  from "/CoreNode/Models/Core.js";

export default class MinimalLayout extends LayoutModel {
	constructor(nav, action)
	{
		super();
		this.nav = nav;
		this.action = action;
	}

	Build(){
		return Core.Node("div", {}, [
			Core.Node("main", {"id":"app","style":"margin:60px"}, [
				Core.Node('div', {class : "container-fluid"}, [
					Core.Node('div', {class : "loading"}, [], el => {}),
				], el => {})
			], el => {}),
			Core.BuildWidgets([this.action])[0],
		], el => {});
	}
}