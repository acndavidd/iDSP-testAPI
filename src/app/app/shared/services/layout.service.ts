import {Injectable} from 'angular2/core';
import {PageNavigationService} from './page-navigation.service';
import {MatchMediaService} from './match-media.service';

@Injectable()
export class LayoutService {

	vCurrentPage: string;
    vNumberSelection = false;
    vOldCurrentPage: string;
    vOldCurrentPageParams;
    
    constructor (private _pageNavigationService: PageNavigationService,
    private _matchMediaService: MatchMediaService) {
        
    }

    vFilter  = {
        filterTargetsActuals : false,
        filterInventoryLoad : false,
        filterInventoryPhysical : false,
        filterDSPAlerts : false,
        filterAccReceivables : false,
        filterRetailerRoute : false,
        filterRetailerInventory: false
    };

	vLayoutState = {
		appHeader: false,
        appFooter: false,
        leftMenu: false
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
        this._pageNavigationService.addListPreviousData(pCurrentPage, null);
        this.vOldCurrentPage = pCurrentPage;
    }

/*
    setOldCurrentPageData(pCurrentPage : string, pParams){
        this._pageNavigationService.addListPreviousData(pCurrentPage, pParams);
        this.vOldCurrentPage = pCurrentPage;
    }
    */

	
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

    setOldCurrentPageParams(pParams){
        this.vOldCurrentPageParams = pParams;
    }

    setCurrentPage(pCurrent : string)
    {
        this.vCurrentPage = pCurrent;

      if(pCurrent == 'GetStarted' ||
        pCurrent == 'Verification' ||
        pCurrent == 'Login'){
        
            this._pageNavigationService.resetListPreviousData();
            this.vLayoutState = {
                appHeader: false,
                appFooter: false,
                leftMenu: false
            };
        }

        else if(pCurrent=='MyTransaction')
        {
            this._pageNavigationService.resetListPreviousData();
            this.vLayoutState = {
                appHeader: true,
                appFooter: true,
                leftMenu: false
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
            this._pageNavigationService.resetListPreviousData();

            this.vLayoutState = {
                appHeader: true,
                appFooter: true,
                leftMenu: false
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
            this._pageNavigationService.resetListPreviousData();
            this.vLayoutState = {
                appHeader: true,
                appFooter: true,
                leftMenu: false
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
            this._pageNavigationService.resetListPreviousData();
            this.vLayoutState = {
                appHeader: true,
                appFooter: true,
                leftMenu: false
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
            
            
            pCurrent=='AccountsReceivables' ||
            pCurrent=='DSPAlerts')
        {
            //this._pageNavigationService.setPreviousPage('MyTransaction');
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = "MyTransaction";
            this.vOldCurrentPageParams = null;
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
            
            this.vLayoutState = {
                appHeader: true,
                appFooter: true,
                leftMenu: false
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
         else if(
            pCurrent=='RetailerRoute' ||
            pCurrent=='Inventory' ||
            pCurrent=='TargetsActuals' 
            )
        {
            //this._pageNavigationService.setPreviousPage('MyTransaction');
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = "MyTransaction";
            this.vOldCurrentPageParams = null;
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
            
            this.vLayoutState = {
                appHeader: true,
                appFooter: true,
                leftMenu: false
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
            //this._pageNavigationService.setPreviousPage('CloseDay');
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = "CloseDay";
            this.vOldCurrentPageParams = null;
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);


            this.vLayoutState = {
                appHeader: true,
                appFooter: true,
                leftMenu: false
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
            //this._pageNavigationService.setPreviousPage('Settings');
            this._pageNavigationService.resetListPreviousData();
             this.vOldCurrentPage = "Settings";
             this.vOldCurrentPageParams = null;
             this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);

            this.vLayoutState = {
              appHeader: true,
              appFooter: true,
                leftMenu: false
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
            || pCurrent=='SalesOrderPayment')
        {

            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = "BasicCallProcedure";
            this.vOldCurrentPageParams = null; 
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);

        
            this.vLayoutState = {
              appHeader: true,
              appFooter: true,
                leftMenu: false
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
        else if( pCurrent=='DetailRetailer' 
            || pCurrent=='RetailerInventory')
        {

            // NO NEED TO SET THE PREVIOUS PAGE SINCE IT CAN COMES FROM MULTIPLE VIEW
            //this._pageNavigationService.setPreviousPage("BasicCallProcedure");

            //if(this.vOldCurrentPage!==null || this.vOldCurrentPage!==""){
            //    this._pageNavigationService.setPreviousPage(this.vOldCurrentPage);
            //}
        
            this.vLayoutState = {
              appHeader: true,
              appFooter: true,
                leftMenu: false
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
        //this._pageNavigationService.setPreviousPage('CloseDay');
        this._pageNavigationService.resetListPreviousData();
        this.vOldCurrentPage = "CloseDay";
        this.vOldCurrentPageParams = null; 
        this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
        

            this.vLayoutState = {
                appHeader: true,
                appFooter: true,
                leftMenu: false
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
        //this._pageNavigationService.setPreviousPage('CloseDay');
        this._pageNavigationService.resetListPreviousData();
        this.vOldCurrentPage = "CloseDay";
        this.vOldCurrentPageParams = null; 
        this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);

            this.vLayoutState = {
                appHeader: true,
                appFooter: true,
                leftMenu: false
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
        console.log("In Layout Current Page " + pCurrent);
        this._pageNavigationService.setCurrentPage(pCurrent);
    }

    setFilter()
    {        
        this.vFilter.filterTargetsActuals = !this.vFilter.filterTargetsActuals;
        this.vFilter.filterInventoryLoad = !this.vFilter.filterInventoryLoad;
        this.vFilter.filterInventoryPhysical = !this.vFilter.filterInventoryPhysical;
        this.vFilter.filterAccReceivables = !this.vFilter.filterAccReceivables;
        this.vFilter.filterDSPAlerts = !this.vFilter.filterDSPAlerts;
        this.vFilter.filterRetailerRoute = !this.vFilter.filterRetailerRoute;
        this.vFilter.filterRetailerInventory = !this.vFilter.filterRetailerInventory;
    }

    setSearch()
    {        
        this.vSearch.searchBox = !this.vSearch.searchBox;
    }

    toggleLeftMenu(){
        this.vLayoutState.leftMenu = !this.vLayoutState.leftMenu;
    }

    getLeftMenuState(){
        return this.vLayoutState.leftMenu;
    } 

}
