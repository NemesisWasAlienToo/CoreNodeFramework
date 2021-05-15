
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
bellow is an example of how to set proper refrence to the framework application model :
```sh

import ApplicationModel from "/* Path to framework files */Models/ApplicationModel.js";

var Application = new ApplicationModel( ...
```
## Router setup
To setup router and client side pages you need to follow a few steps :
- Create your global layout (optional)
- Create your path specific layouts (optional)
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

 ---
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
                    { Pattern: "/Error/[Content]" , Controller: ErrorController ,

					/* Optional layout for this route pattern */
					
					LayoutBuilder : () => new Layout(
            			new Navigator("Error layout title","/",[]),
						new Footer("Footer content goes here" ,[])) },
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
or new page request content creation or other features.
Init, Final and this.LayoutRedraw are usually used to create smooth transition functions.
Init and Final functions are respectively called before
and after render finction is called.
> _WARNING_ : Layouts are only re-rendered when path pattern
has a LayoutBuilder diffrent than the global one passed to the Application instance,
therefore the Init and Final are only called when a redraw is needed, and so, they
are suitable to check for any layout re-render with this.LayoutRedraw
and handle the transition.

#### Controller Model

| Property | Functionality |
| ------ | ------ |
| Constructor | Saves the Parameters passed to the controller object |
| Build (async) | Builds the corresponding page content |
| Render (async) | Renders the page content |
| this.Delay(ms) | Creates delays in miliseconds |
| Init (async) | Is called once first before Build |
| Final (async) | Is called once after Build |
| this.LayoutRedraw | A bool value indicating if the layout is redrawn before calling this controller |

---

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
| Fields() - (Static) | Returns constructor's arguments with their discription |
| Build | Builds and returns the corresponding widget elements |
| BuildChilds | Builds the widgets sub widgets and contains them under the specified element |
| BuildChild(Widget) | Builds a widgets sub widget and contains it under where it it is called |

---

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

#### layout Model

| Property | Functionality |
| ------ | ------ |
| Constructor() | Does nothing |
| Fields() - (Static) | Returns constructor's arguments with their discription |
| Build() | Builds and returns the corresponding widget elements |
| BuildChild(Widget) | Builds a widgets sub widget and contains it under where it it is called |
| BuildChilds(WidgetList) | Builds the widgets sub widgets and contains them under where it it is called |
| App(ElementClasses) | Builds and and returns a body container in which the controllers' bodies will be rendered |

---

Example bellow demonstrates how to create a card widget
laced in a file name card.js :
```sh
import LayoutModel from "/* Path to framework files */Models/LayoutModel.js"

export default class extends LayoutModel {

    constructor(Nav, Footer){
        super();
        this.Nav = Nav;
        this.Footer = Footer;
    }

    static Fields = () => {
		Nav : "Navigation bar widget";
		Footer : "Footer widget"
	};

    async Init(){
        document.body.classList.add("hidden");
        await this.Delay(200);
    }

    async Final(){
        document.body.classList.remove("hidden");
        document.body.classList.add("visible");
    }

    Build(){
        return LayoutModel.CreateNode("div", "",el => {},[
            LayoutModel.BuildWidget(this.Nav),
            LayoutModel.CreateNode("div","jumbotron text-center", el => {}, [
                LayoutModel.CreateNode("section","jumbotron text-center", el => {},[
                    LayoutModel.CreateNode("div","container",el => {}, [
                        LayoutModel.CreateNode("h1", "", el => { el.innerText = "Example"}),
                        LayoutModel.CreateNode("p", "lead text-muted", el => { el.innerText = "Your leading text goes here"}),
                        LayoutModel.CreateNode("p", "", el => {}, null),
                    ]),
                ]),
                LayoutModel.CreateNode("div","album py-5 bg-light test-transition",el => {}, [
                    LayoutModel.CreateNode("div","container",el => {}, [
                        LayoutModel.CreateNode("div","row",el => {}, [
                            LayoutModel.CreateNode("div","col-md-12",el => {}, [
                                LayoutModel.App(""),
                            ]),
                        ]),
                    ]),
                ]),
            ]),
            LayoutModel.BuildWidget(this.Footer),
        ]);
    }
}

```

## Using Coer Node compiler

Core Node compiler is a tool for compiling html files to javascript widgets usable by the frame work.
This tool gives you the freedom to translate any custome html file into usable widget containing valid arguments ang childs you desire.
To use the translator there are a few steps to take.
 - Put the html content you want to translate in a file
 - Add a json object before the html content to specify files type and arguments

 ### Html json type declaration

 CoreNodeCompiler can automatically put your arguments in the proper place after generating the javascript widget.
 But for it to be able to do that there a few things that it needs to know.
 take the example bellow : 
 ``` sh
 #{
	"Type" : 0,
	"Arguments" : {
		"progressvalue" : {
			"Type" : 0,
			"Description" : "Progressbar value"
		},
		"heightfunc" : {
			"Type" : 3,
			"Description" : "function to give the value"
		},
		"name" : {
			"Type" : 0,
			"Description" : "function to give the value"
		}
	}
}#
<div class="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="#name#" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: #progressvalue#;height:#heightfunc#"></div>
</div>
 ```

 ## Arguments

 ### Defining arguments

 > WARNING : _always define argument names with low case letters_

 The json data needs to be inside hash tags to be recognized by the translator.
 Json data gives the translator two important data:
  - First the type of the widget output which can be either Widget (0) or Layout (1) specified after the "Type" tag.
  - Second the arguments it takes.

  To define an argument you need to mention its name ("progressvalue"), then its type picked from the table bellow and last but not least its description.

 | Type | Value | Functionality |
