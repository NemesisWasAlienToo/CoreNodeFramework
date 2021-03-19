/**/

import ControllerModel from "../Models/ControllerModel.js"
import Card from "../Widgets/Card.js"

export default class extends ControllerModel{
    async Build(){
        this.Render(new Card("hiiiiiiiiiiiiiiiiiiiiiiiiiii"));
    }
}