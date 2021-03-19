# Core Node SPA Framework
## _Lightweight single page app framework_
This project is still in progress.
This file will be updated.

## Features

- The framework contains very few files
- Super easy to work with
- Completly opensource
- Easy to deploy

Core node SPA framework is a javascript based framework for implementing single page web applications
using widget like implementation while having the tools for barebone Javacsript HTML view generation.

> This project is still in development and any file might be subjected to changes
in the incoming updates and commits.
For deployment you can use any web server you favore.
Here for development phase we are using node.js as web host 
due to its fast deploy time suitable for development purposes.
we do not recommend using node.js web host for practical uses

## Installation

Node Core SPA Server requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server after cd-ing to the project folder.

```sh
cd NodeCoreSPA
npm init -y
npm i express
node server.js
```

To use Core Node Client side router copy the following tag into your html main page. For example :
> here Router.js is located at : wwwroot/static/js/Models/Router.js 

```sh
<script type="module" src="/static/js/Models/Router.js"></script>
```

## Router setup

To setup router and path mapping all you need to do is 
- Create your controllers
- Map your routes to the proper controller

The example bellow demonstrates how to setup a route for the index page:
 
```sh
import RootController from "/static/js/Controllers/Index.js";

var RouterParams = {
    Routes: [
        { Pattern: "/"                , Controller: RootController},
    ],
  };
```

## Base Models
Base Models are to be extended and used in the client side router to handle route
or new page request content creation or other feaures
> Base models are located under : static/js/Models

#### Controller Model

| Property | Functionality |
| ------ | ------ |
| Constructor | Saves the Parameters passed to the controller object |
| Bild (async) | Builds the corresponding page content |
| Render | Renders the page content |

Expample bellow demonstrates how to create a controller in a file
for example name " index.js ":
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

Expample bellow demonstrates how to create a card widget
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
                                this.CreateNode("fieldset","form-group", el => {}, this.BuildChilds()),
                            ]),
                        ]),
                    ]),
                ]),
            ]),
        ]);
    }
}
```