import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {MyTransactionComponent} from '../../my-transaction/components/my-transaction.component';
import {BasicCallProcedureComponent} from '../../basic-call-procedure/components/basic-call-pro.component';
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

@Component({
    selector : 'MainPage',
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
        path: '/BCP',
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
    //UNDER BCP TAB - END
    
    //UNDER CLOSE DAY TAB - START
    {
        path: '/collection',
        name: 'Collection',
        component: CollectionComponent
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
        return this._matchMediaService.getmm();  
    }

}