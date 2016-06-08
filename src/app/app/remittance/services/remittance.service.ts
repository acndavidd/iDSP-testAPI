import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';

@Injectable()

export class RemittanceService {

    private vErrorMsg: string;
    private vIsLoading: boolean;
    private vDSPID: string;
    private vRemittance: any;
    private vTotalRemittance: number;

    constructor(
        private _http: Http,
        private _router: Router
    ) {
        this.vIsLoading = false;
    }

    /* Method */
    queryGetRemittance() {
        let url = '/remittance/' + this.vDSPID;
        this._http.get(url).subscribe(
            response => {
                this.vRemittance = response.json();
                this.SumTotalRemittance();
            },
            error => {
                this.vErrorMsg = error.json();
            }
        );
    }

    SumTotalRemittance() {
        this.vTotalRemittance = 0;
        if (this.vRemittance !== undefined) {
            this.vRemittance.forEach(element => {
                this.vTotalRemittance = this.vTotalRemittance + element.remit_amount;
            });
        }
    }

    /* Getter */
    getError(): string {
        return this.vErrorMsg;
    }

    getLoadingState(): boolean {
        return this.vIsLoading;
    }

    getRemittance() {
        return this.vRemittance;
    }

    getTotalRemittance() {
        return this.vTotalRemittance;
    }

    /* Setter*/
    setDSPID(pDSPID: string) {
        this.vDSPID = pDSPID;
    }

}