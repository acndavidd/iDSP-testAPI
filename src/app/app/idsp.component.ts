import {Component, OnInit} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {FastClickStatic} from './shared/fastclick/fastclick.d';
import {MatchMediaService} from './shared/services/match-media.service';
import {LayoutService} from './shared/services/layout.service';
import {PageNavigationService} from './shared/services/page-navigation.service';
import {AuthenticationService} from './shared/services/authentication.service';
import {LoginComponent} from './login/components/login.component';
import {VerificationComponent} from './verification/components/verification.component'; 
import {HeaderComponent} from './shared/components/header.component';
import {FooterMenuComponent} from './shared/components/footer-menu.component';
import {HeaderService} from './shared/services/header.service';
import {MainPageComponent} from './shared/components/main-page.component';
import {ForgotPasswordComponent} from './login/components/forgot-password.component';
import {ModalComponent} from './shared/components/modal.component';
import {ModalService} from './shared/services/modal.service';
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
        HeaderService,
        ModalService
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
        path: '/forgotpassword',
        name: 'ForgotPassword',
        component: ForgotPasswordComponent
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
         let currentPage: string = this._layoutService.getCurrentPage();
         return !currentPage || currentPage === 'GetStarted' || currentPage === 'Login' ||
         currentPage === 'Register';
     }
 
     isSmallScreen() {
         return !this._matchMediaService.getmm().largeUp;
     }
}

