import {Injectable} from 'angular2/core';
import {PageNavigationService} from './page-navigation.service';
import {MatchMediaService} from './match-media.service';

@Injectable()
export class LayoutService {

	vCurrentPage: string;
    vNumberSelection = false;
    vOldCurrentPage: string;
    vOldCurrentPageParams;
    vListPreviousData;
    
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

    resetListPreviousData(){
        this.vListPreviousData = null;
    }

    addListPreviousData(pPrevPage, pPrevParams){
        if (this.vListPreviousData === null)
        {
            this.vListPreviousData = [];
        }
        var vPrevData= {
            page: pPrevPage,
            param: pPrevParams
        }
        this.vListPreviousData.push(vPrevData);
    }

    getLatestPreviousData(){
        return this.vListPreviousData.pop();
    }

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
        
            this.resetListPreviousData();
            this.vLayoutState = {
                appHeader: false,
                appFooter: false
            };
        }

        else if(pCurrent=='MyTransaction')
        {
            this.resetListPreviousData();
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
            this.resetListPreviousData();

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
            this.resetListPreviousData();
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
            this.resetListPreviousData();
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
            
            
            pCurrent=='AccountsReceivables' ||
            pCurrent=='DSPAlerts')
        {
            //this._pageNavigationService.setPreviousPage('MyTransaction');
            this.resetListPreviousData();
            this.vOldCurrentPage = "MyTransaction";
            this.vOldCurrentPageParams = null;
            this.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
            
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
            this.resetListPreviousData();
            this.vOldCurrentPage = "MyTransaction";
            this.vOldCurrentPageParams = null;
            this.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
            
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
            //this._pageNavigationService.setPreviousPage('CloseDay');
            this.resetListPreviousData();
            this.vOldCurrentPage = "CloseDay";
            this.vOldCurrentPageParams = null;
            this.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);


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
            //this._pageNavigationService.setPreviousPage('Settings');
            this.resetListPreviousData();
             this.vOldCurrentPage = "Settings";
             this.vOldCurrentPageParams = null;
             this.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);

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
            || pCurrent=='SalesOrderPayment')
        {

            this.resetListPreviousData();
            this.vOldCurrentPage = "BasicCallProcedure";
            this.vOldCurrentPageParams = null; 
            this.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
        
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
        //this._pageNavigationService.setPreviousPage('CloseDay');
        this.resetListPreviousData();
        this.vOldCurrentPage = "CloseDay";
        this.vOldCurrentPageParams = null; 
        this.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
        

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
        //this._pageNavigationService.setPreviousPage('CloseDay');
        this.resetListPreviousData();
        this.vOldCurrentPage = "CloseDay";
        this.vOldCurrentPageParams = null; 
        this.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);

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
        
        if (this.vListPreviousData)
        {
            console.log("Total Previous Page " +  this.vListPreviousData.length);
            var vPreviousData = this.getLatestPreviousData();
                    
            this._pageNavigationService.setPreviousPage(vPreviousData.page);  
            this._pageNavigationService.setPreviousParams(vPreviousData.params);
        }



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
}
