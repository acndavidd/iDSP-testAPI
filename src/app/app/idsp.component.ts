import {Component, Renderer, OnInit} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {FastClickStatic} from './shared/fastclick/fastclick.d';
import {MatchMediaService} from './shared/services/match-media.service';
import {LayoutService} from './shared/services/layout.service';
import {HeaderService} from './shared/services/header.service';
import {PageNavigationService} from './shared/services/page-navigation.service';
import {SQLiteService} from './shared/services/sqlite.service';
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
import {MpinComponent} from './login/components/mpin.component';
import {ModalComponent} from './shared/components/modal.component';
import {RetailerRouteComponent} from './my-transaction/components/retailer-route.component';
import {Modal} from './shared/services/modal.service';
import {RetailerService} from './shared/services/retailer.service';
import {RetailerSalesOrderComponent} from './basic-call-procedure/components/retailer-sales-order.component';
import {DetailRetailerComponent} from './basic-call-procedure/components/detail-retailer.component';
import {SalesOrderPaymentComponent} from './basic-call-procedure/components/sales-order-payment.component';
import {LeftMenuComponent} from './shared/components/left-menu.component';
import {IdleService} from './shared/services/idle.service';
import {Observable} from 'rxjs/Observable';

declare var FastClick: FastClickStatic;
declare var configChannel: any;

@Component({
    selector: 'idsp-app',
    template: `
        <div id="content"
            (window:resize)="OnResize()"
            (window:scroll)="OnScroll()"
            (window:click)="OnClick()">
            <idsp-header></idsp-header>
            <my-modal></my-modal>
            <left-menu></left-menu>
            <router-outlet></router-outlet>
            <idsp-footer-menu></idsp-footer-menu>
        </div>
    `,

    directives: [
        HeaderComponent,
        FooterMenuComponent,
        ModalComponent,
        ROUTER_DIRECTIVES,
        LeftMenuComponent
    ],
    providers: [
        ROUTER_PROVIDERS,
        MatchMediaService,
        LayoutService,
        PageNavigationService,
        SQLiteService,
        AuthenticationService,
        Modal.ModalService,
        HeaderService,
        RetailerService,
        IdleService
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
        path: '/mPin',
        name: 'Mpin',
        component: MpinComponent
    },
    {
        path: '/**',
        redirectTo: ['Starter', 'Login']
    }

])
export class IDSPComponent implements OnInit {

    globalListenFunc: Function;
    timerObservables: Observable<any>;
    constructor ( private _matchMediaService: MatchMediaService,
    private _router: Router,
    private _layoutService: LayoutService,
    private _pageNavigationService: PageNavigationService,
    private _renderer: Renderer,
    private _modalService: Modal.ModalService,
    private _idleService: IdleService ) {
        new FastClick(document.body);
        this.globalListenFunc = _renderer.listenGlobal('document', 'backbutton', (event) => {
            // put pageNavigationService
            this._pageNavigationService.gotoPreviousPage();
            console.log('angular back button');
        });
        this._idleService.startTimer().subscribe();
    }

    ngOnInit() {
        this.OnResize();
        if (configChannel === 'app') {
            this._router.navigate(['Starter', 'Login']);
        }
    }

    OnResize() {
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

    ngOnDestroy() {
        this.globalListenFunc();
    }

    OnScroll() {
        console.log('scrolled');
    }

    OnClick() {
        console.log('clicked');
        this._idleService.resetTimeout();
    }
}

