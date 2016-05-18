import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';

@Injectable()

export class RetailerService {
    private vServiceUrl: string;
    private vErrorMsg: string;
    private vIsLoading: boolean;

    constructor(
        private _http: Http,
        private _router: Router) {

        this.vIsLoading = false;
    }

    // To query list of retailer that will be visited pertoday for user that login
    queryTodayCallPlan() {
        this.vIsLoading = true;

        // To-Do : Query User ID or Username
        let vUserId: string = '1';
        let vCurrentDate = new Date();

        console.log(vCurrentDate);

        // Hit API with parameter user_id and current date
        let data: string = 'user=' + vUserId + '&date=' + vCurrentDate;
        this._http.post('/queryCallPlan', data,
            <RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/x-www-form-urlencoded'})
            }).subscribe(
                response => {
                    this.vIsLoading = false;
                    if (response.json().success === 1) { // success login
                        // Pass back the call plan result
                        return response.json().resultCallPlan;
                    } else {// failed login
                        this.vErrorMsg = response.json().error;
                    }
                },
                error => {
                    console.log(error);
                    this.vErrorMsg = 'Failed connecting to Retailer service';
                }
            );
        return '';
    }

    getError(): string {
        return this.vErrorMsg;
    }

    getLoadingState(): boolean {
        return this.vIsLoading;
    }
}