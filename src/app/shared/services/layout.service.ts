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
	
	constructor (private _pageNavigationService: PageNavigationService,
    private _matchMediaService: MatchMediaService) {     
        
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
    
    setNumberSelectionState(){
        this.numberSelection = !this.numberSelection;
    }
    
    getNumberSelectionState(){
        return this.numberSelection;
    }

}
