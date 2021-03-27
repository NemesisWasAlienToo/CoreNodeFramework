import ControllerModel from "../Models/ControllerModel.js"
import Section from "../Widgets/Section.js"
import Card from "../Widgets/Card.js"
import Paragraph from "../Widgets/Paragraph.js"
import Button from "../Widgets/Button.js"
import Container from "../Widgets/Container.js"

export default class ErrorController extends ControllerModel{
    async Body(){
        if(ErrorController.ControllerContext == null || ErrorController.ControllerContext == undefined){
            ErrorController.ControllerContext = new Container([
                new Button("Add card", () => {
                    ErrorController.ControllerContext.Childs[1].Childs.push(new Card("New card", "", [
                        new Paragraph("New card here"),
                    ]));
                    this.Render();
                }),
                new Section([
                    new Card("Error", "Content of the error is : ", [
                        new Paragraph(this.Params.Content),
                        new Paragraph("Return to home"),
                    ]),
                    new Card("Error", "Content of the error is : ", [
                        new Paragraph(this.Params.Content),
                        new Paragraph("Return to home"),
                    ]),
                    new Card("Error", "Content of the error is : ", [
                        new Paragraph(this.Params.Content),
                        new Paragraph("Return to home"),
                    ]),
                ]),
            ]);
        }

        return ErrorController.ControllerContext;
    }
}

/*

*/