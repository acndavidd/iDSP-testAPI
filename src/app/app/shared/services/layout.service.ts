import {Injectable} from 'angular2/core';
import {PageNavigationService} from './page-navigation.service';
import {MatchMediaService} from './match-media.service';

@Injectable()
export class LayoutService {

    vCurrentPage: string;
    vNumberSelection = false;
    vOldCurrentPage: string;
    vOldCurrentPageParams;

    constructor(private _pageNavigationService: PageNavigationService,
        private _matchMediaService: MatchMediaService) {

    }

    vFilter = {
        filterTargetsActuals: false,
        filterInventoryLoad: false,
        filterInventoryPhysical: false,
        filterDSPAlerts: false,
        filterAccReceivables: false,
        filterRetailerRoute: false,
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


    // Unused
    // vFooterItem = {
    //     start: true,
    //     call: true,
    //     end: true,
    //     setting: true
    // };

    // vFooterState = {
    //     myTransaction: false,
    //     basicCallProcedure :false,
    //     closeDay : false,
    //     settings :false
    // };

    vHeaderItem = {
        hamburger: false,
        back: false,
        filter: false,
        edit: false,
        search: false
    };



    getCurrentPage() {
        return this.vCurrentPage;
    }

    // getFooterState() {
    //     return this.vFooterState;
    // }

    // getFooterLayout() {
    //     return this.vFooterItem;
    // }

    getOldCurrentPage() {
        return this.vOldCurrentPage;
    }


    setOldCurrentPage(pCurrentPage: string) {
        this._pageNavigationService.addListPreviousData(pCurrentPage, null);
        this.vOldCurrentPage = pCurrentPage;
    }

    /*
        setOldCurrentPageData(pCurrentPage : string, pParams) {
            this._pageNavigationService.addListPreviousData(pCurrentPage, pParams);
            this.vOldCurrentPage = pCurrentPage;
        }
        */


    getLayout() {
        return this.vLayoutState;
    }

    getFilter() {
        return this.vFilter;
    }

    getSearch() {
        return this.vSearch;
    }

    setNumberSelectionState() {
        this.vNumberSelection = !this.vNumberSelection;
    }

    getNumberSelectionState() {
        return this.vNumberSelection;
    }

    // getFooterItem() {
    //     return this.vFooterItem;
    // }

    getHeaderLayout() {
        return this.vHeaderItem;
    }

    setOldCurrentPageParams(pParams) {
        this.vOldCurrentPageParams = pParams;
    }

    setCurrentPage(pCurrent: string) {
        this.vCurrentPage = pCurrent;

        if(
            pCurrent == 'GetStarted' ||
            pCurrent == 'Verification' ||
            pCurrent == 'Login'||
            pCurrent == 'Mpin') {
            this._pageNavigationService.resetListPreviousData();
            this.vLayoutState = {
                appHeader: false,
                appFooter: false,
                leftMenu: false
            };
        } else if (
            pCurrent === 'MyTransaction' ||
            pCurrent === 'BasicCallProcedure' ||
            pCurrent === 'CloseDay' ||
            pCurrent === 'Remittance' ||
            pCurrent === 'StockReturn') {
            this._pageNavigationService.resetListPreviousData();

            this.vLayoutState = {
                appHeader: true,
                appFooter: false,
                leftMenu: false
            };

            this.vHeaderItem = {
                hamburger: true,
                back: false,
                filter: false,
                edit: false,
                search: false
            };
        } else if (
            pCurrent === 'TargetsActuals' ||
            pCurrent === 'Inventory' ||
            pCurrent === 'RetailerRoute' ||
            pCurrent === 'AccountsReceivables' ||
            pCurrent === 'DSPAlerts') {
            // this._pageNavigationService.setPreviousPage('MyTransaction');
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = 'MyTransaction';
            this.vOldCurrentPageParams = null;
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);

            this.vLayoutState = {
                appHeader: true,
                appFooter: false,
                leftMenu: false
            };
            this.vHeaderItem = {
                hamburger: true,
                back: false,
                filter: true,
                edit: false,
                search: false
            };
        } else if (
            pCurrent === 'Collection' ||
            pCurrent === 'StockReturn' ||
            pCurrent === 'Sync') {
            // this._pageNavigationService.setPreviousPage('CloseDay');
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = 'CloseDay';
            this.vOldCurrentPageParams = null;
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);


            this.vLayoutState = {
                appHeader: true,
                appFooter: false,
                leftMenu: false
            };

            this.vHeaderItem = {
                hamburger: true,
                back: false,
                filter: false,
                edit: false,
                search: false
            };
        } else if (pCurrent === 'ResetPassword') {
            // this._pageNavigationService.setPreviousPage('Settings');
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = 'Settings';
            this.vOldCurrentPageParams = null;
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);

