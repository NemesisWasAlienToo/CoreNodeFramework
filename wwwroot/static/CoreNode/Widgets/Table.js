import WidgetModel from "../Models/WidgetModel.js"

export default class extends WidgetModel {
	constructor(headers = [], data = [])
	{
		super();
		this.headers = headers;
		this.data = data;
	}

	static Fields = () => { 
		headers : "Tabel headers";
		data : "Table data";
	}

	Build(){	
		return WidgetModel.CreateNode("table"," table", el => {}, [
			WidgetModel.CreateNode("thead"," ", el => {}, [
				WidgetModel.CreateNode("tr"," ", el => {}, this.headers.map(header => WidgetModel.CreateNode("th"," ", el => {
                    el.innerText = header;
                },[]))),
			]),
			WidgetModel.CreateNode("tbody"," ", el => {}, this.data.map(
                tr => WidgetModel.CreateNode("tr", "", el => {}, this.headers.map(
                    hr => WidgetModel.CreateNode("td"," ", el => { el.innerText = tr[hr] }, [])
            	))),
			)
        ]);
	}
}
