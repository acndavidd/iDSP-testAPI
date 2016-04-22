import {Component, OnInit} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {FastClickStatic} from './shared/fastclick/fastclick.d';
import {MatchMediaService} from './shared/services/match-media.service';
import {LayoutService} from './shared/services/layout.service';
import {PageNavigationService} from './shared/services/page-navigation.service';
import {LoginComponent} from './login/components/login.component';
import {HeaderComponent} from './shared/components/header.component';
import {FooterMenuComponent} from './shared/components/footer-menu.component';
declare var FastClick: FastClickStatic;
declare var configChannel: any;

@Component({
    selector: 'idsp-app',
    template: `
    	<div id="content"
            (window:resize)="OnResize()">
            <idsp-header></idsp-header>
    		<router-outlet></router-outlet>
            <idsp-footer-menu></idsp-footer-menu>
    	</div>
    `,
    directives: [
        HeaderComponent,
        FooterMenuComponent,
        ROUTER_DIRECTIVES
    ],
    providers: [
        ROUTER_PROVIDERS,
        MatchMediaService,
        LayoutService,
        PageNavigationService,
    ]
})

@RouteConfig([
    {
        path: '/login',
        name: 'Starter',
        component: LoginComponent,
        useAsDefault: true
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

