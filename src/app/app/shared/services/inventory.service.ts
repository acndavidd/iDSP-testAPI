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

    getPhysicalInventoryList(pUsername: string, pType: string, pRecordStart: string, pRecordEnd: string, pBrand: string, pSubCategory: string) {
        console.log('Start hit inventory service : ' +pUsername);
        let vData = {
            username: pUsername,
            type: pType,
            recordStart: pRecordStart,
            recordEnd: pRecordEnd,
            brand: pBrand,
            subCategory: pSubCategory,
        };
        this._http.post('/dspPhysicalInventoryList', JSON.stringify(vData)).subscribe(
            response => {
                let vResponse = response.json();
                console.log('response get' + response.json().status);
                if (vResponse.Status === 200) {
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