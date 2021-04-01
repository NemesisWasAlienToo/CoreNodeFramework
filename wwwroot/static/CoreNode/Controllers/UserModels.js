/**/
import Container from "../Widgets/Container.js"
import Progress from "../Widgets/Progress.js"
import ControllerModel from "../Models/ControllerModel.js"
import Table from "../Widgets/Table.js"
import Button from "../Widgets/Button.js"

export default class UserController extends ControllerModel{
    async Init(){

        if(UserController.ControllerContext == undefined || UserController.ControllerContext == null){
            UserController.ControllerContext = {
                Headers : ["number", "name" , "last"],
                Data : [
                    {number : 0, name : "test 0", last : "last test 0"},
                    {number : 1, name : "test 1", last : "last test 1"},
                    {number : 2, name : "test 2", last : "last test 2"},
                    {number : 3, name : "test 3", last : "last test 3"},
                    {number : 4, name : "test 4", last : "last test 4"},
                    {number : 5, name : "test 5", last : "last test 5"},
                ]
            };
        }

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
            new Button("Add data to table", async () => {
                UserController.ControllerContext.Data.push({number : 0, name : "test 0", last : "last 0"});
                await this.Render();
            }),
            new Progress("90%"),
            new Table(UserController.ControllerContext.Headers, UserController.ControllerContext.Data),
        ]);
    }
}