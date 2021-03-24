import RouterModel from "../Models/RouterModel.js";
import RootController from "../Controllers/Index.js";
import ErrorController from "../Controllers/Error.js";
import UserModels from "../Controllers/UserModels.js";
import Layout from "../Layouts/Layout.js";
import Navigator from '../Widgets/Navigator.js';
import Footer from '../Widgets/Footer.js';
import NavigationLink from "../Widgets/NavigationLink.js"

var Router = new RouterModel({

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
    LayoutBuilder : (LayoutParams = {
        Title : "Core Node"
    }) => new Layout(
        new Navigator(LayoutParams.Title,"/",[
            new NavigationLink("Error","/Error/Error is : :)"),
            new NavigationLink("User", "/UserModels")
        ]),
        new Footer("Footer content goes here" ,[])
    ),

    /* Route patterns hierarchy, the sooner defined, the higher the priority
    and the sooner it is captured and thus occures first */
    Routes: [
        { Pattern: "/"                , Controller: RootController  },
        { Pattern: "/UserModels"      , Controller: UserModels },
        { Pattern: "/Error/[Content]" , Controller: ErrorController },
    ],

    /* Index of the error route in the Routes objects */
    ErrorRouteIndex : 1,
      
});