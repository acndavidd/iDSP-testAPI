import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response,RequestOptionsArgs,Headers,Http,Connection,RequestOptions} from 'angular2/http';

@Injectable()
export class AccountsReceivablesService{
	private vServiceUrl:string;
	private vErrorMsg:string;
	private vIsLoading:boolean;

	constructor(
		private _http: Http,
		private _router: Router){

		this.vIsLoading = false;
	}

	searchRetailer(){
		console.log('test onkeypress masuk service');
		return;
	}

	getError():string{
		return this.vErrorMsg;
	}

	getLoadingState():boolean{
		return this.vIsLoading;
	}

	getTotalReceivable(){
		return '35,000';
	}

	getAllRetailer(){
	   return [
	    {"routeID": 1, "retailerName": "Bird Cell", "MIN": "999999902","accReceivables": 3000},
	    {"routeID": 2, "retailerName": "Rose Cell", "MIN": "999999903","accReceivables": 2000},
	    {"routeID": 3, "retailerName": "ABC Cell", "MIN": "999999904","accReceivables": 1400},
	    {"routeID": 4, "retailerName": "Lova Cell", "MIN": "999999905","accReceivables": 6000},
	    {"routeID": 5, "retailerName": "Mar Cell", "MIN": "999999906","accReceivables": 1000}
	  ];
	}
}