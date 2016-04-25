import {Injectable} from 'angular2/core';
import {PageNavigationService} from './page-navigation.service';
import {MatchMediaService} from './match-media.service';

@Injectable()
export class LayoutService {

	currentPage: string;
    numberSelection = false;

	layoutState = {
		appHeader: false,
        appFooter: false
	};
    
    footerItem = {
        start: false,
        call: false,
        end: false,
        setting: false
    };
	
<<<<<<< HEAD
	constructor (//private _http: Http,
    private _pageNavigationService: PageNavigationService,
    private _matchMediaService: MatchMediaService) {     
        /*const url = 'config/layout.json';        
        this._http.get(
            url,        
            <RequestOptionsArgs>{        
                headers: new Headers({        
                    'Content-Type': 'application/x-www-form-urlencoded',        
                })        
            }).subscribe(file => {        
                let layout = file.json();
                console.log(layout);  
            });*/
=======
	constructor (private _pageNavigationService: PageNavigationService,
    private _matchMediaService: MatchMediaService) {     
        
>>>>>>> ba06e36873abb8f2716d0dd87f4cb82f3690fafb
    }
	
	getCurrentPage(){
        if(currentPage != 'login'){
            this.layoutState = {
                appHeader: true,
                appFooter: true
            };
            this.footerItem = {
                start: true,
                call: true,
                end: true,
                setting: true
            };
        }
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
