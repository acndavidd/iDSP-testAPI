import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {MyTransactionComponent} from '../../my-transaction/components/my-transaction.component';
import {BasicCallProcedureComponent} from '../../basic-call-procedure/components/basic-call-procedure.component';
import {CloseDayComponent} from '../../close-day/components/close-day.component';
import {CollectionComponent} from '../../close-day/components/collection.component';
import {SettingsComponent} from '../../settings/components/settings.component';
import {TargetsActualsComponent} from '../../my-transaction/components/targets-actuals.component';
import {InventoryComponent} from '../../my-transaction/components/inventory.component';
import {RetailerRouteComponent} from '../../my-transaction/components/retailer-route.component';
import {AccountsReceivablesComponent} from '../../my-transaction/components/accounts-receivables.component';
import {DSPAlertsComponent} from '../../my-transaction/components/dsp-alerts.component';
import {ResetPasswordComponent} from '../../settings/components/reset-password.component';
import {RetailerSalesOrderComponent} from '../../basic-call-procedure/components/retailer-sales-order.component';
import {DetailRetailerComponent} from '../../basic-call-procedure/components/detail-retailer.component';
import {RetailerInventoryComponent} from '../../basic-call-procedure/components/retailer-inventory.component';
import {BCPCollectionComponent} from '../../basic-call-procedure/components/bcp-collection.component';
import {SalesOrderPaymentComponent} from '../../basic-call-procedure/components/sales-order-payment.component';
import {VisitedRetailComponent} from '../../close-day/components/visited-retail.component';
import {BCPActivityStepComponent} from '../../basic-call-procedure/components/bcp-activity-step.component';
import {RemittanceComponent} from '../../remittance/components/remittance.component';
import {AddRemittanceComponent} from '../../remittance/components/add-remittance.component';
import {ConfirmRemittanceComponent} from '../../remittance/components/confirm-remittance.component';
import {CallPreparationComponent} from '../../basic-call-procedure/components/call-preparation.component';
import {StockReturnComponent} from '../../stock-return/components/stock-return.component';
import {UnservedOrderComponent} from '../../basic-call-procedure/components/unserved-order.component';
import {OffersComponent} from '../../basic-call-procedure/components/bcp-offers.component';
import {MpinComponent} from '../../login/components/mpin.component';
import {LoginComponent} from '../../login/components/login.component';
import {AddEditLoadTransferComponent} from '../../basic-call-procedure/components/add-edit-load-transfer.component';
import {AddEditPhysicalOrderComponent} from '../../basic-call-procedure/components/add-edit-physical-order.component';
import {AddSalesOrderPhysicalComponent} from '../../basic-call-procedure/components/add-sales-order-physical.component';
import {BCPAddRetailerRouteComponent} from '../../basic-call-procedure/components/bcp-add-retailer-route.component';
import {CDUnservedOrderComponent} from '../../close-day/components/cd-unserved-order.component';
import {ConfirmCollectionComponent} from '../../basic-call-procedure/components/confirm-collection.component';
import {AddUnservedOrderComponent} from '../../basic-call-procedure/components/add-unserved-order.component';
import {SkipSalesOrderComponent} from '../../basic-call-procedure/components/skip-sales-order.component';
import {SkipCollectionComponent} from '../../basic-call-procedure/components/skip-collection.component';
import {HomeComponent} from '../../shared/components/home.component';
import {AddStockReturnComponent} from '../../stock-return/components/add-stock-return.component';
import {ConfirmStockReturnComponent} from '../../stock-return/components/confirm-stock-return.component';
import {DetailSalesOrderComponent} from '../../close-day/components/detail-sales-order.component';
import {DetailCollectionComponent} from '../../close-day/components/detail-collection.component';
import {DetailRemittanceComponent} from '../../close-day/components/detail-remittance.component';
import {TargetsActualsService} from '../../my-transaction/services/targets-actuals.service';



@Component({
    selector : 'main-page',
    templateUrl: './app/shared/components/main-page.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers : [
        TargetsActualsService
    ]
})

