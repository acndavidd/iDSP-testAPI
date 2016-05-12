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
}