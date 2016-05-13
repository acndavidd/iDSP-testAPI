import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response,RequestOptionsArgs,Headers,Http,Connection,RequestOptions} from 'angular2/http';

@Injectable()

export class TargetsActualsService{
	private vServiceUrl:string;
	private vErrorMsg:string;
	private vIsLoading:boolean;
	public vBrand;
	public vProdCat;

	constructor(
		private _http: Http,
		private _router: Router){

		this.vIsLoading = false;
		this.queryBrand();

	}

	
	queryBrand(){
		//this.vIsLoading = true;
		//let vUserId:string = '1';
		//let vCurrentDate = new Date();
		// console.log(vCurrentDate);
		// return this._http.get('/targetsActuals');
		/*
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
            */

            this._http.get('/targetsActuals').subscribe(
            	response => {
            		if(response.json().status == "Success"){
            			this.vBrand = response.json().brandList;
            			console.log('masukkk');
            		}else{
            			this.vErrorMsg = response.json().error;
            		}
            	},
            	error => {
            		console.log(error);
            		this.vErrorMsg = 'Failed connecting to Retailer service';
            	}
            );

            return null;
	}

	querySubCategory()
	{
		 this._http.get('/getProductCategory').subscribe(
            	response => {
            		if(response.json().status == "Success"){
            			this.vProdCat = response.json().CatList;
            			console.log('masukkk');
            		}else{
            			this.vErrorMsg = response.json().error;
            		}
            	},
            	error => {
            		console.log(error);
            		this.vErrorMsg = 'Failed connecting to Retailer service';
            	}
            );

            return null;

	}

	getBrand(){
		return this.vBrand;
	}

	getProdCat()
	{
		return this.vProdCat;
	}



	getError():string{
		return this.vErrorMsg;
	}

	getLoadingState():boolean{
		return this.vIsLoading;
	}
}