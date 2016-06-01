import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';

@Injectable()

export class TargetsActualsService {
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

      queryPerformance(pSelectedTab, pSelectedBrand) {
            console.log('Start hit login service to Query Performance');
            console.log('Selected tab: ' + pSelectedTab);
            
            let vData = {
                  salesPerson : 'DSP00001',
                  actualType : pSelectedTab,
                  brand : pSelectedBrand
            };
            return this._http.post('/performance', JSON.stringify(vData));
      }
      
      getError(): string {
            return this.vErrorMsg;
      }

      getLoadingState(): boolean {
            return this.vIsLoading;
      }
}