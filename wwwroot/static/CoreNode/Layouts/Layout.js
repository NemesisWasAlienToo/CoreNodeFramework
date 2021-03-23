import LayoutModel from "../Models/LayoutModel.js"

export default class extends LayoutModel {

    constructor(Nav, Footer){
        super();
        this.Nav = Nav;
        this.Footer = Footer;
    }

    static Fields = () => {};

    async Build(){
        return LayoutModel.CreateNode("div","",el => {},[
            LayoutModel.BuildWidget(this.Nav),
            LayoutModel.CreateNode("div","jumbotron text-center", el => {}, [
                LayoutModel.CreateNode("section","jumbotron text-center", el => {},[
                    LayoutModel.CreateNode("div","container",el => {}, [
                        LayoutModel.CreateNode("h1", "", el => { el.innerText = "Example"}),
                        LayoutModel.CreateNode("p", "lead text-muted", el => { el.innerText = "Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely."}),
                        LayoutModel.CreateNode("p", "", el => {}, null),
                    ]),
                ]),
                LayoutModel.CreateNode("div","album py-5 bg-light",el => {}, [
                    LayoutModel.CreateNode("div","container",el => {}, [
                        LayoutModel.CreateNode("div","row",el => {}, [
                            LayoutModel.CreateNode("div","col-md-12",el => {}, [
                                LayoutModel.App(""),
                            ]),
                        ]),
                    ]),
                ]),
            ]),
            LayoutModel.BuildWidget(this.Footer),
        ]);
    }
}