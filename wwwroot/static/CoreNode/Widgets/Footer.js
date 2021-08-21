import WidgetModel  from "/CoreNode/Models/WidgetModel.js";
import Core  from "/CoreNode/Models/Core.js";

export default class extends WidgetModel {
	constructor(content, links = [])
	{
		super();
		this.content = content;
		this.links = links;
	}

	static Fields = () => { 
		content : "Footer content";
		links : "Footer links";
	}

	Build(){	
		return Core.Node("footer", {"class":"page-footer"}, [
			Core.Node("div", {"class":"footer-content"}, [
				Core.Node("div", {"class":"container-fluid"}, [
					Core.Node("div", {"class":"row"}, [
						Core.Node("div", {"class":"col-12 col-sm-6"}, [
							Core.Node("p", {"class":"mb-0 text-muted"}, [
								this.content,
							], el => {}),
						], el => {}),
						Core.Node("div", {"class":"col-sm-6 d-none d-sm-block"}, [
							Core.Node("ul", {"class":"breadcrumb pt-0 pr-0 float-right"}, Core.BuildWidgets(this.links), el => {}),
						], el => {}),
					], el => {}),
				], el => {}),
			], el => {}),
		], el => {});
	}
}