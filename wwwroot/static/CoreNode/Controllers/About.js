import ControllerModel from "/CoreNode/Models/ControllerModel.js"
import Container from "/CoreNode/Widgets/Container.js"
import Hierarchy from "/CoreNode/Widgets/Hierarchy.js"
import EditProfileCard from "/CoreNode/Widgets/EditProfileCard.js"
import Badge, {BadgeSettings} from "/CoreNode/Widgets/Badge.js"
import Row from "/CoreNode/Widgets/Row.js";
import ListingPost from "/CoreNode/Widgets/ListingPost.js"
import Button from "/CoreNode/Widgets/Button.js"

export default class extends ControllerModel{
    async Body(){
        return new Container("container-fluid", [
            new Row([
                new Hierarchy("Address",{
                    "Address 1" : "/",
                    "Address 2" : "/Second",
                },[
                    new Button("Remove"),
                ]),
            ]),
            new Container("row disable-text-selection", [
                new Container("col-12 col-lg-5 col-xl-4 col-left", [
                    new EditProfileCard("/Template/img/profiles/1.jpg", "describe me", "everything", [
                        "xp 1",
                        "xp 2",
                    ]),
                ]),
                new Container("col-12 col-lg-7 col-xl-8 col-right list", [
                    new Container("row listing-card-container", [
                        new ListingPost("/Template/img/products/marble-cake-thumb.jpg", "/MyPost/1", "hi", "adsasd", [
                            new Badge("badge", BadgeSettings.Posotions.TopLeftFirst, BadgeSettings.Themes.Theme1),
                        ]),
                        new ListingPost("/Template/img/products/marble-cake-thumb.jpg", "/MyPost/1", "hi", "adsasd", [
                            new Badge("badge", BadgeSettings.Posotions.TopLeftFirst, BadgeSettings.Themes.Theme1),
                        ]),
                        new ListingPost("/Template/img/products/marble-cake-thumb.jpg", "/MyPost/1", "hi", "adsasd", [
                            new Badge("badge", BadgeSettings.Posotions.TopLeftFirst, BadgeSettings.Themes.Theme1),
                        ]),
                        new ListingPost("/Template/img/products/marble-cake-thumb.jpg", "/MyPost/1", "hi", "adsasd", [
                            new Badge("badge", BadgeSettings.Posotions.TopLeftFirst, BadgeSettings.Themes.Theme1),
                        ]),
                        new ListingPost("/Template/img/products/marble-cake-thumb.jpg", "/MyPost/1", "hi", "adsasd", [
                            new Badge("badge", BadgeSettings.Posotions.TopLeftFirst, BadgeSettings.Themes.Theme1),
                        ]),
                        new ListingPost("/Template/img/products/marble-cake-thumb.jpg", "/MyPost/1", "hi", "adsasd", [
                            new Badge("badge", BadgeSettings.Posotions.TopLeftFirst, BadgeSettings.Themes.Theme1),
                        ]),
                    ]),
                ]),
            ]),
        ]);
    }
}