import {Injectable} from 'angular2/core';
import { Router } from 'angular2/router';

@Injectable()
export class PageNavigationService {

    vCurrentPage: string;
    vCurrentParams= null;
    vChildNode: string;
    vSubChildNode: string;

    vListPreviousData;

    constructor (private _router: Router) {}

    getCurrentParams() {
        return this.vCurrentParams;
    }

    setCurrentPage(pCurrentPage) {
        this.vCurrentPage = pCurrentPage;
    }

    resetListPreviousData() {
        this.vListPreviousData = null;
    }

    addListPreviousData(pPrevPage, pPrevParams) {
        if (this.vListPreviousData === null) {
            this.vListPreviousData = [];
        }
        var vPrevData = {
            page: pPrevPage,
            param: pPrevParams
        };
        this.vListPreviousData.push(vPrevData);
    }

    getLatestPreviousData() {
        return this.vListPreviousData.pop();
    }

    gotoPreviousPage() {

            var vPreviousPage;
            var vPreviousParams;

            if (this.vListPreviousData) {
                console.log('Total Previous Page ' +  this.vListPreviousData.length);
                var vPreviousData = this.getLatestPreviousData();
                console.log('Previous data adalah ' + JSON.stringify(vPreviousData));
                vPreviousPage = vPreviousData.page;
                vPreviousParams = vPreviousData.param;
            }
            else {
                vPreviousPage = this.vCurrentPage;
                vPreviousParams = null;
            }

            if (this.vChildNode === 'login') {
                this._router.navigate(['Starter', vPreviousPage]);
            }
            else {
                if (vPreviousParams !== null && vPreviousParams !== '') {
                    console.log('params is found' + vPreviousParams);
                }
                this.vCurrentParams = vPreviousParams;
                this._router.navigate(['MainPage', vPreviousPage]);
            }
        }


    navigate(pNewPage: string, pNewParams?, pOldParams?) {
        console.log('Mau pindah page dari : ' + this.vCurrentPage + ' ke ' + pNewPage) ;
        this.addListPreviousData(this.vCurrentPage, pOldParams);

        if (pNewParams) {
            this.vCurrentParams = pNewParams;
        }
        else {
            this.vCurrentParams = null;
        }
        this.vCurrentPage = pNewPage;
        console.log('Ready to navigate to ' + pNewPage);
        this._router.navigate(['MainPage', pNewPage]);
    }

}