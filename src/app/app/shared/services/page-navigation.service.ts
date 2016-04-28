import {Injectable} from 'angular2/core';
import { Router } from 'angular2/router';

@Injectable()
export class PageNavigationService {
	
	currentPage: string;
	previousPage: string;
	childNode: string;
    subChildNode: string;
	
	constructor (private _router: Router) {}
    
    getPreviousPage(){
        return this.previousPage;
    }
    
    setManageNumberNavigation(previous){
        this.previousPage = previous;
    }

    setPreviousPage(previous) {
        this.previousPage = previous;
    }
	
	gotoPreviousPage(){
        if(this.childNode == 'login'){
			this._router.navigate(['Starter',this.previousPage]);
		}else{
			this._router.navigate(['MainPage',this.previousPage]);
		}
	}

}