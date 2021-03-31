/**/

import ControllerModel from "../Models/ControllerModel.js"
import Card from "../Widgets/Card.js"

export default class extends ControllerModel{
    async Init(){

        if(this.LayoutRedraw)
            return;

        document.getElementById("app").classList.add("hidden");
        await this.Delay(200);
    }

    async Final(){
        if(this.LayoutRedraw)
            return;

        document.getElementById("app").classList.remove("hidden");
        document.getElementById("app").classList.add("visible");
    }

    async Body(){
        return new Card("hiiiiiiiiiiiiiiiiiiiiiiiiiii");
    }
}