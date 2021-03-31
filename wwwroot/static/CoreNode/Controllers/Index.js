/**/

import ControllerModel from "../Models/ControllerModel.js"
import Card from "../Widgets/Card.js"

export default class extends ControllerModel{
    async Init(){
        document.getElementById("app").classList.add("hidden");
        await this.Delay(500);
    }

    async Final(IsBefore){
        document.getElementById("app").classList.remove("hidden");
        document.getElementById("app").classList.add("visible");
    }
    
    async Body(){
        return new Card("hiiiiiiiiiiiiiiiiiiiiiiiiiii");
    }
}