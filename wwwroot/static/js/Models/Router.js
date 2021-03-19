import RootController from "/static/js/Controllers/Index.js";
import ErrorController from "/static/js/Controllers/Error.js";

var RouterParams = {

    /* Functiion to be called on error */
    OnErrorCallBack : ErrorContent => { alert(ErrorContent); },

    /* Functiion to be called on navigation link selection */
    OnNavItemSelect : NavItem => {
      NavItem.parentNode.classList.add("active");
    },

    /* Functiion to be called on navigation link unselection */
    OnNavItemUnelect : NavItem => {
        NavItem.parentNode.classList.remove("active");
      },

    /* Route patterns hierarchy, the sooner defined, the higher the priority */
    Routes: [
        { Pattern: "/"                , Controller: RootController  },
        { Pattern: "/Error/[Content]" , Controller: ErrorController },
    ],
  };

const InitRouter = (OnErrorCallBack, Routes) => {
    RouterParams.OnErrorCallBack = OnErrorCallBack;
    RouterParams.Routes = Routes;
}

/* Navigates to a target page */
const NavigateTo = url => {
    history.pushState(null, null, url);
    Router();
};

/* Gets the parameters specified in the route pattern */
const RouteParams = route => route.match(/(?<=\[)(.+?)(?=\])/g);

/* Gets the string containing the url get params */
const PathParams = path => {

    /* Gets the part of the url containing url get parameters */
    let args = path.match(/(?<=\?)(.*)$/g);

    if(args !== null && args.length > 0){
        return args[0].split("&");
    }
    else{
        return [];
    }
}

/* Gives the regular expression for validating the path with in compare to a route pattern */
const RegexForRoute = route => new RegExp("^" + route.replace(/\//g, "\\/").replace(/\[(.+?)\]/g, "(.+)") + "$");

/* Normalizes the current path */
const NormalizePath = path => path.replace(/\/\//g,"/null/");

/* Loads the app content */
const Router = async () => {

    /* Hold the current route */
    let DestinationRoute;

    /* Used to pass paramters to View */
    let Params = {};

    /* Normalize url to prevent false interpretation */
    let NormalizedPath = NormalizePath(location.pathname);

    var BreakException = {};

    try {

        /* Examin each route and find the appropriate one */
        RouterParams.Routes.forEach(item => {

            /* Keep the Current route in this variable */
            let CurrentRoute = NormalizedPath.match(RegexForRoute(item.Pattern));
    
            if(CurrentRoute != null){

                DestinationRoute = item;

                PathParams(NormalizedPath).forEach(item => {

                    /* Splits key value pairs seprated by an '=' and puts the pair in Params*/
                    let args = item.split("=");
                    Params[args[0]] = args[1];
                });

                /* Happens id the rout template has arguments in them */
                if(CurrentRoute.length > 1){

                    /* Gets the names of the parameters present in the route template */
                    let ParamNames = RouteParams(item.Pattern);
        
                    if(ParamNames != null){
        
                        /* Prepares the Parameters for the view */
                        ParamNames.forEach((element,index) => {
                            Params[element] = CurrentRoute[index + 1];
                        });
                    }

                }

                /* Acts as a break */
                throw BreakException;
            }
        });
    }
    catch (e) {
        if (e !== BreakException) throw e;
    }

    /* If no route matches the url go to /Error */
    if(DestinationRoute == null){
        DestinationRoute = RouterParams.Routes.find(item => item.Pattern == "/Error/[Content]");
    }

    /*
    if(Partial)
    we can check if the view is partial then save the content of body in some variable and later if #app were not found we know that we should restore that
    */
    

    /* Executes the Builder */
    await new DestinationRoute.Controller(Params).Build();

    document.querySelectorAll("[data-link][data-nav]").forEach(item => {

        // Uselect all 
        RouterParams.OnNavItemUnelect(item);

        // Find the selectedd nav-link and select it
        if(item.getAttribute("href").match(RegexForRoute(DestinationRoute.Pattern)) !== null)
            RouterParams.OnNavItemSelect(item);
    });
    
};

const ReloadScripts = () => {
      
    document.querySelectorAll("script").forEach(item => {
        let element = document.createElement("script");
        element.src = item.getAttribute("src");
        element.type = item.getAttribute("type");
        item.remove();
        document.body.appendChild(element);
    });
  };

/* On history button push */
window.addEventListener("popstate", Router);

/* On link click */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-link]").forEach(item => {
        item.addEventListener("click", e => {
            e.preventDefault();
            NavigateTo(e.target.href);
        });
    });

    Router();
});

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            NavigateTo(e.target.href);
        }
    });

    Router();
});