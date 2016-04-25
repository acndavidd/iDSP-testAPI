import {Injectable} from 'angular2/core';
import {PageNavigationService} from './page-navigation.service';
import {MatchMediaService} from './match-media.service';

@Injectable()
export class LayoutService {

	currentPage: string;
    numberSelection = false;

	layoutState = {
		appHeader: true,
        appFooter: true
	};
    
    footerItem = {
        start: true,
        call: true,
        end: true,
        setting: true
    };
	/*
	constructor (private _http: Http,
    private _pageNavigationService: PageNavigationService,
    private _matchMediaService: MatchMediaService) { 
        const url = 'config/layout.json';        
        this._http.get(
            url,        
            <RequestOptionsArgs>{        
                headers: new Headers({        
                    'Content-Type': 'application/x-www-form-urlencoded',        
                })        
            }).subscribe(file => {        
                let layout = file.json();
                console.log(layout);  
            });
        }
	*/
	getCurrentPage(){
		return this.currentPage;
	}
    
    getFooterLayout(){
        return this.footerItem;
    }
	
	setCurrentPage(current : string){
		this.currentPage = current;
	}
    
	getLayout(){
		return this.layoutState;
	}
    
    setNumberSelectionState(){
        this.numberSelection = !this.numberSelection;
    }
    
    getNumberSelectionState(){
        return this.numberSelection;
    }

}
