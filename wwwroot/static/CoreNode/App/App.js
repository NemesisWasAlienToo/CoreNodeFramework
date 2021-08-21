/* Framework imports */
import ApplicationModel from "/CoreNode/Models/ApplicationModel.js"

/* Controller imports */
import  Index  from "/CoreNode/Controllers/Index.js";
import  Second  from "/CoreNode/Controllers/Second.js";
import  Doctor  from "/CoreNode/Controllers/Doctor.js";
import  About  from "/CoreNode/Controllers/About.js";
import  Post from "/CoreNode/Controllers/Post.js";
import  MyPost  from "/CoreNode/Controllers/MyPost.js";

/* Layout imports */
import  Layout  from "/CoreNode/Layouts/Layout.js";
import  MinLayout  from "/CoreNode/Layouts/MinLayout.js";

/* Widget imports */
import  Nav  from "/CoreNode/Widgets/Nav.js";
import  Search  from "/CoreNode/Widgets/Search.js";
import  NavAction  from "/CoreNode/Widgets/NavAction.js";
import  Notification  from "/CoreNode/Widgets/Notification.js";
import  Footer  from "/CoreNode/Widgets/Footer.js";
import  FooterLink  from "/CoreNode/Widgets/FooterLink.js";
import  Menu  from "/CoreNode/Widgets/Menu.js";
import  MenuPage  from "/CoreNode/Widgets/MenuPage.js";
import  MenuGroup  from "/CoreNode/Widgets/MenuGroup.js";
import  MenuItem  from "/CoreNode/Widgets/MenuItem.js";
import  MenuAction  from "/CoreNode/Widgets/MenuAction.js";
import  Action  from "/CoreNode/Widgets/Action.js";
import  ActionGroup  from "/CoreNode/Widgets/ActionGroup.js";
import EditPost from "/CoreNode/Controllers/EditPost.js";

/* Tell the framework we are in development phase */
window.DEV = true;

/* Global functions */

let initialize = (LayoutRedraw) => {
    if(false){
        $("body").css({
            opacity: 0
        });
    }
    else{
        $("#app").css({
            opacity: 0
        });
    }
    document.body.className = localStorage.getItem("dore-direction") + " " + localStorage.getItem("dore-radius") + " rounded menu-default";
    $("#app").dore();
    if(false){
        $("body").animate({
            opacity: 1
        }, 500);
    }
    else{
        $("#app").animate({
            opacity: 1
        }, 500);
    }
};

/* Global layouts */

let DefaultLayout = (CurUrl) => new Layout(
    new Nav(new Search("Search here", ""), "/", [
        new NavAction("/", "iconsminds-file", "خالی")
    ], 1, [
        new Notification("/Template/img/profiles/l-2.jpg","/","اعلان 1")
    ], "/Template/img/profiles/l-1.jpg", [
        {"menu 1":"/"}
    ]),
    new Menu([
        new MenuItem("داشبورد", "dashboards", true,"iconsminds-shop-4"),
        new MenuItem("کاربر", "user", false, "iconsminds-digital-drawing"),
        new MenuItem("مراجعین", "patients", false, "iconsminds-digital-drawing"),
        new MenuItem("تحلیل", "analytic", false, "iconsminds-digital-drawing"),
    ], [
        new MenuPage("dashboards", [
            new MenuAction(true, "/Pannel/Profile", "simple-icon-rocket", "پروفایل"),
            new MenuAction(false, "/Pannel", "simple-icon-pie-chart", "پرونده ها"),
        ]),
        new MenuPage("user", [
            new MenuAction(false, "/Other", "simple-icon-user-following", "پروفایل"),
        ]),
        new MenuPage("patients", [
            new MenuAction(true, "/aaa", "simple-icon-rocket", "نوبت های امروز"),
            new MenuAction(false, "/bbbb", "simple-icon-pie-chart", "پرونده ها"),
        ]),
    ]),
    new Footer("پا ورقی", [
        new FooterLink("خانه", "/"),
        new FooterLink("دوم", "/Pannel"),
    ])
);

let MinimalLayout = () => new MinLayout(
    new Nav(new Search("Search here", ""), "/", [
        new NavAction("/", "iconsminds-file", "خالی")
    ], 1, [
        new Notification("/Template/img/profiles/l-2.jpg","/","اعلان 1")
    ], "/Template/img/profiles/l-1.jpg", [
        {"menu 1":"/"}
    ]),
    new ActionGroup([
        new Action("", () => {window.history.back()},"simple-icon-arrow-left-circle", "Back"),
        new Action("/", null, "simple-icon-arrow-left-circle","Home"),
        new Action("/Pannel", null, "simple-icon-arrow-left-circle","Pannel"),
    ]),
);

/* Application */

var Application = new ApplicationModel({
    
    /* Function to be called on error */
    OnErrorCallBack : ErrorContent => { alert(ErrorContent); },

    /* Function to be called on navigation link selection */
    OnNavItemSelect : NavItem => {
        NavItem.parentNode.classList.add("active");
        let Group = NavItem.parentNode.parentNode.id;
        document.querySelector(`a[href='#${Group}']`).parentNode.classList.add("active");
    },

    /* Function to be called on navigation link unselection */
    OnNavItemUnelect : NavItem => {
        NavItem.parentNode.classList.remove("active");
    },

    /* Main layout builder function */
    LayoutBuilder : MinimalLayout,

    /* Initiates UI events */
    UIInitializer : initialize,

    /* Forces layout to be rendered everytime */
    ForceLayoutBuild : true,

    /* Route patterns hierarchy, the sooner defined, the higher the priority
    and the sooner it is captured and thus occures first */
    Routes: [
        { Pattern: "/"      ,         Controller: Index  },
        { Pattern: "/Doctor",         Controller: Doctor },
        { Pattern: "/Post/[id]",      Controller: Post },
        { Pattern: "/Pannel",         Controller: Second   , LayoutBuilder: DefaultLayout },
        { Pattern: "/Pannel/Profile", Controller: About    , LayoutBuilder: DefaultLayout },
        { Pattern: "/MyPost/[id]",    Controller: MyPost   , LayoutBuilder: DefaultLayout },
        { Pattern: "/EditPost/[id]",  Controller: EditPost , LayoutBuilder: DefaultLayout },
    ],

    /* Index of the error route in the Routes objects */
    ErrorRouteIndex : 0,
});