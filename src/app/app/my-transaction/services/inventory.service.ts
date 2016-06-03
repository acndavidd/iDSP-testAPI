import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';

@Injectable()

export class InventoryService {
    private vErrorMsg: string;

    vProductList: any = [];

    constructor(
        private _http: Http,
        private _router: Router) {
        }

    getPhysicalInventoryList1(pUsername: string, pType: string, pRecordStart: string, pRecordEnd: string, pBrand: string, pSubCategory: string) {
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
                console.log('response get' + vResponse.Status);
                if (vResponse.Status === 200) {
                    console.log('masuk success');
                    console.log('1: ' + JSON.stringify(vResponse));
                    console.log('2: ' + JSON.stringify(vResponse.Status));
                    console.log('3: ' + JSON.stringify(vResponse.StatusMessage));
                    console.log('4: ' + JSON.stringify(vResponse.productList));

                    console.log('8: ' + JSON.stringify(vResponse.productList.length));

                    var totalProduct = vResponse.productList.length;


                    // for (var a = 0 ; a < totalProduct ; a++) {

                    //     }));
                    // }
                    // this.vProductList = this.vProductListTemp.filter(pFilter => {
                    //     // return pFilter.endingBalance = parseInt(pFilter.endingBalance);
                        
                    //     if (pFilter.endingBalance !== '0') {
               
                    //         return pFilter.endingBalance = parseInt(pFilter.endingBalance.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                    //     } else {
                    //         return (pFilter.endingBalance = 0);
                    //     }
                        // return pFilter;
                    // });
                    // for (var i = 0; i < this.vProductListTemp.length; i++) {
                    //     console.log(this.vProductListTemp[i].endingBalance);
                    // // }
                    // this.vProductList = this.vProductListTemp.map(function (x) {
                    //     // body..
                    //     return parseInt(x,10);
                    // })

                    this.vProductList = vResponse.productList;
                } else {
                }
            },
            error => {
                console.log(error);
                this.vErrorMsg = 'failed connecting to inventory service';
                return null;
            }
        );
        return null;
    }


    getInventoryList(pUsername: string, pType: string) {

        let url = '/inventory/' + pType + '?username=' +pUsername+ '&type=' +pType;
        this._http.get(url).subscribe(
            response => {
                let vResponse = response.json();

                if (vResponse.status === 200) {
                    this.vProductList = vResponse.productList;
                } else {
                    this.vErrorMsg = vResponse.productList;
                }
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