            this.vLayoutState = {
                appHeader: true,
                appFooter: false,
                leftMenu: false
            };
            this.vHeaderItem = {
                hamburger: true,
                back: false,
                filter: false,
                edit: false,
                search: false
            };
        } else if (pCurrent === 'RetailerSalesOrder'
            || pCurrent === 'SalesOrderPayment') {
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = 'BasicCallProcedure';
            this.vOldCurrentPageParams = null;
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);


            this.vLayoutState = {
                appHeader: true,
                appFooter: false,
                leftMenu: false
            };

            this.vHeaderItem = {
                hamburger: false,
                back: true,
                filter: false,
                edit: false,
                search: false
            };
        } else if (pCurrent === 'DetailRetailer'
            || pCurrent === 'RetailerInventory') {
            // NO NEED TO SET THE PREVIOUS PAGE SINCE IT CAN COMES FROM MULTIPLE VIEW
            // this._pageNavigationService.setPreviousPage('BasicCallProcedure');

            // if (this.vOldCurrentPage! === null || this.vOldCurrentPage! === '') {
            //    this._pageNavigationService.setPreviousPage(this.vOldCurrentPage);
            // }

            this.vLayoutState = {
                appHeader: true,
                appFooter: false,
                leftMenu: false
            };

            this.vHeaderItem = {
                hamburger: false,
                back: true,
                filter: false,
                edit: false,
                search: false
            };
        } else if (pCurrent === 'CDTargetsActuals') {
            // this._pageNavigationService.setPreviousPage('CloseDay');
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = 'CloseDay';
            this.vOldCurrentPageParams = null;
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);

            this.vLayoutState = {
                appHeader: true,
                appFooter: false,
                leftMenu: false
            };

            this.vHeaderItem = {
                hamburger: true,
                back: false,
                filter: true,
                edit: false,
                search: false
            };
        } else if (pCurrent === 'VisitedRetail') {
            // this._pageNavigationService.setPreviousPage('CloseDay');
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = 'CloseDay';
            this.vOldCurrentPageParams = null;
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
            this.vLayoutState = {
                appHeader: true,
                appFooter: false,
                leftMenu: false
            };
            this.vHeaderItem = {
                hamburger: true,
                back: false,
                filter: false,
                edit: false,
                search: false
            };
        } else if (pCurrent === 'BCPActivityStep') {
            // this._pageNavigationService.setPreviousPage('DetailRetailer');

            this.vLayoutState = {
                appHeader: true,
                appFooter: true,
                leftMenu: false
            };
            this.vHeaderItem = {
                hamburger: true,
                back: true,
                filter: false,
                edit: false,
                search: false
            };
        }

        console.log('In Layout Current Page ' + pCurrent);
        this._pageNavigationService.setCurrentPage(pCurrent);
    }

    setFilter() {
        this.vFilter.filterTargetsActuals = !this.vFilter.filterTargetsActuals;
        this.vFilter.filterInventoryLoad = !this.vFilter.filterInventoryLoad;
        this.vFilter.filterInventoryPhysical = !this.vFilter.filterInventoryPhysical;
        this.vFilter.filterAccReceivables = !this.vFilter.filterAccReceivables;
        this.vFilter.filterDSPAlerts = !this.vFilter.filterDSPAlerts;
        this.vFilter.filterRetailerRoute = !this.vFilter.filterRetailerRoute;
        this.vFilter.filterRetailerInventory = !this.vFilter.filterRetailerInventory;
    }

    setSearch() {
        this.vSearch.searchBox = !this.vSearch.searchBox;
    }

    toggleLeftMenu() {
        this.vLayoutState.leftMenu = !this.vLayoutState.leftMenu;
    }

    toggleHeader() {
        // FOR LOGOUT ONLY
        this.vLayoutState.appHeader = false;
    }

    getLeftMenuState() {
        return this.vLayoutState.leftMenu;
    }

}
