import {Injectable} from 'angular2/core';
import {PageNavigationService} from './page-navigation.service';
import {MatchMediaService} from './match-media.service';
import {Layout} from '../../../models/layout';

@Injectable()
export class LayoutService {

	currentPage: string;
    numberSelection = false;
    
    constructor (private _pageNavigationService: PageNavigationService,
    private _matchMediaService: MatchMediaService) {
        
    }

	layoutState = {
		appHeader: false,
        appFooter: false
	};
    
    footerItem = {
        start: true,
        call: true,
        end: true,
        setting: true
    };

     footerState = {
        mytransaction: false,
        basicp :false,
        closeday : false,
        settings :false
    }
    
    headerItem = {
        back: false,
        filter: false,
        edit: false
    };
    
	getCurrentPage(){
		return this.currentPage;
	}
    
    getfooterState(){
        return this.footerState;
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

    getHeaderLayout(){
        return this.headerItem;
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
        else if(current=='MyTransaction')
        {
            this.layoutState = {
                appHeader: true,
                appFooter: true
            };
            this.footerState = 
            {
                mytransaction : true,
                basicp : false,
                closeday : false,
                settings : false
            };    
            this.headerItem = {
                back: false,
                filter: false,
                edit: false
            }
         }
        else if(current=='BasicCallProcedure')
        {
            this.layoutState = {
                appHeader: true,
                appFooter: true
            };
            this.footerState = 
            {
                mytransaction : false,
                basicp : true,
                closeday : false,
                settings : false
            };    
            this.headerItem = {
                back: false,
                filter: false,
                edit: false
            }
        }
        else if(current=='CloseDay')
        {
            this.layoutState = {
                appHeader: true,
                appFooter: true
            };
            this.footerState = 
            {
                mytransaction : false,
                basicp : false,
                closeday : true,
                settings : false
            };    
            this.headerItem = {
                back: false,
                filter: false,
                edit: false
            }
        }
        else if(current=='Settings')
        {
            this.layoutState = {
                appHeader: true,
                appFooter: true
            };
            this.footerState = 
            {
                mytransaction : false,
                basicp : false,
                closeday : false,
                settings : true
            };    
            this.headerItem = {
                back: false,
                filter: false,
                edit: false
            }
        }
        else if(
            current=='TargetsActuals' ||
            current=='Inventory' ||
            current=='RetailerRoute' ||
            current=='AccountsReceivables' ||
            current=='DSPAlerts')
        {
            this._pageNavigationService.setPreviousPage('MyTransaction');
            
            this.layoutState = {
                appHeader: true,
                appFooter: true
            };
            this.footerState = 
            {
                mytransaction : true,
                basicp : false,
                closeday : false,
                settings : false
            };    
            this.headerItem = {
                back: true,
                filter: false,
                edit: false
            }
        } 
        else if(current=='ResetPassword')
        {
            this._pageNavigationService.setPreviousPage('Settings');
            
            this.layoutState = {
                appHeader: true,
                appFooter: true
            };
            this.footerState = 
            {
                mytransaction : false,
                basicp : false,
                closeday : false,
                settings : true
            };    
            this.headerItem = {
                back: true,
                filter: false,
                edit: false
            }
        }
    }
}
