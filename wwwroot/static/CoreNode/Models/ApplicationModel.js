export default class RouterModel{
    constructor(RouterParams = {

        /* Function to be called on error */
        OnErrorCallBack : ErrorContent => {},
  
        /* Functiion to be called on navigation link selection */
        OnNavItemSelect : NavItem => {},
  
        /* Function to be called on navigation link unselection */
        OnNavItemUnelect : NavItem => {},
  
        /* Main layout builder function */
        LayoutBuilder : (LayoutParams = {}) => {},
  
        /* Route patterns hierarchy, the sooner defined, the higher the priority */
        Routes: [
            {},
        ],

        /* Index of the error route in the Routes objects */
        ErrorRouteIndex : 0,})
      {
        this.RouterParams = RouterParams;

        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function() {
              navigator.serviceWorker
                .register("/ServiceWorker.js")
                .then(res => console.log("service worker registered"))
                .catch(err => console.log("service worker not registered", err))
            })
        }

        this.RouterParams.LayoutBuilder().Render();

        /* On history button push */
        window.addEventListener("popstate", this.Router());

        document.addEventListener("DOMContentLoaded", () => {
            document.querySelectorAll("[data-link]").forEach(item => {
                item.addEventListener("click", e => {
                    e.preventDefault();
                    this.NavigateTo(e.target.href);
                });
            });

            document.body.addEventListener("click", e => {
                if (e.target.matches("[data-link]")) {
                    e.preventDefault();
                    this.NavigateTo(e.target.href);
                }
            });
        
            this.Router();
        });

        if (!('indexedDB' in window)) {
            console.log('Tour browser does not support IndexedDB');
        }
    }

    /*  */
    RouteParams = route => route.match(/(?<=\[)(.+?)(?=\])/g);

    ReloadScripts = () => {
      
        document.querySelectorAll("script").forEach(item => {
            let element = document.createElement("script");
            element.src = item.getAttribute("src");
            element.type = item.getAttribute("type");
            item.remove();
            document.head.appendChild(element);
        });
    };

    /* Gives the regular expression for validating the path with in compare to a route pattern */
    RegexForRoute = route => new RegExp("^" + route.replace(/\//g, "\\/").replace(/\[(.+?)\]/g, "(.+)") + "$");

    /* Normalizes the current path */
    NormalizePath = path => path.replace(/\/\//g,"/null/");

    NavigateTo = url => {
        history.pushState(null, null, url);
        this.Router();
    };

    /* Gets the string containing the url get params */
    PathParams = path => {

        /* Gets the part of the url containing url get parameters */
        let args = path.match(/(?<=\?)(.*)$/g);

        if(args !== null && args.length > 0){
            return args[0].split("&");
        }
        else{
            return [];
        }
    }

    Router = async () => {

        /* Hold the current route */
        let DestinationRoute;
    
        /* Used to pass paramters to View */
        let Params = {};
    
        /* Normalize url to prevent false interpretation */
        let NormalizedPath = this.NormalizePath(location.pathname);
    
        var BreakException = {};
    
        try {
    
            /* Examin each route and find the appropriate one */
            this.RouterParams.Routes.forEach(item => {
    
                /* Keep the Current route in this variable */
                let CurrentRoute = NormalizedPath.match(this.RegexForRoute(item.Pattern));
        
                if(CurrentRoute != null){
    
                    DestinationRoute = item;
    
                    this.PathParams(NormalizedPath).forEach(item => {
    
                        /* Splits key value pairs seprated by an '=' and puts the pair in Params*/
                        let args = item.split("=");
                        Params[args[0]] = args[1];
                    });
    
                    /* Happens id the rout template has arguments in them */
                    if(CurrentRoute.length > 1){
    
                        /* Gets the names of the parameters present in the route template */
                        let ParamNames = this.RouteParams(item.Pattern);
            
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
            if (e != BreakException) throw e;
        }
    
        /* If no route matches the url go to Error route */
        if(DestinationRoute == null){
            this.RouterParams.OnErrorCallBack("404 : Page not found");
            DestinationRoute = this.RouterParams.Routes[this.RouterParams.ErrorRouteIndex];
        }
    
        /*
        if(Partial)
        we can check if the view is partial then save the content of body in some variable and later if #app were not found we know that we should restore that
        */
    
        /* Executes the Builder */
        let ControllerInstance = await new DestinationRoute.Controller(() => {
            this.RouterParams.LayoutBuilder().Render();
            this.Router();
        }, this.RouterParams.LayoutBuilder, this.RouterParams.OnErrorCallBack, Params);

        await ControllerInstance.Init();
        await ControllerInstance.Render();
    
        document.querySelectorAll("[data-link][data-nav]").forEach(item => {
    
            // Uselect all 
            this.RouterParams.OnNavItemUnelect(item);
    
            // Find the selectedd nav-link and select it
            if(item.getAttribute("href").match(this.RegexForRoute(DestinationRoute.Pattern)) !== null)
                this.RouterParams.OnNavItemSelect(item);
        });
        
    };
}
