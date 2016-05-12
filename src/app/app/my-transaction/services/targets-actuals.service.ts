import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response,RequestOptionsArgs,Headers,Http,Connection,RequestOptions} from 'angular2/http';

@Injectable()

export class TargetsActualsService{
	private vServiceUrl:string;
	private vErrorMsg:string;
	private vIsLoading:boolean;
	private vBrand;

	constructor(
		private _http: Http,
		private _router: Router){

		this.vIsLoading = false;
		this.queryBrand();

	}

	
	queryBrand(){
		this.vIsLoading = true;
 
		
		let vUserId:string = '1';
		let vCurrentDate = new Date();

		console.log(vCurrentDate);

		this._http.get('/targetsActuals',
			<RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/x-www-form-urlencoded'})
            }).subscribe(
            	response => {
            		this.vIsLoading = false;
            		console.log(response.json());
            		if(response.json().status == "Success"){
            			this.vBrand = response.json().brandList;
            		}else{
            			this.vErrorMsg = response.json().error;
            		}
            	},
            	error => {
            		console.log(error);
            		this.vErrorMsg = 'Failed connecting to Retailer service';
            	}
            );
	}

	getBrand(){
		return this.vBrand;
	}



	getError():string{
		return this.vErrorMsg;
	}

	getLoadingState():boolean{
		return this.vIsLoading;
	}
}