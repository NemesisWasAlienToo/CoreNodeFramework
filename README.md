
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
node server
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
 | UIInitializer | Will be called after the page is constructed in case some javascript event handling functions or intializers need to run to make it responsive or to acheave any other goal |
 | ForceLayoutBuild | Forces the layout to be re-rendered every time the route is changed and the new body is rebdered |
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
                    { Pattern: "/About"      , Controller: UserModels },
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
The controller's Params variable will be like bellow:
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
import IndexController from "/* Path to framework files */Controllers/Index.js";

var RouterParams = {
    Routes: [
        { Pattern: "/" , Controller: IndexController}, // <------- Home controller and route pattern
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

| Property | Type | Requrement | Functionality |
| ------ | ------ | ------ | ------ |
| Constructor() | Constructor | Optional | Does nothing |
| Fields() | Static | Optional | Returns constructor's arguments with their discription |
| async Init() | Interface | Optional | Runs before the body is rendered |
| async Final()| Interface | Optional | Runs after body is rendered |
| async Body() | Interface | Required | Builds and returns the corresponding widget elements |
| async Render() | Implemented | Required | Builds and renders the content inside body of page after routing is completed |
| async ReRender() | Implemented | - | Builds and renders the content inside body of page again |

---

Example bellow demonstrates how to create a controller in a file
for example, named " index.js ":

> This controller is called upon visit of the path related to it
in the RouterParams object

  

```sh
import ControllerModel from "/* Path to framework files */Models/ControllerModel.js";
import Container from "/* Path to framework files */Widgets/Container.js";
import Row from "/* Path to framework files */Widgets/Row.js";
import Card from "/* Path to framework files */Widgets/Card.js";
import Button from "/* Path to framework files */Widgets/Button.js";

export default class extends ControllerModel{
    async Body(){
        return new Container("container-fluid disable-text-selection", [
            new Row([
                new Container("col-12 col-lg-5 col-xl-4 col-left", [
                    new Card("Buttons", 12, 4, false, [
                        new Button("Click me","btn btn-primary mb-1"),
                    ]),
                ]),
            ]),
        ]);
    }
}
```
#### Widget Model

| Property | Type | Requrement | Functionality |
| ------ | ------ | ------ | ------ |
| Constructor() | Constructor | Optional | Does nothing |
| Fields() | Static | Optional | Returns constructor's arguments with their discription |
| async Build() | Interface | Required | Builds and returns the element representing this widget |

---

Example bellow demonstrates how to create a card widget
placed in a file name card.js :
```sh

import  WidgetModel  from "/* Path to framework files */Models/WidgetModel.js";
import  Core  from "/* Path to framework files */Models/Core.js";
export default class extends WidgetModel {
	constructor(title, col = 12, buttom = 4, center = false, content = [])
	{
		super();
		this.title = title;
		this.col = col;
		this.content = content;
		this.buttom = buttom;
		this.center = center;
	}

	static Fields = () => { 
		title : "Card title";
		content : "Card's content";
		col : "";
	}

	Build(){
		return Core.Node('div', {class : "mb-col-md-" + this.col +" col-lg-" + this.col + " mb-" + this.buttom}, [
			Core.Node("div", {"class":"card mb-" + this.buttom}, [
				Core.Node("div", {"class": this.center ? "card-body text-center":"card-body"}, [
					Core.Node("h5", {"class":"card-title"}, [
						this.title,
					], el => {}),
					...Core.BuildWidgets(this.content),
				], el => {}),
			], el => {})
		], el => {});
	}
}

```



#### layout Model

| Property | Type | Requrement | Functionality |
| ------ | ------ | ------ | ------ |
| Constructor() | Constructor | Optional | Does nothing |
| Fields() | Static | Optional | Returns constructor's arguments with their discription |
| async Init() | Interface | Optional | Runs before the layout is rendered |
| async Final()| Interface | Optional | Runs after the layout is rendered |
| async Build() | Interface | Required | Builds and returns the element representing this widget |
| async Render() | Implemented | - | Builds and renders the layout and renders it inside body element of document |

---

Example bellow demonstrates how to create a minimal layout
placed in a file name MinimalLayout.js :
```sh
import  LayoutModel  from "/* Path to framework files */Models/LayoutModel.js";
import  Core  from "/* Path to framework files */Models/Core.js";

export default class MinimalLayout extends LayoutModel {
	constructor(nav, action)
	{
		super();
		this.nav = nav;
		this.action = action;
	}

	Build(){
		return Core.Node("div", {}, [
			Core.Node("main", {"id":"app","style":"margin:60px"}, [
				Core.Node('div', {class : "container-fluid"}, [
					Core.Node('div', {class : "loading"}, [], el => {}),
				], el => {})
			], el => {}),
			Core.BuildWidgets([this.action])[0],
		], el => {});
	}
}

```

#### Core Model
Core model is a sealed helper class providing the required functionalities essentioal to the framework. therefore, all of the functions provided by this class are static and are used throughout the rest of the framework by the framework and the user.

| Property | Type | Requrement | Functionality |
| ------ | ------ | ------ | ------ |
| Constructor() | Constructor | Optional | Does nothing |
| Node() | Static | Implemented | Builds a DOM Element. Used by Layouts and Widgets to build reusable components |
| App() | Static | Implemented | Builds the DOM Element wich will contain the part of the layout containing the body of the page. Only used in layouts to indicate where the body of a page is rendered |
| BuildWidgets() | Static | Implemented | Builds the child widgets contained inside another widget or a layout |
| async Delay() | Static | Implemented | Issues async delay |

---

Example bellow demonstrates how Core model is used to build the content of a layout which in turn contains widgets itself (this.action is another widget to be rendered inside this layout) :
```sh
import  LayoutModel  from "/* Path to framework files */Models/LayoutModel.js";
import  Core  from "/* Path to framework files */Models/Core.js";

export default class MinimalLayout extends LayoutModel {
	constructor(nav, action)
	{
		super();
		this.nav = nav;
		this.action = action;
	}

	Build(){
		return Core.Node("div", {}, [
			Core.Node("main", {"id":"app","style":"margin:60px"}, [
				Core.Node('div', {class : "container-fluid"}, [
					Core.Node('div', {class : "loading"}, [], el => {}),
				], el => {})
			], el => {}),
			Core.BuildWidgets([this.action])[0],
		], el => {});
	}
}

```

## Using Coer Node compiler

Core Node compiler is a tool for compiling html files to javascript widgets usable by the frame work.
This tool gives you the freedom to translate any custome html file into usable widget containing valid arguments ang childs you desire.
Also html files can be watched to be recompiled when any change is submitted to them.
To use the translator there are a few steps to take.
 - Put the html content you want to translate in a file
 - Specify the source path and the compilation path
 - In case watch is enabled the app will keep running and monitor the source files for change and will recompile the changed or added files automatically so you dont need to compile it everytime.

 ### Html type declaration

 CoreNodeCompiler can automatically put your arguments in the proper place after generating the javascript widget.
 But for it to be able to do that there a few things that it needs to know.
 take the example bellow : 
 ``` html
<default:widget:Card var:Image=#{""}# var:Href=#{"/"}# var:Content=#{""}# var:Footer=#{""}# widget[]:Badges>
    <constructor></constructor>
    <Build()>
        <div class="col-xl-4">
            <div class="card">
                <div class="position-relative">
                    <Badges/>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-10">
                            <p>#Content#</p>
                            <footer>
                                <p>#Footer#</p>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>            
    </Build()>
</default:widget:Card>
 ```

 ### Item Declaration

 To define a widget or a layout, a specific pattern needs to be satisfied.

 An item is defined by using the patter : 

 ``` html
 <[default:](widget/layout):Component_Name var:Variable_Name=#{Variable_Initial_Value}#>
    <constructor></constructor>
    <Build()></Build()>
</[default:](widget/layout):Component_Name>
 ```

 ### Default (Optional)

 Inside a file multiple modules and including widgets and layouts can be defined. however it is on the programmer to import them in the apprpriate way.
 This said if a file is to export a default module, the keyword _default_ can be used.

 ``` html
  
<!-- A default widget for the current file:  -->

 <default:widget:BillBoard>
    ...
</default:widget:BillBoard>
  
<!-- A non-default widget for the current file:  -->
 
 <widget:BillBoard>
    ...
</widget:BillBoard>
 ```

 ### Type (Required)

 A component either is a widget or a layout and it is declared with the keywords _widget_ or _layout_.


 ``` html
 
  <!-- A non-default widget for the current file:  -->

 <widget:BillBoard>
    ...
</widget:BillBoard>

 <!-- A default layout for the current file: -->
 
 <default:layout:Min>
    ...
</default:layout:Min>
 ```

 ## Arguments

 > WARNING : _Try to define arguments with lower case letters_

 To the compiler, anything placed inside hashtag signes are searched through the arguments to be substitued by the variable itself (exept when using \# which will be translated to #).

 The pattern to declar variables for components is :

 ``` html
 Type:Name=#{Initial_Value}# ---> Inital value is optional

```
 Variables are seprated by space and are places where "Variables" is palced

  ``` html
 <widget:widget1 Variables>
    ...
 </widget:widget1>

```

Variables can have these types :
 | Type | keyword |
 |------|---------|
 | simple variable like integers, strings, map , etc | var |
 | Widget | widget |
 | Widget List | widget[] |

Example :

 ``` html
<default:widget:Card var:Image=#{""}# var:Href=#{"/"}# var:Content=#{""}# var:Footer=#{""}# widget[]:Badges>
...
</default:widget:Card >
 ```
 The widget takes one argument of single type named "name" and a variable of named "childs" as Widget List type and we can see each one's description.

 ## Sub HTML Nodes

 Any html child contained by the widget is either a function or a variable and each one can have identifiers like "static" defined before them to make them global or bound to an instance.

  > WARNING : _Constructor is an exeption.
  If the constructor node exists, its content will be exactly populated inside the constructor of the compiler widget._

 To define a sub node the pattern is : 

 ```html
 <!-- Defining variable node -->
 <[identifier:]name>

  <!-- Defining function node -->
 <[identifier:]name() Variables>
 ```

 Notice that functions can have arguments too like the widget itself.
 It is worth nothing to say the format in which variables are defined are the same as the format for the widget itself.

 Bellow is an example of defining sub nodes:

 ```html
 <default:widget:Card var:Image=#{""}# var:Href=#{"/"}# var:Content=#{""}# var:Footer=#{""}# widget[]:Badges>
    <constructor>
    var n = "aaaaaaaa";
    this.name = n;
    </constructor>
    <test0>
        test0 text
    </test0>
    <static:test1()>
        test1 text
    </static:test1()>
    <test2()>
        <h1>test2 text</h1>
    </test2()>
    <static:test3() var:SomeText=#{"test3 text"}#>
        <h1>#SomeText#</h1>
    </static:test3()>
</default:widget:Card >
 ```

 Will compile to :

  ```javascript
  export default class Card extends WidgetModel {
      constructor(Href = "/")
	{
		super();
		this.Href = Href;
		var n = "aaaaaaaa";
		this.name = n;
	}

	test0 = "test0 text";

	static test1 = () => "test1 text";

	test2 = () => Core.Node("h1", {}, [
		"test2 text",
	], el => {});

	static test3 = (SomeText = "test3, text") => Core.Node("h1", {}, [
		SomeText,
	], el => {});
  }
 ```

 ## Building the actual content

 Building content for a widget or a layout is realy just defining the Build sub node and allocate html content to it as it can be done to any other sub node exept the consturctor.
 the compiler tales care of translating yout hrml into javascript as well.

 Bellow is an example of a sub node of Build:

 ```html
 <default:widget:Card var:Href=#{"/"}#>
    <constructor></constructor>
    <Build()>
        <div class="mb-4">
            <div class="card">
                <div class="position-relative">
                    <a href=#{this.Href}#>
                </div>
            </div>
        </div>            
    </Build()>
</default:widget:Card>
 ```

 Will compile to:
 ```javascript
 export default class Card extends WidgetModel {
	constructor(Href = "/")
	{
		super();
		this.Href = Href;
	}

	Build = () => Core.Node("div", {"class":"mb-4"}, [
		Core.Node("div", {"class":"card"}, [
			Core.Node("div", {"class":"position-relative"}, [
				Core.Node("a", {"href":this.Href}, [], el => {}),
			], el => {}),
		], el => {}),
	], el => {});
}
 ```

 ## Writing raw javascript

Anywhere inside a widget sub node you have the ability to write literal javascript and it will be substituted in the compiled code it just have to be inside #{}# as bellow : 

```html
    <Build()>
        <div class="col-xl- col-lg-4 col-12 col-sm-6 mb-4">
            <div class="card">
                <div class="position-relative">
                    <a href=#{this.Href}#>
                        #{...MyMap.map((element) => (<h1>element</h1>) )}#
                </div>
            </div>
        </div>            
    </Build()>
 ```

 Will compile to:
 ```javascript
 Build = () => Core.Node("div", {"class":"col-xl- col-lg-4 col-12 col-sm-6 mb-4"}, [
		Core.Node("div", {"class":"card"}, [
			Core.Node("div", {"class":"position-relative"}, [
				Core.Node("a", {"href":this.Href}, [
					...MyMap.map((element) => (Core.Node("h1", {}, [
						"element",
					], el => {})) ),
				], el => {}),
			], el => {}),
		], el => {}),
	], el => {});
 ```

 > WARNING : _When a DOM element is compiled to javascript it will be in the form of Core.Node(... [ Childs ]) and Childs will be children DOM elements.
 So when writing javascript inside a DOM element be that allocates more children to it in fact your code will be put inside the [] signs beside its other childs so you have to pay attention id your code is returning an array to put a ... before it to indicate that the compiler should append these elements to the rest of its children._

 ## Using arguments inside html content

 After defining a single or function type argument you need to put it's name inside two hash tag signs (#) where it's content is supposed to be in the html file.
 > In case you need to use the hash tag sign and it should not be interpreted as command just put a \ sigen before them (\# will be translated into # in the output file)
 but after defining a widget or widget list argument you need to define a html element by the argument name where it's content is supposed to be in the html file.

 ```html
 <default:widget:Card var:Href=#{"/"}# widget[]:children>
    <constructor></constructor>
    <Build()>
        <div class="col-xl- col-lg-4 col-12 col-sm-6 mb-4">
            <div class="card">
                <div class="position-relative">
                    <a href=#{this.Href}#></a>
                    <children/>
                </div>
            </div>
        </div>            
    </Build()>
</default:widget:Card>
  
 ```

  Will compile to: 
 ```javascript
import LayoutModel from "/CoreNode/Models/LayoutModel.js";
import WidgetModel from "/CoreNode/Models/WidgetModel.js";
import Core from "/CoreNode/Models/Core.js";

export default class Card extends WidgetModel {
	constructor(Href = "/", children)
	{
		super();
		this.Href = Href;
		this.children = children;
	}

	Build = () => Core.Node("div", {"class":"col-xl- col-lg-4 col-12 col-sm-6 mb-4"}, [
		Core.Node("div", {"class":"card"}, [
			Core.Node("div", {"class":"position-relative"}, [
				Core.Node("a", {"href":this.Href}, [], el => {}),
				...Core.BuildWidgets(this.children),
			], el => {}),
		], el => {}),
	], el => {});
}
 ```

 # Other uses for compiler

 When compiling a component, compiler looks for a widgets or layout tags but what happens if it is given a java script file as input?
 well it will just translate the html content in that file allowing users to write html inside their javascript files like bellow : 

 ```javascript
 function text(){
    return (<h1>hi</h1>);
}
 ```

 Will be compiled to : 
 ```javascript
 function text(){
    return (Core.Node("h1", {}, [
        "hi",
    ], el => {}));
}
 ```