/**/

import ControllerModel from "../Models/ControllerModel.js"
import Card from "../Widgets/Card.js"
import Paragraph from "../Widgets/Paragraph.js"

export default class extends ControllerModel{
    async Body(){
        return new Card("Error", "Content of the error is : ", [
            new Paragraph(this.Params.Content),
            new Paragraph("Return to home"),
        ])
    }
}