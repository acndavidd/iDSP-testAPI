import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
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
import {SalesOrderPaymentComponent} from '../../basic-call-procedure/components/sales-order-payment.component';
import {CDTargetsActualsComponent} from '../../close-day/components/cd-targets-actuals.component';
import {VisitedRetailComponent} from '../../close-day/components/visited-retail.component';


@Component({
    selector : 'main-page',
    templateUrl: './app/shared/components/main-page.component.html',
	directives: [
		ROUTER_DIRECTIVES
    ]
})

@RouteConfig([
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
        path: '/settings',
        name: 'Settings',
        component: SettingsComponent
    },
    //UNDER MY TRANSACTION TAB - START
    {
        path: '/targetsActuals',
        name: 'TargetsActuals',
        component: TargetsActualsComponent
    },
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
    //UNDER MY TRANSACTION TAB - END
    
    //UNDER BCP TAB - START
    {
        path: '/retailerSalesOrder',
        name: 'RetailerSalesOrder',
        component: RetailerSalesOrderComponent
    },

    {
        path: '/detailRetailer',
        name: 'DetailRetailer',
        component: DetailRetailerComponent
    },
    {
        path: '/retailerInventory',
        name: 'RetailerInventory',
        component: RetailerInventoryComponent
    },

    {
        path: '/salesOrderPayment',
        name: 'SalesOrderPayment',
        component: SalesOrderPaymentComponent
    },
    //UNDER BCP TAB - END
    
    //UNDER CLOSE DAY TAB - START
    {
        path: '/collection',
        name: 'Collection',
        component: CollectionComponent
    },
    {
        path: '/closeDayTargetsActuals',
        name: 'CDTargetsActuals',
        component: CDTargetsActualsComponent
    },
    {
        path: '/visitedRetail',
        name: 'VisitedRetail',
        component: VisitedRetailComponent
    },
    //UNDER SETTINGS TAB - END
    
    //UNDER SETTINGS TAB - START
    {
        path: '/resetPassword',
        name: 'ResetPassword',
        component: ResetPasswordComponent
    }
    //UNDER SETTINGS TAB - END
    
])

export class MainPageComponent {

	constructor (private _layoutService: LayoutService,
    private _matchMediaService: MatchMediaService) {}
	
	getResize(){
        return this._matchMediaService.getMm();  
    }

}