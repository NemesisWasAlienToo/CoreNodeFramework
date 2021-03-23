/**/

import ControllerModel from "../Models/ControllerModel.js"
import Button from "../Widgets/Button.js"

export default class extends ControllerModel{
    async Body(){
        return new Button("Click me!",() => { alert("Im clicked"); });
    }
}