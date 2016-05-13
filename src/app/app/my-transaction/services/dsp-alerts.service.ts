import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response,RequestOptionsArgs,Headers,Http,Connection,RequestOptions} from 'angular2/http';

@Injectable()

export class DSPAlertsService{
	private vUrl;
	constructor(
		private _http: Http,
		private _router: Router){
		this.vUrl = '';
	}

	getDSPAlert(){
		return this._http.get('/getRetailerAlert',null);
	}
}