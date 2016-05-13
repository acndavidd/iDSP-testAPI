import {Injectable} from 'angular2/core';
import { Router } from 'angular2/router';

@Injectable()
export class PageNavigationService {
	
	vCurrentPage: string;
	vPreviousPage: string;
	vPreviousParams;
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

    setPreviousParams(pParams) {
        this.vPreviousParams = pParams;
    }

    getPreviousParams(){
        return this.vPreviousParams;
    }
	
	gotoPreviousPage(){
        if(this.vChildNode == 'login'){
            this._router.navigate(['Starter',this.vPreviousPage]);
        }else{

            console.log(this.vPreviousPage);
            if(this.vPreviousParams !== null || this.vPreviousParams !== '')
            {
                this._router.navigate(['MainPage',this.vPreviousPage,this.vPreviousParams]);
            }
            else{
                this._router.navigate(['MainPage',this.vPreviousPage]);
            }
            
        }
	}

}