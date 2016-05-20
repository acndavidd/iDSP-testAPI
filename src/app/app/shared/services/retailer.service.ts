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
        // Get Current Login User
        let vData = {
            salesPerson: 'DSP01',
            day: pSelectedDay
        };

        var vSalesRoute;
        // Hit Api with selectedDate and Login user
        return this._http.post('/getSalesRoute', JSON.stringify(vData));

        // Sample Hardcoded
        /*
        vSalesRoute = [
            {
                'retailer_id': '1',
                'route': [{RouteDay: [{sequence: 1}]}],
                'retailer_name': 'Gloria Cell',
                'retailer_address': 'Barangka Dr. Mandaluyong',
                'owner_name': 'Ms. Gloria'
            },
            {
                'retailer_id': '2',
                'route': [{RouteDay: [{sequence: 2}]}],
                'retailer_name': 'Bird Cell',
                'retailer_address': 'Barangka Dr. Sutrisno',
                'owner_name': 'Mr. Jaja'
            },
            {
                'retailer_id': '3',
                'route': [{RouteDay: [{sequence: null}]}],
                'retailer_name': 'Rose Cell',
                'retailer_address': 'Matalang 56 Barangka',
                'owner_name': 'Ms. Rose'
            }];
        */
        // console.log(vSalesRoute); 
        // return vSalesRoute;
    }


    queryRetailerSummary(pRetailerID) {

        console.log('Start hit login service to Query Retailer Summary');
        // Get Current Login User
        let vData = {
            retailerId : pRetailerID,
            salesPerson: 'DSP01'
        };


        // Hit Api with selectedDate and Login user
        return this._http.post('/getRetailerSummary', JSON.stringify(vData));

        /*Sample Hardcoded
        var vSampleObject;
        if (pRetailerID == 1)
        {
            vSampleObject =
            {
                "retailer_id": "1",
                "retailer_name": "Gloria Cell",
                "retailer_min": "2931791239",
                "owner_first_name": 'Ms. Gloria',
                "owner_middle_name": '',
                "owner_last_name": '',
                "retailer_address": "Barangka Dr. Mandaluyong",
                "civil_status": 'WNI',
                "email": 'GLORIAR@GMAIL.COM',
                "gender": 'Female',
                "birthday": new Date(),
                "amount_receivable": 1000000,
                "value_segment": "High",
                "threshold": 100000
            };
        }
        else if (pRetailerID == 2)
        {
            vSampleObject =
            {
                "retailer_id": "2",
                "retailer_name": "Bird Cell",
                "retailer_min": "2931791239",
                "owner_first_name": 'Ms. Jaja',
                "owner_middle_name": '',
                "owner_last_name": '',
                "retailer_address": "Barangka Dr. Sutrisno",
                "civil_status": 'WNI',
                "email": 'JAJA@GMAIL.COM',
                "gender": 'Male',
                "birthday": new Date(),
                "amount_receivable": 2000000,
                "value_segment": "Medium",
                "threshold": 500000
            };
        }
        else if (pRetailerID == 3)
        {
            vSampleObject =
            {
                "retailer_id": "3",
                "retailer_name": "Rose Cell",
                "retailer_min": "1231312311",
                "owner_first_name": 'Rose Cell',
                "owner_middle_name": '',
                "owner_last_name": '',
                "retailer_address": "Matalang 56 Barangka",
                "civil_status": 'WNI',
                "email": 'ROSE@GMAIL.COM',
                "gender": 'Female',
                "birthday": new Date(),
                "amount_receivable": 3000000,
                "value_segment": "Low",
                "threshold": 700000
            };
        }       
                    
        return vSampleObject;
        */
    }

    queryRetailerCallPrep(pRetailerID) {
        console.log('Start hit login service to Query Retailer Summary');

        let vData = {
            salesPerson: 'DSP00001',
            retailerId : pRetailerID
        };

        return this._http.post('/getRetailerCallPrep', JSON.stringify(vData));
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

    queryRetailerRouteBCP() {
        console.log('Start hit login service to Query Retailer Route for BCP');
        this.vToday = new Date();
        let vData = {
            salesPerson: 'DSP00001',
            day: 1
        };

        var vSalesRoute;
        return this._http.post('/getRetailerRouteBCP', JSON.stringify(vData));
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