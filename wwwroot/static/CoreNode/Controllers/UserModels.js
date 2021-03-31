/**/
import Container from "../Widgets/Container.js"
import Progress from "../Widgets/Progress.js"
import ControllerModel from "../Models/ControllerModel.js"
import Button from "../Widgets/Button.js"

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
        return new Container([
            new Button("Click me!", async () => {
                this.layoutBuilder({Title : "Test title"}).Render();
                await this.Render();
            }),
            new Progress("90%"),
        ]);
    }
}