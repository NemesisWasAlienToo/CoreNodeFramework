/**/
import Container from "../Widgets/Container.js"
import Progress from "../Widgets/Progress.js"
import ControllerModel from "../Models/ControllerModel.js"
import Button from "../Widgets/Button.js"

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
        return new Container([
            new Button("Click me!", async () => {
                this.layoutBuilder({Title : "Test title"}).Render();
                await this.Render();
            }),
            new Progress("90%"),
        ]);
    }
}