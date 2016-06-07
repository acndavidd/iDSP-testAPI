import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';

@Injectable()

export class InventoryService {
    private vErrorMsg: string;

    vLoadProductList: any = [];
    vPhysicalProductList: any = [];

    constructor(
        private _http: Http,
        private _router: Router) {
        }


    getDSPInventoryList(pUsername: string, pRecordStart: string, pRecordEnd: string) {

        let urlLoad = '/inventory/load?username=' +pUsername;
        let urlPhysical = '/inventory/physical?username=' +pUsername;

        console.log('URL LOAD : ' +urlLoad);
        console.log('URL PHYSICAL : ' +urlPhysical);

        this.hitAPI(urlLoad, 'load');
        this.hitAPI(urlPhysical, 'physical');

        return null;
    }

    hitAPI(pUrl:string, pType: string) {

        this._http.get(pUrl).subscribe(
            response => {
                let vResponse = response.json();
                console.log('2: ' + JSON.stringify(vResponse));


                if (vResponse.status === 200) {
                    if (pType === 'load') {
                        this.vLoadProductList = vResponse.productList;
                    } else if (pType === 'physical') {
                        this.vPhysicalProductList = vResponse.productList;
                    }
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
    }
}