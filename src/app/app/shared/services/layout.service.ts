import {Injectable} from 'angular2/core';
import {PageNavigationService} from './page-navigation.service';
import {MatchMediaService} from './match-media.service';

@Injectable()
export class LayoutService {

    vCurrentPage: string;
    vNumberSelection = false;
    vOldCurrentPage: string;
    vOldCurrentPageParams;
    vCurrentPointer: string;

    constructor(private _pageNavigationService: PageNavigationService,
        private _matchMediaService: MatchMediaService) {

    }

    vFilter = {
        filterTargetsActuals: false,
        filterInventoryPhysical: false,
        filterDSPAlerts: false,
        filterAccReceivables: false,
        filterRetailerRoute: false,
        filterRetailerInventory: false,
        filterRetailerBCP: false
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

        // BEFORE LOGIN PAGE - START
        if (
            pCurrent === 'GetStarted' ||
            pCurrent === 'Verification' ||
            pCurrent === 'Login' ||
            pCurrent === 'SkipSalesOrder') {
            this._pageNavigationService.resetListPreviousData();
            this.vLayoutState = {
                appHeader: false,
                appFooter: false,
                leftMenu: false
            };
        } else if (
            pCurrent === 'Mpin') {
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = 'Login';
            this.vOldCurrentPageParams = null;
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
        }
        // BEFORE LOGIN PAGE - END

        // PARENT PAGE - START
        else if (
            pCurrent === 'MyTransaction' ||
            pCurrent === 'BasicCallProcedure' ||
            pCurrent === 'CloseDay' ||
            pCurrent === 'Remittance' ||
            pCurrent === 'StockReturn' ||
            pCurrent === 'Home') {

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
            // ONLY BCP PAGE NEEDS FILTER
            if (pCurrent === 'BasicCallProcedure') {
                this.vHeaderItem.filter = true;
            }
        }
        // PARENT PAGE - END

        // SHARED PAGE - START
        else if (
            pCurrent === 'TargetsActuals') {
            // NO NEED TO SET PREVIOUS PAGE FOR TARGETS AND ACTUALS PAGE
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
        }
        // SHARED PAGE - END

        // UNDER MY DASHBOARD - START
        else if (
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
        }
        // UNDER MY DASHBOARD - END


        // UNDER BASIC CALL PROCEDURE - START
        else if (
            pCurrent === 'BCPActivityStep') {
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = 'CallPreparation';
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
        } else if (
            pCurrent === 'CallPreparation') {
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = 'BasicCallProcedure';
            this.vOldCurrentPageParams = null;
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
            this.vCurrentPointer = '1';

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
        }
        else if (
            pCurrent === 'BCPCollection') {
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = 'BasicCallProcedure';
            this.vOldCurrentPageParams = null;
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
            this.vCurrentPointer = '2';

            this.vLayoutState = {
                appHeader: true,
                appFooter: false,
                leftMenu: false
            };

            this.vHeaderItem = {
                hamburger: false,
                back: false,
                filter: false,
                edit: false,
                search: false
            };
        } else if (
            pCurrent === 'Offers') {
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = 'CloseDay';
            this.vOldCurrentPageParams = null;
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
            this.vCurrentPointer = '3';

            this.vLayoutState = {
                appHeader: true,
                appFooter: false,
                leftMenu: false
            };
            this.vHeaderItem = {
                hamburger: false,
                back: false,
                filter: false,
                edit: false,
                search: false
            };
        } else if (
            pCurrent === 'RetailerSalesOrder') {
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = 'BasicCallProcedure';
            this.vOldCurrentPageParams = null;
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
            this.vCurrentPointer = '4';

            this.vLayoutState = {
                appHeader: true,
                appFooter: false,
                leftMenu: false
            };

            this.vHeaderItem = {
                hamburger: false,
                back: false,
                filter: false,
                edit: false,
                search: false
            };
        } else if (
            pCurrent === 'SalesOrderPayment') {
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = 'BasicCallProcedure';
            this.vOldCurrentPageParams = null;
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
            this.vCurrentPointer = '5';

            this.vLayoutState = {
                appHeader: true,
                appFooter: false,
                leftMenu: false
            };
            this.vHeaderItem = {
                hamburger: false,
                back: false,
                filter: false,
                edit: false,
                search: false
            };
        } else if (
            pCurrent === 'UnservedOrder') {
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = 'BasicCallProcedure';
            this.vOldCurrentPageParams = null;
            this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
            this.vCurrentPointer = '6';

            this.vLayoutState = {
                appHeader: true,
                appFooter: false,
                leftMenu: false
            };

            this.vHeaderItem = {
                hamburger: false,
                back: false,
                filter: false,
                edit: false,
                search: false
            };
        }
        // UNDER BASIC CALL PROCEDURE - END

        // UNDER CLOSE OF THE DAY - START
        else if (
            pCurrent === 'Collection' ||
            pCurrent === 'VisitedRetail') {
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
        }
        // UNDER CLOSE OF THE DAY - END

        // UNDER REMITTANCE - START
        // UNDER REMITTANCE - END

        // UNDER STOCK RETURN - START
        // UNDER STOCK RETURN - END



        // UNUSED PAGE - START
        // else if (pCurrent === 'ResetPassword') {
        //     // this._pageNavigationService.setPreviousPage('Settings');
        //     this._pageNavigationService.resetListPreviousData();
        //     this.vOldCurrentPage = 'Settings';
        //     this.vOldCurrentPageParams = null;
        //     this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);

        //     this.vLayoutState = {
        //         appHeader: true,
        //         appFooter: false,
        //         leftMenu: false
        //     };
        //     this.vHeaderItem = {
        //         hamburger: true,
        //         back: false,
        //         filter: false,
        //         edit: false,
        //         search: false
        //     };
        // } else if (pCurrent === 'DetailRetailer'
        //     || pCurrent === 'RetailerInventory') {
        //     // NO NEED TO SET THE PREVIOUS PAGE SINCE IT CAN COMES FROM MULTIPLE VIEW
        //     // this._pageNavigationService.setPreviousPage('BasicCallProcedure');

        //     // if (this.vOldCurrentPage! === null || this.vOldCurrentPage! === '') {
        //     //    this._pageNavigationService.setPreviousPage(this.vOldCurrentPage);
        //     // }

        //     this.vLayoutState = {
        //         appHeader: true,
        //         appFooter: false,
        //         leftMenu: false
        //     };

        //     this.vHeaderItem = {
        //         hamburger: false,
        //         back: true,
        //         filter: false,
        //         edit: false,
        //         search: false
        //     };
        // }
        // UNUSED PAGE - END

        console.log('In Layout Current Page ' + pCurrent);
        this._pageNavigationService.setCurrentPage(pCurrent);
    }

    setFilter() {
        this.vFilter.filterTargetsActuals = !this.vFilter.filterTargetsActuals;
        this.vFilter.filterInventoryPhysical = !this.vFilter.filterInventoryPhysical;
        this.vFilter.filterAccReceivables = !this.vFilter.filterAccReceivables;
        this.vFilter.filterDSPAlerts = !this.vFilter.filterDSPAlerts;
        this.vFilter.filterRetailerRoute = !this.vFilter.filterRetailerRoute;
        this.vFilter.filterRetailerInventory = !this.vFilter.filterRetailerInventory;
        this.vFilter.filterRetailerBCP = !this.vFilter.filterRetailerBCP;
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

    toggleFilterInventory(pLoadTab: boolean, pInventoryTab: boolean) {
        // FOR INVENTORY ONLY
        if (pLoadTab) {
            this.vHeaderItem.filter = false;
        }
        if (pInventoryTab) {
            this.vHeaderItem.filter = true;
        }
    }

    getLeftMenuState() {
        return this.vLayoutState.leftMenu;
    }

    getCurrentPointer() {
        return this.vCurrentPointer;
    }

}
