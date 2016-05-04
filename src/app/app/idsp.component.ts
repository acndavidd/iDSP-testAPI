import {Component, OnInit} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {FastClickStatic} from './shared/fastclick/fastclick.d';
import {MatchMediaService} from './shared/services/match-media.service';
import {LayoutService} from './shared/services/layout.service';
import {HeaderService} from './shared/services/header.service';
import {PageNavigationService} from './shared/services/page-navigation.service';
import {AuthenticationService} from './shared/services/authentication.service';
import {LoginComponent} from './login/components/login.component';
import {HeaderComponent} from './shared/components/header.component';
import {FooterMenuComponent} from './shared/components/footer-menu.component';
import {MainPageComponent} from './shared/components/main-page.component';
import {MyTransactionComponent} from './my-transaction/components/my-transaction.component';
import {BasicCallProcedureComponent} from './basic-call-procedure/components/basic-call-procedure.component';
import {CloseDayComponent} from './close-day/components/close-day.component';
import {SettingsComponent} from './settings/components/settings.component';
import {VerificationComponent} from './verification/components/verification.component';
import {ForgotPasswordComponent} from './login/components/forgot-password.component';
import {ModalComponent} from './shared/components/modal.component';
import {ModalService} from './shared/services/modal.service';
import {RetailerService} from './shared/services/retailer.service';
import {RetailerSalesOrderComponent} from './basic-call-procedure/components/retailer-sales-order.component';
import {SalesOrderPaymentComponent} from './basic-call-procedure/components/sales-order-payment.component';


declare var FastClick: FastClickStatic;
declare var configChannel: any;

@Component({
    selector: 'idsp-app',
    template: `
    	<div id="content"
            (window:resize)="OnResize()">
            <idsp-header></idsp-header>
            <my-modal></my-modal>
    		<router-outlet></router-outlet>
            <idsp-footer-menu></idsp-footer-menu>
    	</div>
    `,

    directives: [
        HeaderComponent,
        FooterMenuComponent,
        ModalComponent,
        ROUTER_DIRECTIVES
    ],
    providers: [
        ROUTER_PROVIDERS,
        MatchMediaService,
        LayoutService,
        PageNavigationService,
        AuthenticationService,
        ModalService,
        HeaderService,
        RetailerService
    ]
})

@RouteConfig([
    {
        path: '/login',
        name: 'Starter',
        component: LoginComponent,
        useAsDefault: true
    },
    {
        path: '/verification',
        name: 'Verification',
        component: VerificationComponent
    },
    {
        path: './...',
        name: 'MainPage',
        component: MainPageComponent
    },
    {
        path: '/forgotPassword',
        name: 'ForgotPassword',
        component: ForgotPasswordComponent
    },

    {
        path: '/retailerSalesOrder',
        name: 'RetailerSalesOrder',
        component: RetailerSalesOrderComponent
    },
    {
        path: '/salesOrderPayment',
        name: 'SalesOrderPayment',
        component: SalesOrderPaymentComponent
    }
])
export class IDSPComponent implements OnInit {

	constructor ( private _matchMediaService: MatchMediaService,
    private _router: Router,
    private _layoutService: LayoutService) {
        new FastClick(document.body);
    }

    ngOnInit(){
    	this.OnResize();
        if(configChannel === 'app'){
            this._router.navigate(['Starter', 'Login']);
        }
    }

    OnResize(){
        this._matchMediaService.OnResize();
    }

     isFullScreen() {
         let vCurrentPage: string = this._layoutService.getCurrentPage();
         return !vCurrentPage || vCurrentPage === 'GetStarted' || vCurrentPage === 'Login' ||
         vCurrentPage === 'Register';
     }
 
     isSmallScreen() {
         return !this._matchMediaService.getMm().largeUp;
     }
}

