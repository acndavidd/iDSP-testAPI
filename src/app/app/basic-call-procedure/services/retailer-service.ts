import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response,RequestOptionsArgs,Headers,Http,Connection,RequestOptions} from 'angular2/http';

@Injectable()

export class RetailerService{
	private service_url:string;
	private error_msg:string;
	private is_loading:boolean;

	constructor(
		private _http: Http,
		private _router: Router){

		this.is_loading = false;
	}

	//To query list of retailer that will be visited pertoday for user that login
	queryTodayCallPlan(){
		this.is_loading = true;
 
		//To-Do : Query User ID or Username
		let vUserId:string = '1';
		let vCurrentDate = new Date();

		console.log(vCurrentDate);

		//Hit API with parameter user_id and current date
		let data:string = 'user='+vUserId+'&date='+vCurrentDate;
		this._http.post('/queryCallPlan',data,
			<RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/x-www-form-urlencoded'})
            }).subscribe(
            	response => {
            		this.is_loading = false;
            		if(response.json().success == 1){//success login
            			//Pass back the call plan result
            			return response.json().resultCallPlan;
            		}else{//failed login
            			this.error_msg = response.json().error;
            		}
            	},
            	error => {
            		console.log(error);
            		this.error_msg = 'Failed connecting to Retailer service';
            	}
            );
       	return '';
	}



	getError():string{
		return this.error_msg;
	}

	getLoadingState():boolean{
		return this.is_loading;
	}
}