import {Injectable} from 'angular2/core';
import {PageNavigationService} from './page-navigation.service';
import {MatchMediaService} from './match-media.service';

@Injectable()
export class LayoutService {

	vCurrentPage: string;
    vNumberSelection = false;
    vOldCurrentPage : string;
    
    constructor (private _pageNavigationService: PageNavigationService,
    private _matchMediaService: MatchMediaService) {
        
    }

    vFilter  = {
        filterTargetsActuals : false,
        filterInventoryLoad : false,
        filterInventoryPhysical : false,
        filterDSPAlerts : false
    };

	vLayoutState = {
		appHeader: false,
        appFooter: false
	};

    vSearch = {
        searchBox: false
    };
    

    //Unused
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
    };
    
    vHeaderItem = {
        back: false,
        filter: false,
        edit: false,
        search: false
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
    getOldCurrentPage(){
        return this.vOldCurrentPage;
    }

    setOldCurrentPage(pCurrentPage : string){
        this.vOldCurrentPage = pCurrentPage;
    }
	
	getLayout(){
		return this.vLayoutState;
	}
    
    getFilter(){
        return this.vFilter;
    }
    
    getSearch(){
        return this.vSearch;
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
                edit: false,
                search: false
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
                edit: false,
                search: false
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
                edit: false,
                search: false
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
                edit: false,
                search: false
            }
        }
        else if(
            
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
                    edit: false,
                    search: false
            };
            if (pCurrent=='AccountsReceivables'){   
                this.vHeaderItem = {
                    back: true,
                    filter: true,
                    edit: false,
                    search: false
                }
            }
            if (pCurrent=='DSPAlerts'){   
                this.vHeaderItem = {
                    back: true,
                    filter: true,
                    edit: false,
                    search: false
                }
            }
        }
         else if(pCurrent=='Inventory' ||
            pCurrent=='TargetsActuals')
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
                filter: true,
                edit: false,
                search: false
            }
        }
        else if(
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
                edit: false,
                search: false
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
                edit: false,
                search: false
            }
        }
        else if(pCurrent=='RetailerSalesOrder' 
            || pCurrent=='DetailRetailer'
            || pCurrent=='SalesOrderPayment')
        {
            
            this._pageNavigationService.setPreviousPage("BasicCallProcedure");

            if(this.vOldCurrentPage!==null || this.vOldCurrentPage!==""){
                this._pageNavigationService.setPreviousPage(this.vOldCurrentPage);
            }
        
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
                edit: false,
                search: false
            }
        }
     else if(pCurrent=='CDTargetsActuals' )
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
                filter: true,
                edit: false,
                search: false
            }
    }
    else if(pCurrent=='VisitedRetail' )
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
                edit: false,
                search: false
            }
    }


    }

    setFilter()
    {        
        this.vFilter.filterTargetsActuals = !this.vFilter.filterTargetsActuals;
        this.vFilter.filterInventoryLoad = !this.vFilter.filterInventoryLoad;
        this.vFilter.filterInventoryPhysical = !this.vFilter.filterInventoryPhysical;
    }

    setSearch()
    {        
        this.vSearch.searchBox = !this.vSearch.searchBox;
    }
}
