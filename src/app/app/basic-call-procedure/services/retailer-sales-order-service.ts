import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';

@Injectable()

export class RetailerSalesOrderService {
    private vServiceUrl: string;
    private vErrorMsg: string;
    private vIsLoading: boolean;
    private vSmartLoadTransferList: any = [];

    constructor(
        private _http: Http,
        private _router: Router) {

        this.vIsLoading = false;
    }

    getError(): string {
        return this.vErrorMsg;
    }

    getLoadingState(): boolean {
        return this.vIsLoading;
    }

    getSmartLoadTransferList() {
        return this.vSmartLoadTransferList;
    }

    setSmartLoadTransferList(pData) {
        this.vSmartLoadTransferList = pData;
    }

    getRetailerMins(pStr) {
      return this._http.get('/retailer/' + pStr + '/mins');
    }

    getSuggestedOrder(pStr) {
        return this._http.get('/retailer/' + pStr + '/suggestedorder');
    }
}