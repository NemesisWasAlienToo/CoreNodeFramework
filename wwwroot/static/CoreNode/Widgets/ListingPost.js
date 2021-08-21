import LayoutModel from "/CoreNode/Models/LayoutModel.js";
import WidgetModel from "/CoreNode/Models/WidgetModel.js";
import Core from "/CoreNode/Models/Core.js";

export default class ListingPost extends WidgetModel {
	constructor(Image = "", Href = "/", Content = "", Footer = "", Badges)
	{
		super();
		this.Image = Image;
		this.Href = Href;
		this.Content = Content;
		this.Footer = Footer;
		this.Badges = Badges;
	}

	Build = () => Core.Node("div", {"class":"col-xl-4 col-lg-4 col-12 col-sm-6 mb-4"}, [
		Core.Node("div", {"class":"card"}, [
			Core.Node("div", {"class":"position-relative"}, [
				Core.Node("a", {"href":this.Href, "data-link":""}, [
					Core.Node("img", {"class":"card-img-top", "src":this.Image, "alt":"Card image cap"}, [], el => {}),
				], el => {}),
				...Core.BuildWidgets(this.Badges),
			], el => {}),
			Core.Node("div", {"class":"card-body"}, [
				Core.Node("div", {"class":"row"}, [
					Core.Node("div", {"class":"col-2"}, [
						Core.Node("div", {"class":"custom-control custom-checkbox pl-1"}, [
							Core.Node("label", {"class":"custom-control custom-checkbox mb-0"}, [
								Core.Node("input", {"type":"checkbox", "class":"custom-control-input"}, [], el => {}),
								Core.Node("span", {"class":"custom-control-label"}, [], el => {}),
							], el => {}),
						], el => {}),
					], el => {}),
					Core.Node("div", {"class":"col-10"}, [
						Core.Node("p", {"class":"list-item-heading mb-4 pt-1"}, [
							this.Content,
						], el => {}),
						Core.Node("footer", {}, [
							Core.Node("p", {"class":"text-muted text-small mb-0 font-weight-light"}, [
								this.Footer,
							], el => {}),
						], el => {}),
					], el => {}),
				], el => {}),
			], el => {}),
		], el => {}),
	], el => {});
}
