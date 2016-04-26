import {Injectable} from 'angular2/core';
import {PageNavigationService} from './page-navigation.service';
import {MatchMediaService} from './match-media.service';
import {Layout} from '../../models/layout';

@Injectable()
export class LayoutService {

    constructor (private _pageNavigationService: PageNavigationService,
    private _matchMediaService: MatchMediaService) {}

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
	
	getCurrentPage(){
		return this.currentPage;
	}
    
    getFooterLayout(){
        return this.footerItem;
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


    getfooterItem(){
        return this.footerItem;
    }

    setCurrentPage(current : string)
    {
        this.currentPage = current;
        
      if(current == 'GetStarted' ||
        current == 'Verification' ||
        current == 'Login'){
        
            this.layoutState = {
                appHeader: false,
                appFooter: false
            };
        }
        
        else {
            this.layoutState = {
                appHeader: true,
                appFooter: true
            };
        }
    }
      
}
