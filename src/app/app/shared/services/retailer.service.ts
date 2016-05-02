import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response,RequestOptionsArgs,Headers,Http,Connection,RequestOptions} from 'angular2/http';

@Injectable()

export class RetailerService{
	private service_url:string;
	private error_msg:string;
	private is_loading:boolean;
	private retailer:any;
	constructor(
		private _http: Http,
		private _router: Router){

		this.is_loading = false;
	}

	getRetailer(retailerID:number){
		let data:string = 'retailerID='+retailerID;
		this._http.post('/testQueryRetailer',data,
			<RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/x-www-form-urlencoded'})
            }).subscribe(
            	response => {
            		this.is_loading = false;
            		if(response.json().success == 1){//success login
            			//set token to local storage(mobile)
            			//localStorage.setItem('accessToken', response.json().token);
            			console.log( response.json().res);
            			this.retailer = response.json().res;

            		}else{//failed login
            			this.error_msg = response.json().error;
            		}
            	},
            	error => {
            		console.log(error);
            		this.error_msg = 'failed connecting DB';
            	}
            );
       	return false;
	}

	getRetailerAll(){
		return this.retailer;
	}

	getError():string{
		return this.error_msg;
	}

	getLoadingState():boolean{
		return this.is_loading;
	}
}