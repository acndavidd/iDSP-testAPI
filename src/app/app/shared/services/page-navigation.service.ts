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

	}

}