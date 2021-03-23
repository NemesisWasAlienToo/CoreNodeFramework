import WidgetModel from "../Models/WidgetModel.js"

export default class extends WidgetModel {

    constructor(Title = "", Helper = "" , Childs = []){
        super();
        this.Title = Title;
        this.Helper = Helper;
        this.Childs = Childs;
    }

    static Fields = () => {
        Title : "Card title";
        Helper : "Helper text bellow the title";
        Childs : "Inner widgets" 
    };

    Build(){
        return WidgetModel.CreateNode("div","col-xl-4 col-lg-6 col-md-12", el => {}, [
            WidgetModel.CreateNode("div","card", el => {}, [
                WidgetModel.CreateNode("div","card-header", el => {}, [
                    WidgetModel.CreateNode("h4","card-title", el => { el.innerText = WidgetModel.Title; }),
                ]),
                WidgetModel.CreateNode("div","card-block", el => {}, [
                    WidgetModel.CreateNode("div","card-body", el => {}, [
                        WidgetModel.CreateNode("fieldset","form-group", el => {}, this.BuildChilds()),
                    ]),
                ]),
            ]),
        ]);
    }
}

/*
<section id="form-repeater">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title" id="repeat-form">فرم های تکراری</h4>
                    <a class="heading-elements-toggle">
                        <i class="la la-ellipsis-h font-medium-3"></i>
                    </a>
                    <div class="heading-elements">
                        <ul class="list-inline mb-0">
                            <li>
                                <a data-action="collapse">
                                    <i class="ft-minus"></i>
                                </a>
                            </li>
                            <li>
                                <a data-action="reload">
                                    <i class="ft-rotate-cw"></i>
                                </a>
                            </li>
                            <li>
                                <a data-action="expand">
                                    <i class="ft-maximize"></i>
                                </a>
                            </li>
                            <li>
                                <a data-action="close">
                                    <i class="ft-x"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="card-content collapse show" style="">
                    <div class="card-body">
                        <div class="repeater-default">
                            <div data-repeater-list="car">
                                
                            <div data-repeater-item="" style="">
                                    <form class="form row">
                                        <div class="form-group mb-1 col-sm-12 col-md-2">
                                            <label for="name">نام</label>
                                            <br>
                                            <input type="Text" class="form-control" id="name" placeholder="نام">
                                        </div>
                                        <div class="form-group mb-1 col-sm-12 col-md-2">
                                            <label for="desig">شرح</label>
                                            <br>
                                            <input type="Text" class="form-control" id="desig" placeholder="شرح">
                                        </div>
                                        <div class="form-group mb-1 col-sm-12 col-md-2">
                                            <label for="email-addr">ایمیل</label>
                                            <br>
                                            <input type="email" class="form-control" id="email-addr" placeholder="ایمیل را وارد کنید">
                                        </div>
                                        <div class="skin skin-flat form-group mb-1 col-sm-12 col-md-2">
                                            <label for="tel-input">تماس</label>
                                            <br>
                                            <input class="form-control" type="tel" value="1-(999)-999-9999" id="tel-input">
                                        </div>
                                        <div class="form-group mb-1 col-sm-12 col-md-2">
                                            <label for="priority">اولویت</label>
                                            <br>
                                            <select class="form-control" id="priority">
                                                <option>-انتخاب کنید-</option>
                                                <option>کم</option>
                                                <option>زیاد</option>
                                                <option>متوسط</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-sm-12 col-md-2 text-center mt-2">
                                            <button type="button" class="btn btn-danger" data-repeater-delete="">
                                                <i class="ft-x"></i> </button>
                                        </div>
                                    </form>
                                    <hr>
                                </div></div>
                            <div class="form-group overflow-hidden">
                                <div class="col-12">
                                    <button data-repeater-create="" class="btn btn-primary">
                                        <i class="ft-plus"></i> افزودن
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
*/