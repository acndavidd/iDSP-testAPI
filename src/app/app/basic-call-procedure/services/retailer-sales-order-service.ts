import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';

@Injectable()

export class RetailerSalesOrderService {
    private vServiceUrl: string;
    private vErrorMsg: string;
    private vIsLoading: boolean;
    private vSmartLoadTransferList: any = [];
    vRetailerName;
    vRetailerMIN;
    vSelectedMIN;
    vSelectedBrand;
    vInputPromoCode;
    vSuggestedOrder: number = 0;
    vInputLoadAmount:number = 0;
    vInputDiscountAmount:number = 0;
    vTotalAmount:number = 0;
    vBrandList:any = [];
    vRetailerMinList: any = [];

    constructor(
        private _http: Http,
        private _router: Router) {

        this.vIsLoading = false;
    }

    getAllDataList() {
        return [
            {'retailer_id': 'RTL00001',
            'retailer_name': 'Rose Cell',
            'retailer_min': 12345678,
            'total_amount': 4000}
            ];
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
      console.log('In AddEditLoadTransferService service');
      this._http.get('/retailer/' + pStr + '/mins').subscribe(
            response => {
                this.vRetailerMinList = response.json();
            },
            error => {
                throw ('Error in Service');
            }
        );
    }

    setTotalAmount() {
        return this.vTotalAmount = (this.vInputLoadAmount-this.vInputDiscountAmount);
    }
}