@RouteConfig([
    // PARENT PAGE - START
    {
        path: '/home',
        name: 'Home',
        component: HomeComponent
    },
    {
        path: '/myTransaction',
        name: 'MyTransaction',
        component: MyTransactionComponent
    },
    {
        path: '/basicCallProcedure',
        name: 'BasicCallProcedure',
        component: BasicCallProcedureComponent
    },
    {
        path: '/closeDay',
        name: 'CloseDay',
        component: CloseDayComponent
    },
    {
        path: '/remittance',
        name: 'Remittance',
        component: RemittanceComponent
    },
    {
        path: '/stockReturn',
        name: 'StockReturn',
        component: StockReturnComponent
    },
    // PARENT PAGE - END

    // SHARED PAGE - START
    {
        path: '/targetsActuals',
        name: 'TargetsActuals',
        component: TargetsActualsComponent
    },
    // SHARED PAGE - END

    // UNDER MY TRANSACTION TAB - START
    {
        path: '/inventory',
        name: 'Inventory',
        component: InventoryComponent
    },
    {
        path: '/retailerRoute',
        name: 'RetailerRoute',
        component: RetailerRouteComponent
    },
    {
        path: '/accountsReceivables',
        name: 'AccountsReceivables',
        component: AccountsReceivablesComponent
    },
    {
        path: '/dspAlerts',
        name: 'DSPAlerts',
        component: DSPAlertsComponent
    },
    // UNDER MY TRANSACTION TAB - END

    // UNDER BCP TAB - START
    {
        path: '/bcpActivityStep',
        name: 'BCPActivityStep',
        component: BCPActivityStepComponent
    },
    {
        path: '/bcpAddRetailerRoute',
        name: 'BCPAddRetailerRoute',
        component: BCPAddRetailerRouteComponent
    },
    {
        path: '/callPreparation',
        name: 'CallPreparation',
        component: CallPreparationComponent
    },
    {
        path: 'bcpCollection',
        name: 'BCPCollection',
        component: BCPCollectionComponent
    },
    {
        path: 'confirmCollection',
        name: 'ConfirmCollection',
        component: ConfirmCollectionComponent
    },
    {
        path: '/offer',
        name: 'Offer',
        component: OffersComponent
    },
    {
        path: '/retailerSalesOrder',
        name: 'RetailerSalesOrder',
        component: RetailerSalesOrderComponent
    },
    {
        path: '/addEditLoadTransfer',
        name: 'AddEditLoadTransfer',
        component: AddEditLoadTransferComponent
    },
    {
        path: '/addSalesOrderPhysical',
        name: 'AddSalesOrderPhysical',
        component: AddSalesOrderPhysicalComponent
    },
    {
        path: '/addEditPhysicalOrder',
        name: 'AddEditPhysicalOrder',
        component: AddEditPhysicalOrderComponent
    },
    {
        path: '/salesOrderPayment',
        name: 'SalesOrderPayment',
        component: SalesOrderPaymentComponent
    },
    {
        path: '/unservedOrder',
        name: 'UnservedOrder',
        component: UnservedOrderComponent
    },
    {
        path: '/addUnservedOrder',
        name: 'AddUnservedOrder',
        component: AddUnservedOrderComponent
    },
    {
        path: '/skipSalesOrder',
        name: 'SkipSalesOrder',
        component: SkipSalesOrderComponent
    },
    {
        path: '/skipCollection',
        name: 'SkipCollection',
        component: SkipCollectionComponent
    },

    // UNDER BCP TAB - END

    // UNDER CLOSE OF THE DAY TAB - START
    {
        path: '/detailCollection',
        name: 'DetailCollection',
        component: DetailCollectionComponent
    },
    {
        path: '/detailRemittance',
        name: 'DetailRemittance',
        component: DetailRemittanceComponent
    },
    {
        path: '/detailSalesOrder',
        name: 'DetailSalesOrder',
        component: DetailSalesOrderComponent
    },
    {
        path: '/collection',
        name: 'Collection',
        component: CollectionComponent
    },
    {
        path: '/visitedRetail',
        name: 'VisitedRetail',
        component: VisitedRetailComponent
    },
    {
        path: '/cdUnservedOrder',
        name: 'CDUnservedOrder',
        component: CDUnservedOrderComponent
    },

    // UNDER CLOSE OF THE DAY TAB - END

    // UNDER STOCK RETURN TAB - START
    {
        path: '/addStockReturn',
        name: 'AddStockReturn',
        component: AddStockReturnComponent
    },
    {
        path: '/confirmStockReturn',
        name: 'ConfirmStockReturn',
        component: ConfirmStockReturnComponent
    },

    // UNDER STOCK RETURN TAB - END

    // UNDER REMITTANCE TAB - START
    {
        path: '/addRemittance',
        name: 'AddRemittance',
        component: AddRemittanceComponent
    },
    {
        path: '/confirmRemittance',
        name: 'ConfirmRemittance',
        component: ConfirmRemittanceComponent
    }
    // UNDER REMITTANCE TAB - END

    // UNUSED PAGE - START
    // {
    //     path: '/resetPassword',
    //     name: 'ResetPassword',
    //     component: ResetPasswordComponent
    // },
    // {
    //     path: '/detailRetailer',
    //     name: 'DetailRetailer',
    //     component: DetailRetailerComponent
    // },
    // {
    //     path: '/retailerInventory',
    //     name: 'RetailerInventory',
    //     component: RetailerInventoryComponent
    // },
    // {
    //     path: '/settings',
    //     name: 'Settings',
    //     component: SettingsComponent
    // },
    // UNUSED PAGE - END

])

export class MainPageComponent {

    constructor (
        private _layoutService: LayoutService,
        private _targetsActualsService: TargetsActualsService,
        private _matchMediaService: MatchMediaService) {}

    getResize() {
        return this._matchMediaService.getMm();
    }

}