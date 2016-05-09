import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response,RequestOptionsArgs,Headers,Http,Connection,RequestOptions} from 'angular2/http';

@Injectable()

export class RetailerService{
	private vServiceUrl:string;
	private vErrorMsg:string;
	private vIsLoading:boolean;
	private vRetailer:any;
	constructor(
		private _http: Http,
		private _router: Router){

		this.vIsLoading = false;
	}

	getRetailer(pRetailerID:number){
		let vData:string = 'retailerID='+pRetailerID;
		this._http.post('/testQueryRetailer',vData,
			<RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/x-www-form-urlencoded'})
            }).subscribe(
            	response => {
            		this.vIsLoading = false;
            		if(response.json().success == 1){//success login
            			//set token to local storage(mobile)
            			//localStorage.setItem('accessToken', response.json().token);
            			console.log( response.json().res);
            			this.vRetailer = response.json().res;

            		}else{//failed login
            			this.vErrorMsg = response.json().error;
            		}
            	},
            	error => {
            		console.log(error);
            		this.vErrorMsg = 'failed connecting DB';
            	}
            );
       	return false;
	}

	getRetailerAll(){
		return this.vRetailer;
	}

	getError():string{
		return this.vErrorMsg;
	}

	getLoadingState():boolean{
		return this.vIsLoading;
	}
}