| ------ | ------ | ------ |
| Single | 0 | Integer, string or any other type that contains only a single value |
| Widget | 1 | A child widget |
| Widget List | 2 | A list of widgets |
| Function | 3 | A value to be retrieved by a function |

Example :

 ``` sh
 #{
	"Type" : 0,

```
 This file is a widget
```sh
	"Arguments" : {
		"name" : {
			"Type" : 0,
			"Description" : "function to give the value"
		}
        "childs" : {
			"Type" : 2,
			"Description" : "child widgets"
		}
	}
}#
 ```
 The widget takes one argument of single type named "name" and a variable of named "childs" as Widget List type and we can see each one's description.

 ### Using arguments inside html file

 #### Widget

 After defining a single or function type argument you need to put it's name inside two hash tag signs (#) where it's content is supposed to be in the html file.
 > In case you need to use the hash tag sign and it should not be interpreted as command just put a \ sigen before them (\# will be translated into # in the output file)
 After defining a widget of widget list argument you need to define a html element by the argument name where it's content is supposed to be in the html file.

 Input example : 

 ```sh
  #{
	"Type" : 0,
	"Arguments" : {
		"progressvalue" : {
			"Type" : 0,
			"Description" : "Progressbar value"
		},
		"heightfunc" : {
			"Type" : 3,
			"Description" : "function to give the value"
		},
		"name" : {
			"Type" : 0,
			"Description" : "function to give the value"
		},
        "childs" : {
			"Type" : 2,
			"Description" : "child widgets"
		}
	}
}#
    <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="#name#" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: #progressvalue#;height:#heightfunc#">
        <childs></childs> or <childs/>
    </div>
 ```

  In the example above the translator will build the html file into a widget format and for each argument its content is placed in its place properly after its value is passed
  through the constructor of function of class.

 Output :
 ```sh
import WidgetModel from "../Models/WidgetModel.js"

export default class extends WidgetModel {
	constructor(progressvalue, heightfunc = () => {}, name, childs = [])
	{
        /* all arguments are passed to the widget when an instance is being created */
		super();
		this.progressvalue = progressvalue;
		this.heightfunc = heightfunc;
		this.name = name;
		this.childs = childs;
	}

	static Fields = () => { 
		progressvalue : "Progressbar value";
		heightfunc : "function to give the value";
		name : "function to give the value";
		childs : "function to give the value";
	}

	Build(){	
		return WidgetModel.CreateNode("div"," progress", el => {}, [
			WidgetModel.CreateNode("div"," progress-bar progress-bar-striped progress-bar-animated", el => {
				el.setAttribute("role", this.name); //---------> the elements name will be defined by name variable of this instance
				el.setAttribute("aria-valuenow", "75");
				el.setAttribute("aria-valuemin", "0");
				el.setAttribute("aria-valuemax", "100");
				el.style.width = this.progressvalue; // ------> the progress bar width will be defined by progressvalue variable of this instance
				el.style.height = this.heightfunc(); // ------> the progress bar height will be defined by heightfunc() function of this instance
			}, []),
			WidgetModel.CreateNode("childs"," ", el => {}, WidgetModel.BuildWidgets(this.childs)), ----> widgets passed childs variable through of this instance
		]);
	}
}
 ```
#### Layout
Layout files are almost identical to widget files.
The slight deiffrence is as bellow :
- Where you need to put the body of your application you can just put the html tag of "app", and dont forget to change the files "Type" to 1.

Example input :

```sh
#{
	"Type" : 1,
	"Arguments" : {
		"progressvalue" : {
			"Type" : 0,
			"Description" : "Progressbar value"
		},
		"heightfunc" : {
			"Type" : 3,
			"Description" : "function to give the value"
		},
		"name" : {
			"Type" : 0,
			"Description" : "function to give the value"
		},
		"childs" : {
			"Type" : 2,
			"Description" : "function to give the value"
		}
	}
}#
<div class="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="#name#" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: #progressvalue#;height:#heightfunc#"></div>
	<childs/>
	<app/>
</div>
```

Output :
```sh
import LayoutModel from ".. /Models/LayoutModel.js"

export default class extends LayoutModel {
	constructor(progressvalue, heightfunc = () => {}, name, childs = [])
	{
		super();
		this.progressvalue = progressvalue;
		this.heightfunc = heightfunc;
		this.name = name;
		this.childs = childs;
	}

	static Fields = () => { 
		progressvalue : "Progressbar value";
		heightfunc : "function to give the value";
		name : "function to give the value";
		childs : "function to give the value";
	}

	Build(){	
		return LayoutModel.CreateNode("div"," progress", el => {}, [
			LayoutModel.CreateNode("div"," progress-bar progress-bar-striped progress-bar-animated", el => {
				el.setAttribute("role", this.name);
				el.setAttribute("aria-valuenow", "75");
				el.setAttribute("aria-valuemin", "0");
				el.setAttribute("aria-valuemax", "100");
				el.style.width = this.progressvalue;
				el.style.height = this.heightfunc();
			}, []),
			LayoutModel.CreateNode("childs"," ", el => {}, LayoutModel.BuildWidgets(this.childs)),
			LayoutModel.App(""),
		]);
	}
}
```