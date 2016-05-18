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
      public vProdCatBrand;

	constructor(
		private _http: Http,
		private _router: Router){

		this.vIsLoading = false;
		this.queryBrand();
            this.queryProdCat();
            this.queryProdSubCat();
            this.queryProduct();

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
            /*
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
            */
            return this._http.get('/targetsActuals');
	}

	queryProdCat()     
	{
            /*console.log('masuk service');
		 this._http.get('/getProductCategory').subscribe(
            	response => {
            		if(response.json().status == "Success"){
            			this.vProdCat = response.json().CatList;
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
            */            
   
            return this._http.get('/getProductCategory');
	}

      queryProdSubCat()
      {
            return this._http.get('/getProductSubCategory');
      }


      queryProduct(pSelectedTab)
      {
                console.log("Start hit login service to Query Product");
                console.log('selecteddd' +pSelectedTab);
            //Get Current Login User
            let vData = {
                  salesPerson : 'DSP00001',
                  actualType : pSelectedTab
            };

            return this._http.post('/getProduct',JSON.stringify(vData));
      }

      queryCategory()
      {
            return this._http.get('/getCategory');
      }

      queryTargets(pSubCategoryID)
      {
 
            //To-Do : Query User ID or Username
            let vSubCategoryID:string = pSubCategoryID;

            //Hit API with parameter user_id and current date
            let data:string = 'sub_category_id='+vSubCategoryID;
            return this._http.post('/getTargets',data,
                  <RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/x-www-form-urlencoded'})
            });
            
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