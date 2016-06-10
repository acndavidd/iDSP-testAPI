import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';

@Injectable()

export class GlobalService {
      private vServiceUrl: string;
      private vErrorMsg: string;
      private vIsLoading: boolean;
      private vSelectedTab;
      public vProdCatBrand;
      private vListBrands;

      constructor(
            private _http: Http,
            private _router: Router) {

            this.vIsLoading = false;
            this.queryBrand();
            this.queryProductID();
      }


      queryBrand() {

          this._http.get('/brand').subscribe(
             response => {
                this.vListBrands = response.json();
                console.log(JSON.stringify(this.vListBrands));
            },
            error => {}
        );
      }

      getBrand() {
            return this.vListBrands;
      }

      queryProductID() {

          this._http.get('/productID').subscribe(
             response => {
                this.vListBrands = response.json();
                console.log(JSON.stringify(this.vListBrands));
            },
            error => {}
        );
      }

      getProductID() {
            return this.vListBrands;
      }
}