import {Injectable} from 'angular2/core';
import {Http, Request, RequestOptions, RequestMethod, RequestOptionsArgs, Headers} from 'angular2/http';
import {PageNavigationService} from './page-navigation.service';
import {MatchMediaService} from './match-media.service';

@Injectable()
export class LayoutService {

	currentPage: string;

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
}
