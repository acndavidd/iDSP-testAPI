import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';

@Injectable()

export class TargetsActualsService {
      private vServiceUrl: string;
      private vErrorMsg: string;
      private vIsLoading: boolean;
      private vSelectedTab;
      public vBrand;
      public vProdCat;
      public vProdCatBrand;

      constructor(
            private _http: Http,
            private _router: Router) {

            this.vIsLoading = false;
            this.queryBrand();
            this.queryProdCat();
            this.queryProdSubCat();
      }


      queryBrand() {
            console.log('Start get brands');
            return this._http.get('/brand');
      }

      queryProdCat() {

            return this._http.get('/productCategories');
      }

      queryProdSubCat() {
            return this._http.get('/productSubCategories');
      }

      queryProduct(pSelectedTab, pSelectedBrand) {
            console.log('Start hit login service to Query Product');
            console.log('Selected tab: ' + pSelectedTab);
            // Get Current Login User
            let vData = {
                  salesPerson : 'DSP00001',
                  actualType : pSelectedTab,
                  brand : pSelectedBrand
            };
            return this._http.post('/targetsActuals', JSON.stringify(vData));
      }

      queryCategory() {
            return this._http.get('/getCategory');
      }

      queryTargets(pSubCategoryID) {
            // To-Do : Query User ID or Username
            let vSubCategoryID: string = pSubCategoryID;

            // Hit API with parameter user_id and current date
            let data: string = 'sub_category_id=' + vSubCategoryID;
            return this._http.post('/getTargets', data,
                  <RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/x-www-form-urlencoded'})
            });

      }
      
      getBrand() {
            return this.vBrand;
      }

      getProdCat() {
            return this.vProdCat;
      }

      getError(): string {
            return this.vErrorMsg;
      }

      getLoadingState(): boolean {
            return this.vIsLoading;
      }
}