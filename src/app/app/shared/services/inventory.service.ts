import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';

@Injectable()

export class InventoryService {
    private vErrorMsg: string;

    productList: [{
        productID: '',
        productName: '',
        beginningBalance: '',
        newDelivery: '',
        sold: '',
        transferBack: '',
        endingBalance: '',
        dateModified: ''
    }];
    productListStatus = false;

    constructor(
        private _http: Http,
        private _router: Router) {
        }

        getProductList(pUsername: string, pDate: string) {
            this.getProductListPhysical(pUsername, pDate);
        }

        getProductListPhysical(pUsername: string, pDate: string) {
            console.log('Start hit inventory service');
            let vData = {
                username: pUsername,
                date: pDate
            };
            this.productListStatus = false;
            this._http.get('/getProductListPhysical').subscribe(
                    response => {
                        console.log('response get' + response.json().status);
                        if (response.json().status === 'SUCCESS') {
                            console.log('masuk success');
                            console.log('1: ' + JSON.stringify(response.json()));
                            console.log('2: ' + JSON.stringify(response.json().status));
                            console.log('3: ' + JSON.stringify(response.json().statusMessage));
                            console.log('4: ' + JSON.stringify(response.json().productList));
                            this.productList = response.json().productList;
                        } else {
                            this.vErrorMsg = response.json().statusMessage;
                        }
                        this.productListStatus = true;
                    },
                    error => {
                        console.log(error);
                        this.vErrorMsg = 'failed connecting to inventory service';
                        return null;
                    }
                );
            return null;
        }
}