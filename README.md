
# Core Node SPA Framework

## _Lightweight single page app framework_

This project is still in progress.

This file will be updated.

  

## Features

  

- The framework contains very few files

- Super easy to work with

- Completely opensource

- Easy to deploy

  

Core node SPA framework is a JavaScript based framework for implementing single page web applications

using widget like implementation while having the tools for barebone JavaScript HTML view generation.

  

> This project is still in development and any file might be subjected to changes

in the incoming updates and commits.

For deployment you can use any web server you favor.

Here for development phase, we are using node.js as web host

due to its fast deploy time suitable for development purposes.

we do not recommend using node.js web host for practical uses

  

## Installation

  

Node Core SPA Server requires [Node.js](https://nodejs.org/) to run.

  

Install the dependencies and start the server after.

  

```sh

cd NodeCoreSPA

npm init -y

npm i express

node server.js

```

  

To use Core Node Client side router copy the following tag into your html main page. For example:

> here Router.js is located at : wwwroot/static/js/Models/Router.js

  

```sh

<script type="module" src="/static/js/Models/Router.js"></script>

```

  

## Router setup

To setup router and path mapping all you need to do is

- Create your controllers
- Map your routes to the proper controller
#### Route Parameters
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
import RootController from "/static/js/Controllers/Index.js";

var RouterParams = {
    Routes: [
        { Pattern: "/" , Controller: RootController}, // <------- Home Controller and path
        { Pattern: "/Item/Details/[id]" , Controller: ItemController},
    ],
};
```

## Base Models

Base Models are to be extended and used in the client side router to handle route

or new page request content creation or other features

> Base models are located under : static/js/Models

#### Controller Model

| Property | Functionality |
| ------ | ------ |
| Constructor | Saves the Parameters passed to the controller object |
| Bild (async) | Builds the corresponding page content |
| Render | Renders the page content |

Example bellow demonstrates how to create a controller in a file

for example, named " index.js ":

> This controller is called upon visit of the path specified

by the RouterParams object

  

```sh
import ControllerModel from "../Models/ControllerModel.js"
import Card from "../Widgets/Card.js"

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
import WidgetModel from "../Models/WidgetModel.js"

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
