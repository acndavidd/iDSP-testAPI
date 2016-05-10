import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response,RequestOptionsArgs,Headers,Http,Connection,RequestOptions} from 'angular2/http';

@Injectable()

export class AccountReceivablesService{
	private vServiceUrl:string;
	private vErrorMsg:string;
	private vIsLoading:boolean;
	private vListRetailer: retailerList[];
	private vRetailerResult:string;

	constructor(
		private _http: Http,
		private _router: Router){

		this.vIsLoading = false;
	}

	//to Search name of Retailer
	searchRetailer():string{
		return this.vRetailerResult;
	}



	getError():string{
		return this.vErrorMsg;
	}

	getLoadingState():boolean{
		return this.vIsLoading;
	}
}