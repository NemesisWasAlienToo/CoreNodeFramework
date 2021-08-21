/**/

import  ControllerModel  from "/CoreNode/Models/ControllerModel.js";
import  Button  from "/CoreNode/Widgets/Button.js";
import  Container  from "/CoreNode/Widgets/Container.js";
import  Row  from "/CoreNode/Widgets/Row.js";
import  Card  from "/CoreNode/Widgets/Card.js";
import  Hierarchy  from "/CoreNode/Widgets/Hierarchy.js";
import  ListingCard  from "/CoreNode/Widgets/ListingCard.js";
import  Badge, {BadgeSettings}  from "/CoreNode/Widgets/Badge.js";
import  SearchFilter  from "/CoreNode/Widgets/SearchFilter.js";

export default class extends ControllerModel{
    async Body(){
        return new Container("container-fluid disable-text-selection", [
            new Hierarchy("Address", {
                "Address 1" : "/",
                "Address 2" : "/Second",
                "Address 3" : "/Second",
            }, [], true, {
                title : "More options",
                right : [],
                left : [
                    new Container("d-block d-md-inline-block",[
                        new SearchFilter("Search here"),
                    ]),
                ],
            }),
            new Row([
                new Container("col-12 col-lg-5 col-xl-4 col-left", [
                    new Card("Buttons", 12, 4, false, [
                        new Button("Click me","btn btn-primary mb-1"),
                    ]),
                ]),
                new Container("col-12 col-lg-7 col-xl-8 col-right", [
                    new Container("row list disable-text-selection", [
                        new ListingCard("/Template/img/products/marble-cake-thumb.jpg", "/Doctor", "hi", "adsasd", "ssssss", [
                            new Badge("badge", BadgeSettings.Posotions.TopLeftFirst, BadgeSettings.Themes.Theme1),
                        ]),
                        new ListingCard("/Template/img/products/marble-cake-thumb.jpg", "/Doctor", "hi", "adsasd", "ssssss", [
                            new Badge("badge", BadgeSettings.Posotions.TopLeftFirst, BadgeSettings.Themes.Theme1),
                        ]),
                        new ListingCard("/Template/img/products/marble-cake-thumb.jpg", "/Doctor", "hi", "adsasd", "ssssss", [
                            new Badge("badge", BadgeSettings.Posotions.TopLeftFirst, BadgeSettings.Themes.Theme1),
                        ]),
                        new ListingCard("/Template/img/products/marble-cake-thumb.jpg", "/Doctor", "hi", "adsasd", "ssssss", [
                            new Badge("badge", BadgeSettings.Posotions.TopLeftFirst, BadgeSettings.Themes.Theme1),
                        ]),
                        new ListingCard("/Template/img/products/marble-cake-thumb.jpg", "/Doctor", "hi", "adsasd", "ssssss", [
                            new Badge("badge", BadgeSettings.Posotions.TopLeftFirst, BadgeSettings.Themes.Theme1),
                        ]),
                        new ListingCard("/Template/img/products/marble-cake-thumb.jpg", "/Doctor", "hi", "adsasd", "ssssss", [
                            new Badge("badge", BadgeSettings.Posotions.TopLeftFirst, BadgeSettings.Themes.Theme1),
                        ]),
                    ]),
                ]),
            ]),
        ]);
    }
}