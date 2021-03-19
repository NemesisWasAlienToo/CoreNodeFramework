import WidgetModel from "../Models/WidgetModel.js"

export default class extends WidgetModel {

    constructor(Title = "", Helper = "" , Childs = []){
        super();
        this.Title = Title;
        this.Helper = Helper;
        this.Childs = Childs;
    }

    Build(){
        return this.CreateNode("section","basic-inputs", el => {}, [
            this.CreateNode("div","row match-height", el => {}, [
                this.CreateNode("div","col-xl-4 col-lg-6 col-md-12", el => {}, [
                    this.CreateNode("div","card", el => {}, [
                        this.CreateNode("div","card-header", el => {}, [
                            this.CreateNode("h4","card-title", el => { el.innerText = this.Title; }),
                        ]),
                        this.CreateNode("div","card-block", el => {}, [
                            this.CreateNode("div","card-body", el => {}, [
                                this.CreateNode("fieldset","form-group", el => {}, this.BuildChilds()),
                            ]),
                        ]),
                    ]),
                ]),
            ]),
        ]);
    }
}