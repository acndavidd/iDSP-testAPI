import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';

@Injectable()
export class AccountsReceivablesService {
    private vServiceUrl: string;
    private vErrorMsg: string;
    private vIsLoading: boolean;

    constructor (
        private _http: Http,
        private _router: Router) {

        this.vIsLoading = false;
    }

    searchRetailer() {
        console.log('test onkeypress masuk service');
        return;
    }

    getError(): string {
        return this.vErrorMsg;
    }

    getLoadingState(): boolean {
        return this.vIsLoading;
    }

    // getAllReceivablesRoute(pDspId, pDate) {
    //   let vData = {
    //       vDspId : pDspId,
    //       vDate : pDate
    //   };
    //   return this._http.post('/accountsReceivables', JSON.stringify(vData));
    // }
    getAllReceivablesRoute(pDspId, pSource) {
      try {
      var vDspId = pDspId;
      var vSource = pSource;
      return this._http.get('/retailer/accountreceivable?source=' + vSource + '&username=' + vDspId);
      } catch(pErr) {
          console.log('Error in get API: ' + pErr);
      }
    }

    // getRetailerSelf(pSource, pDspId) {
    //     let vData = {
    //         vSource : pSource,
    //         vDspId : pDspId
    //     };
    //     return this._http.post('/retailerSelf', JSON.stringify(vData));
    // }
}