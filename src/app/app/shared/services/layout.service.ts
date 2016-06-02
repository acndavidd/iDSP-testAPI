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
        search: false,
        add: false
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
            pCurrent === 'Login') {
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
                search: false,
                add: false
            };
            // ONLY BCP PAGE NEEDS FILTER
            if (pCurrent === 'BasicCallProcedure') {
                this.vHeaderItem.filter = true;
                this.vHeaderItem.add = true;
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
                search: false,
                add: false
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
                search: false,
                add: false
            };
        }
        // UNDER MY DASHBOARD - END

        // UNDER BASIC CALL PROCEDURE - START
        else if (
            pCurrent === 'BCPAddRetailerRoute') {
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
                search: false,
                add: false
            };
        }
        else if (
            pCurrent === 'CallPreparation') {
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
                search: false,
                add: false
            };
        }
        else if (
            pCurrent === 'BCPCollection' ||
            pCurrent === 'Offers' ||
            pCurrent === 'RetailerSalesOrder' ||
            pCurrent === 'SalesOrderPayment' ||
            pCurrent === 'UnservedOrder' ||
            pCurrent === 'SkipSalesOrder' ||
            pCurrent === 'SkipCollection') {

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
                search: false,
                add: false
            };
        } else if (
            pCurrent === 'ConfirmCollection') {
            this.vOldCurrentPage = 'BCPCollection';
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
                search: false,
                add: false
            };
        } else if (
            pCurrent === 'AddEditLoadTransfer' ||
            pCurrent === 'AddEditPhysicalOrder') {
            this.vOldCurrentPage = 'RetailerSalesOrder';
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
                search: false,
                add: false
            };
        } else if (
            pCurrent === 'AddSalesOrderPhysical') {
            this.vOldCurrentPage = 'AddEditPhysicalOrder';
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
                search: false,
                add: false
            };
        } else if (
            pCurrent === 'AddUnservedOrder') {
            this.vOldCurrentPage = 'UnservedOrder';
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
                search: false,
                add: false
            };
        }
        // UNDER BASIC CALL PROCEDURE - END

        // UNDER CLOSE OF THE DAY - START
        else if (
            pCurrent === 'Collection' ||
            pCurrent === 'VisitedRetail' ||
            pCurrent === 'CDUnservedOrder') {
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
                search: false,
                add: false
            };
        }

        else if (
            pCurrent === 'DetailSalesOrder' ||
            pCurrent === 'DetailCollection' ||
            pCurrent === 'DetailRemittance') {

            // this._pageNavigationService.setPreviousPage('CloseDay');
            this._pageNavigationService.resetListPreviousData();
            this.vOldCurrentPage = 'Collection';
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
                search: false,
                add: false
            };
        }
        // UNDER CLOSE OF THE DAY - END


        // UNDER REMITTANCE - START
        else if (
            pCurrent === 'AddRemittance' ||
            pCurrent === 'ConfirmRemittance') {

            this.vOldCurrentPage = 'Remittance';
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
                search: false,
                add: false
            };
        }
        // UNDER REMITTANCE - END

        // UNDER STOCK RETURN - START
        else if (
            pCurrent === 'AddStockReturn' ||
            pCurrent === 'ConfirmStockReturn') {
            this.vOldCurrentPage = null;
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
                search: false,
                add: false
            };
        }
        // UNDER STOCK RETURN - END



        // UNUSED PAGE - START
        // else if (
        //     pCurrent === 'BCPActivityStep') {
        //     this.vLayoutState = {
        //         appHeader: true,
        //         appFooter: false,
        //         leftMenu: false
        //     };
        //     this.vHeaderItem = {
        //         hamburger: false,
        //         back: false,
        //         filter: false,
        //         edit: false,
        //         search: false,
        //         add: false
        //     };

        //     if (this.vCurrentPointer === '0')
        //         this.vHeaderItem.back = true;
        // }
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

        console.log('In Layout Current Page ' + pCurrent + ' - ' + this.vHeaderItem.back);
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

    hideLeftMenu() {
        this.vLayoutState.leftMenu = false;
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
    // for hardcode
    // toggleAdd() {
    //     if (this.vCurrentPage === 'BasicCallProcedure') {
    //         this._pageNavigationService.navigate('BCPAddRetailerRoute', null, null);
    //     }
    // }

    // for backend
        toggleAdd() {
        if (this.vCurrentPage === 'BasicCallProcedure') {
            this._pageNavigationService.navigate('BCPAddRetailerRoute', null, null);
        }
    }
}
