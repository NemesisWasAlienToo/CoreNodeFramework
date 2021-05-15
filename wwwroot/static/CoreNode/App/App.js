import ApplicationModel from "../Models/ApplicationModel.js";
import RootController from "../Controllers/Index.js";
import Layout from "../Layouts/Layout.js";

var Application = new ApplicationModel({

    /* Function to be called on error */
    OnErrorCallBack : ErrorContent => { alert(ErrorContent); },

    /* Functiion to be called on navigation link selection */
    OnNavItemSelect : NavItem => {
        NavItem.parentNode.classList.add("active");
    },

    /* Function to be called on navigation link unselection */
    OnNavItemUnelect : NavItem => {
        NavItem.parentNode.classList.remove("active");
    },

    /* Main layout builder function */
    LayoutBuilder : () => new Layout(),

    /* Route patterns hierarchy, the sooner defined, the higher the priority
    and the sooner it is captured and thus occures first */
    Routes: [
        { Pattern: "/" , Controller: RootController },
    ],

    /* Index of the error route in the Routes objects */
    ErrorRouteIndex : 1,
});