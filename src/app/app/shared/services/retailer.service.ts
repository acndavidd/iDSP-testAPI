import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';

@Injectable()

export class RetailerService {
    private vServiceUrl: string;
    private vErrorMsg: string;
    private vIsLoading: boolean;
    private vRetailer: any;
    private vToday: Date;

    constructor (
        private _http: Http,
        private _router: Router) {
        this.vIsLoading = false;
    }

    queryRetailerRoute(pSelectedDay) {
        console.log('Start hit login service to Query Retailer Route');
        // Hit Api with selectedDate and Login user
        return this._http.get('/salesRoute/'+ 'DSP00001' + '/' + pSelectedDay);        
    }


    queryRetailerSummary(pRetailerID) {

        console.log('Start hit login service to Query Retailer Summary');
        // Hit Api with selectedDate and Login user
        return this._http.get('/retailerSummary/' + pRetailerID);

       
    }

    queryRetailerCallPrep(pRetailerID) {
        console.log('Start hit login service to Query Retailer Summary');

        let vData = {
            salesPerson: 'DSP00001',
            retailerId : pRetailerID
        };

        return this._http.post('/retailerCallPreparation', JSON.stringify(vData));
    }

    getLoadWallet(pRetailerID) {
        console.log('Starts get load wallet for' + pRetailerID);

          let vData = {
            salesPerson: 'DSP00001',
            retailerId : pRetailerID
        };

        return this._http.post('/loadWallet', JSON.stringify(vData));

    }

    getPhysicalInventory(pRetailerID) {
        console.log('Starts get physical inventory' + pRetailerID);

          let vData = {
            salesPerson: 'DSP00001',
            retailerId : pRetailerID
        };

        return this._http.post('/physicalInventory', JSON.stringify(vData));

    }

    getPaymentHistory(pRetailerID) {
        console.log('Starts get payment history of' + pRetailerID);

          let vData = {
            retailerId : pRetailerID
        };

        return this._http.post('/paymentHistory', JSON.stringify(vData));

    }


    getRetailer(pRetailerID) {
        /*
        let vData:string = 'retailerID='+pRetailerID;
        this._http.post('/testQueryRetailer',vData,
            <RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/x-www-form-urlencoded'})
            }).subscribe(
                response => {
                    this.vIsLoading = false;
                    if(response.json().success == 1){//success login
                        //set token to local storage(mobile)
                        //localStorage.setItem('accessToken', response.json().token);
                        console.log( response.json().res);
                        this.vRetailer = response.json().res;

                    }else{//failed login
                        this.vErrorMsg = response.json().error;
                    }
                },
                error => {
                    console.log(error);
                    this.vErrorMsg = 'failed connecting DB';
                }
            );
        return false;
        */
    }

    queryTask() {
        console.log('Start hit login service to Query Retailer Route for BCP');
            let vData = {
                salesPerson: 'DSP00001'
            };
            
        return this._http.get('/task?username=' + vData.salesPerson);
    }

    queryAdditionalRetailerRoute() {
        console.log('Start hit login service to Query Retailer Route for BCP');
        this.vToday = new Date();
        let vData = {
            salesPerson: 'DSP00001',
            pDay : 1
        };

        return this._http.post('/additionalRetailerRoute', JSON.stringify(vData));
    }

    getRetailerAll() {
        return this.vRetailer;
    }

    getError(): string {
        return this.vErrorMsg;
    }

    getLoadingState(): boolean {
        return this.vIsLoading;
    }
}