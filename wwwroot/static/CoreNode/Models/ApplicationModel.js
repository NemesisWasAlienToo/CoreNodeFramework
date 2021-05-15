export default class ApplicationModel{
    constructor(RouterParams = {

        /* Function to be called on error */
        OnErrorCallBack : ErrorContent => {},
  
        /* Functiion to be called on navigation link selection */
        OnNavItemSelect : NavItem => {},
  
        /* Function to be called on navigation link unselection */
        OnNavItemUnelect : NavItem => {},
  
        /* Main layout builder function */
        LayoutBuilder : (LayoutParams = {}) => {},

        /* Initiates UI events */
        UIInitializer : () => {},

        /* Forces layout to be rendered everytime */
        ForceLayoutBuild : false,
  
        /* Route patterns hierarchy, the sooner defined, the higher the priority */
        Routes: [
            {},
        ],

        /* Index of the error route in the Routes objects */
        ErrorRouteIndex : 0,})
      {
        this.RouterParams = RouterParams;

        if ("serviceWorker" in navigator && window.DEV == undefined) {
            window.addEventListener("load", () => {
              navigator.serviceWorker
                .register("/ServiceWorker.js")
                .then(res => console.log("service worker registered"))
                .catch(err => console.log("service worker not registered", err))
            })
        }        

        console.log(`
 ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝
██║     ██║   ██║██████╔╝█████╗  
██║     ██║   ██║██╔══██╗██╔══╝  
╚██████╗╚██████╔╝██║  ██║███████╗
 ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
 
 ███╗   ██╗ ██████╗ ██████╗ ███████╗
 ████╗  ██║██╔═══██╗██╔══██╗██╔════╝
 ██╔██╗ ██║██║   ██║██║  ██║█████╗  
 ██║╚██╗██║██║   ██║██║  ██║██╔══╝  
 ██║ ╚████║╚██████╔╝██████╔╝███████╗
 ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝
`);

        if (!('indexedDB' in window)) {
            console.log('Tour browser does not support IndexedDB');
        }

        this.PreRoute = null;

        /* On history button push */
        window.addEventListener("popstate", this.Router);

        this.Router();
    }

    /*  */
    static RouteParams = route => route.match(/(?<=\[)(.+?)(?=\])/g);

    static ReloadScripts = () => {
      
        document.querySelectorAll("script").forEach(item => {
            let element = document.createElement("script");
            element.src = item.getAttribute("src");
            element.type = item.getAttribute("type");
            item.remove();
            document.head.appendChild(element);
        });
    };

    /* Gives the regular expression for validating the path with in compare to a route pattern */
    static RegexForRoute = route => new RegExp("^" + route.replace(/\//g, "\\/").replace(/\[(.+?)\]/g, "(.+)") + "$");

    /* Normalizes the current path */
    static NormalizePath = path => path.replace(/\/\//g,"/null/");

    NavigateTo = url => {
        history.pushState(null, null, url);
        this.Router();
    };

    /* Gets the string containing the url get params */
    static PathParams = path => {

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

        /* Initialize layout builder*/
        let LayoutBuilder = () => {};
    
        /* Normalize url to prevent false interpretation */
        let NormalizedPath = ApplicationModel.NormalizePath(location.pathname);
    
        var BreakException = {};
    
        try {
    
            /* Examin each route and find the appropriate one */
            this.RouterParams.Routes.forEach(item => {
    
                /* Keep the Current route in this variable */
                let CurrentRoute = NormalizedPath.match(ApplicationModel.RegexForRoute(item.Pattern));
        
                if(CurrentRoute != null){
    
                    DestinationRoute = item;
    
                    ApplicationModel.PathParams(NormalizedPath).forEach(item => {
    
                        /* Splits key value pairs seprated by an '=' and puts the pair in Params*/
                        let args = item.split("=");
                        Params[args[0]] = args[1];
                    });
    
                    /* Happens id the rout template has arguments in them */
                    if(CurrentRoute.length > 1)
                    {
    
                        /* Gets the names of the parameters present in the route template */
                        let ParamNames = ApplicationModel.RouteParams(item.Pattern);
            
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

        if(this.PreRoute == DestinationRoute){
            return;
        }
    
        /* If no route matches the url go to Error route */
        if(DestinationRoute == null){
            this.RouterParams.OnErrorCallBack("404 : Page not found");
            DestinationRoute = this.RouterParams.Routes[this.RouterParams.ErrorRouteIndex];
        }

        if(DestinationRoute.LayoutBuilder == null || DestinationRoute.LayoutBuilder == undefined){
            LayoutBuilder = this.RouterParams.LayoutBuilder;
        }
        else
        {
            LayoutBuilder = DestinationRoute.LayoutBuilder;
        }

        /* Executes the Builder */
        let ControllerInstance = new DestinationRoute.Controller(LayoutBuilder, this.RouterParams.OnErrorCallBack, Params);  
        
        /**/
        let Layout = null;
        let LayoutRedraw = false;

        if(this.PreRoute == null || this.PreRoute.LayoutBuilder != DestinationRoute.LayoutBuilder || this.RouterParams.ForceLayoutBuild){
            Layout = LayoutBuilder();
            await Layout.Init();
            Layout.Render();

            LayoutRedraw = true;
        }

        ControllerInstance.LayoutRedraw = LayoutRedraw;

        /**/
        this.PreRoute = DestinationRoute;

        /**/
        await ControllerInstance.Init();

        /**/
        await ControllerInstance.Render();

        /**/
        await ControllerInstance.Final();

        /**/
        if(LayoutRedraw){
            await Layout.Final();
        }
    
        document.querySelectorAll("[data-link][data-nav]").forEach(item => {
    
            // Uselect all 
            this.RouterParams.OnNavItemUnelect(item);
    
            // Find the selected nav-link and select it
            if(item.getAttribute("href").match(ApplicationModel.RegexForRoute(DestinationRoute.Pattern)) !== null)
                this.RouterParams.OnNavItemSelect(item);
        });

        this.RouterParams.UIInitializer(LayoutRedraw);

        document.querySelectorAll("[data-link]").forEach(element => {
            element.onclick = e => {
                    e.preventDefault();
                    this.NavigateTo(element.href);
            };
        });
        
    };
}
