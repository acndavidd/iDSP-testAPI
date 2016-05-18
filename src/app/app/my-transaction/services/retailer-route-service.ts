import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response,RequestOptionsArgs,Headers,Http,Connection,RequestOptions} from 'angular2/http';

@Injectable()

export class RetailerRouteService{
	private vServiceUrl:string;
	private vErrorMsg:string;
	private vIsLoading:boolean;

	constructor(
		private _http: Http,
		private _router: Router){

		this.vIsLoading = false;
	}

	//To query Route for Selected Day 
	queryRetailerRoute(pSelectedDay){
		console.log("Start hit login service to Query Retailer Route");
		//Get Current Login User
		let vData = {
			salesPerson : 'DSP01',
			day : pSelectedDay
		};

		var vSalesRoute;
		//Hit Api with selectedDate and Login user
		return this._http.post('/getSalesRoute',JSON.stringify(vData));

		//Sample Hardcoded
		/*
		vSalesRoute = [
			{
				"retailer_id": "1",
				"route": [{RouteDay : [{sequence: 1}]}],
				"retailer_name": "Gloria Cell",
				"retailer_address": "Barangka Dr. Mandaluyong",
				"owner_name": "Ms. Gloria"
			},
			{
				"retailer_id": "2",
				"route": [{RouteDay : [{sequence: 2}]}],
				"retailer_name": "Bird Cell",
				"retailer_address": "Barangka Dr. Sutrisno",
				"owner_name": "Mr. Jaja"
			},
			{
				"retailer_id": "3",
				"route": [{RouteDay : [{sequence: null}]}],
				"retailer_name": "Rose Cell",
				"retailer_address": "Matalang 56 Barangka",
				"owner_name": "Ms. Rose"
			}];
		*/
		//console.log(vSalesRoute);	
		//return vSalesRoute;
	}

	getError():string{
		return this.vErrorMsg;
	}

	getLoadingState():boolean{
		return this.vIsLoading;
	}
}