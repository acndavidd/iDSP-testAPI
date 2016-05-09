import {Injectable} from 'angular2/core';
import { Router } from 'angular2/router';

@Injectable()
export class PageNavigationService {
	
	vCurrentPage: string;
	vPreviousPage: string;
	vChildNode: string;
    vSubChildNode: string;
	
	constructor (private _router: Router) {}
    
    getPreviousPage(){
        return this.vPreviousPage;
    }
    
    setManageNumberNavigation(pPrevious){
        this.vPreviousPage = pPrevious;
    }

    setPreviousPage(pPrevious) {
        this.vPreviousPage = pPrevious;
    }
	
	gotoPreviousPage(){
        if(this.vChildNode == 'login'){
            this._router.navigate(['Starter',this.vPreviousPage]);
        }else{
            this._router.navigate(['MainPage',this.vPreviousPage]);
        }
	}

}