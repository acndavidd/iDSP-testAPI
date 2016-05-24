import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';

@Injectable()

export class RetailerSalesOrderService {
    private vServiceUrl: string;
    private vErrorMsg: string;
    private vIsLoading: boolean;

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
}