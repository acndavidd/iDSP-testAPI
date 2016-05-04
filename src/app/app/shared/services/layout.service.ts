import {Injectable} from 'angular2/core';
import {PageNavigationService} from './page-navigation.service';
import {MatchMediaService} from './match-media.service';

@Injectable()
export class LayoutService {

	vCurrentPage: string;
    vNumberSelection = false;
    
    constructor (private _pageNavigationService: PageNavigationService,
    private _matchMediaService: MatchMediaService) {
        
    }

	vLayoutState = {
		appHeader: false,
        appFooter: false
	};
    

    Unused
    vFooterItem = {
        start: true,
        call: true,
        end: true,
        setting: true
    };

    vFooterState = {
        myTransaction: false,
        basicCallProcedure :false,
        closeDay : false,
        settings :false
    }
    
    vHeaderItem = {
        back: false,
        filter: false,
        edit: false
    };

	getCurrentPage(){
		return this.vCurrentPage;
	}
    
    getFooterState(){
        return this.vFooterState;
    }

    //getFooterLayout(){
    //    return this.vFooterItem;
    //}
	
	getLayout(){
		return this.vLayoutState;
	}
    
    setNumberSelectionState(){
        this.vNumberSelection = !this.vNumberSelection;
    }
    
    getNumberSelectionState(){
        return this.vNumberSelection;
    }

    getFooterItem(){
        return this.vFooterItem;
    }

    getHeaderLayout(){
        return this.vHeaderItem;
    }

    setCurrentPage(pCurrent : string)
    {
        this.vCurrentPage = pCurrent;
        
      if(pCurrent == 'GetStarted' ||
        pCurrent == 'Verification' ||
        pCurrent == 'Login'){
        
            this.vLayoutState = {
                appHeader: false,
                appFooter: false
            };
        }

        else if(pCurrent=='MyTransaction')
        {
            this.vLayoutState = {
                appHeader: true,
                appFooter: true
            };
            this.vFooterState = 
            {
                myTransaction : true,
                basicCallProcedure : false,
                closeDay : false,
                settings : false
            };    
            this.vHeaderItem = {
                back: false,
                filter: false,
                edit: false
            }
         }
        else if(pCurrent=='BasicCallProcedure')
        {
            this.vLayoutState = {
                appHeader: true,
                appFooter: true
            };
            this.vFooterState = 
            {
                myTransaction : false,
                basicCallProcedure : true,
                closeDay : false,
                settings : false
            };    
            this.vHeaderItem = {
                back: false,
                filter: false,
                edit: false
            }
        }
        else if(pCurrent=='CloseDay')
        {
            this.vLayoutState = {
                appHeader: true,
                appFooter: true
            };
            this.vFooterState = 
            {
                myTransaction : false,
                basicCallProcedure : false,
                closeDay : true,
                settings : false
            };    
            this.vHeaderItem = {
                back: false,
                filter: false,
                edit: false
            }
        }
        else if(pCurrent=='Settings')
        {
            this.vLayoutState = {
                appHeader: true,
                appFooter: true
            };
            this.vFooterState = 
            {
                myTransaction : false,
                basicCallProcedure : false,
                closeDay : false,
                settings : true
            };    
            this.vHeaderItem = {
                back: false,
                filter: false,
                edit: false
            }
        }
        else if(
            pCurrent=='TargetsActuals' ||
            pCurrent=='Inventory' ||
            pCurrent=='RetailerRoute' ||
            pCurrent=='AccountsReceivables' ||
            pCurrent=='DSPAlerts')
        {
            this._pageNavigationService.setPreviousPage('MyTransaction');
            
            this.vLayoutState = {
                appHeader: true,
                appFooter: true
            };
            this.vFooterState = 
            {
                myTransaction : true,
                basicCallProcedure : false,
                closeDay : false,
                settings : false
            };    
            this.vHeaderItem = {
                back: true,
                filter: false,
                edit: false
            }
        }
        else if(
            pCurrent=='TargetActual' ||
            pCurrent=='VisiteRetail' ||
            pCurrent=='Collection' ||
            pCurrent=='StockReturn' ||
            pCurrent=='Sync')
        {
            this._pageNavigationService.setPreviousPage('CloseDay');
            
            this.vLayoutState = {
                appHeader: true,
                appFooter: true
            };
            this.vFooterState = 
            {
                myTransaction : false,
                basicCallProcedure : false,
                closeDay : true,
                settings : false
            };    
            this.vHeaderItem = {
                back: true,
                filter: false,
                edit: false
            }
        } 
        else if(pCurrent=='ResetPassword')
        {
            this._pageNavigationService.setPreviousPage('Settings');
            
            this.vLayoutState = {
              appHeader: true,
              appFooter: true
            };
            this.vFooterState = 
            {
                myTransaction : false,
                basicCallProcedure : false,
                closeDay : false,
                settings : true
            };    
            this.vHeaderItem = {
                back: true,
                filter: false,
                edit: false
            }
        }
        else if(pCurrent=='RetailerSalesOrder' 
            || pCurrent=='DetailRetailer'
            || pCurrent=='SalesOrderPayment')
        {
            this._pageNavigationService.setPreviousPage('BasicCallProcedure');
            
            this.vLayoutState = {
              appHeader: true,
              appFooter: true
            };
            this.vFooterState = 
            {
                myTransaction : false,
                basicCallProcedure : true,
                closeDay : false,
                settings : false
            };    
            this.vHeaderItem = {
                back: true,
                filter: false,
                edit: false
            }
        }
    }
}
