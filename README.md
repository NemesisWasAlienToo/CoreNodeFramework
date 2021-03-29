
# Core Node Web Framework
## _Lightweight single page app framework_
This project is still in progress.
This file will be updated.
>for detailed documentation refer to wiki pages

## Features

- The framework contains very few files
- Easy to work with
- Completely opensource
- Easy to extend
- Contains tools for extending or completly replacing the widget set

Core Node framework is a JavaScript based framework for implementing single page and progressive web applications
using widget based implementation while having tools for barebone JavaScript and HTML view generation.

> This project is still in development and any file might be subjected to changes
in the incoming updates and commits.
For deployment you can use any web server you favor.
Here for development phase, we are using node.js as web host
due to its minor time consumption suitable for development purposes.
Although we do not recommend using node.js web host for practical uses.

## Installation

### Local Server
Core Node Server application requires [Node.js](https://nodejs.org/) to run.
Install the dependencies and start the server after.
```sh
git clone https://github.com/NemesisWasAlienToo/CoreNodeSPA
cd NodeCoreSPA
npm init -y
npm i express
node server.js
```

### Client side framework

To use the client side framework copy its files into your host application and set their route as static files.
Then build a javascript file and name it as you please.
the you need to add refrence to the library and initialize an instance of application.
bellow is an example of how to set proper refrence to the framework allication model :
```sh

import ApplicationModel from "/* Path to framework files */Models/ApplicationModel.js";

var Application = new ApplicationModel( ...
```
## Router setup
To setup router and client side pages you need to follow a few steps :
- Create your Layout (optional)
- Create your widet set
- Create your controllers
- Initialize a router object

### Router Initialzation

 | Property | Functionality |
 | --- | --- |
 | OnErrorCallBack | Will be called upon occurance of error passing the error content |
 | OnNavItemSelect | Will be called when an navigation link is selected passing the selected item |
 | OnNavItemUnelect | Will be called when an navigation link is unselected passing the selected item |
 | LayoutBuilder | Is called once after downloading the content from the server to build the main layout |
 | Routes | Defines the Route patterns and corresponding controller for the route |
 | ErrorRouteIndex | Index of the Error route in the Routes object |

 
Bellow shows an example initializing a Router object :
```sh
    <head>
        <script type="module">
        
            /* Refrence to framework router and application */
            import ApplicationModel from "../Models/ApplicationModel.js";

            /* Refrence to controllers */
            import RootController from "../Controllers/Index.js";
            import ErrorController from "../Controllers/Error.js";
            import UserModels from "../Controllers/UserModels.js";

            /* Refrence to layout */
            import Layout from "../Layouts/Layout.js";

            /* Refrence to widgets */
            import Navigator from '../Widgets/Navigator.js';
            import Footer from '../Widgets/Footer.js';
            import NavigationLink from "../Widgets/NavigationLink.js"

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
        </script>
    </head>
```

## Controllers

will be coming soon

#### Controller Parameters
Parameters are passed to the controller in of two ways:
- via url get parameters
- via Route defined parameters
##### Url get parameters
All url get parameters are automatically passed to the controller through the Params object
for example when visiting the bellow url :
```sh
yourdomain/Home?user=me&error=canno+be+found
```
The controller's Params will be like bellow:
```sh
this.Params = {
    ... ,
    user : "me",
    error : "cannot+be+found",
};
```
##### Route defined parameters
To define route parameter you will define the route pattern as normal but
put the name of the parameter between brackets [] and the value of the parameter
will be captured automatically and passed to the controller through the Params.
For example the route patter is defined as
```sh
Pattern : /Item/Details/[id] , ...
```
when visiting the bellow url :
```sh
yourdomain/Item/Details/12
```
The controller's Params will be like bellow:
```sh
this.Params = {
    id : 12,
    ... ,
};
```

The example bellow demonstrates how to setup a route for the index page:

```sh
import RootController from "/* Path to framework files */Controllers/Index.js";

var RouterParams = {
    Routes: [
        { Pattern: "/" , Controller: RootController}, // <------- Home controller and route pattern
        { Pattern: "/Item/Details/[id]" , Controller: ItemController},
    ],
};
```

## Base Models

Base Models are to be extended and used in the client side router to handle route
or new page request content creation or other features

#### Controller Model

| Property | Functionality |
| ------ | ------ |
| Constructor | Saves the Parameters passed to the controller object |
| Bild (async) | Builds the corresponding page content |
| Render (async) | Renders the page content |

Example bellow demonstrates how to create a controller in a file
for example, named " index.js ":

> This controller is called upon visit of the path specified
by the RouterParams object

  

```sh
import ControllerModel from "/* Path to framework files */Models/ControllerModel.js"
import Card from "/* Path to framework files */Widgets/Card.js"

export default class extends ControllerModel{

    async Build(){
        this.Render(new Card("hiiiiiiiiiiiiiiiiiiiiiiiiiii"));
    }
}
```
#### Widget Model

| Property | Functionality |
| ------ | ------ |
| Constructor | Does nothing |
| Bild | Builds and returns the corresponding widget elements |
| BuildChilds | Builds the widgets sub widgets and contains them under the specified element |

Example bellow demonstrates how to create a card widget
laced in a file name card.js :
```sh
import WidgetModel from "/* Path to framework files */Models/WidgetModel.js"

export default class extends WidgetModel {

    constructor(Title = "", Helper = "" , Childs = []){
        super();
        this.Title = Title;
        this.Helper = Helper;
        this.Childs = Childs;
    }

    Build(){
        return this.CreateNode("section","basic-inputs", el => {}, [
            this.CreateNode("div","row match-height", el => {}, [
                this.CreateNode("div","col-xl-4 col-lg-6 col-md-12", el => {}, [
                    this.CreateNode("div","card", el => {}, [
                        this.CreateNode("div","card-header", el => {}, [
                            this.CreateNode("h4","card-title", el => { el.innerText = this.Title; }),
                        ]),
                        this.CreateNode("div","card-block", el => {}, [
                            this.CreateNode("div","card-body", el => {}, [
                                this.CreateNode("fieldset","form-group", el => {}, this.BuildChilds())
                            ]),
                        ]),
                    ]),
                ]),
            ]),
        ]);
    }
}

```
