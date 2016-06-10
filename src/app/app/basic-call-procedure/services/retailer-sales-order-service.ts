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
        console.log(pStr.id + pStr.brand + pStr.subcat_type);
        return this._http.get('/retailer/' + pStr.id + '/suggestedorder?brand='+pStr.brand+'&subcat_type='+pStr.subcat_type);
    }

    getRetailerBalanceElp(pParams) {
        console.log('in get retailer service : ' + JSON.stringify(pParams));
        return this._http.post('/retailer/balance', JSON.stringify(pParams));
    }

    newSalesOrder(pId, pParams) {
        console.log('trying create new salesorder : ' + JSON.stringify(pParams));
        return this._http.post('/retailer/' + pId + '/salesorder', JSON.stringify(pParams));
    }
}