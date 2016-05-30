import {Injectable} from 'angular2/core';
import {AuthenticationService} from './authentication.service';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';
import {Modal} from './modal.service';
import {LayoutService} from './layout.service';
import {PageNavigationService} from './page-navigation.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class IdleService {
    vTimeout: number;

    constructor( 
        private _authenticationService: AuthenticationService,
        private _router: Router,
        private _layoutService: LayoutService,
        private _modalService: Modal.ModalService,
        private _pageNavigationService: PageNavigationService) {
        this.vTimeout = 60000;
    }

    getTimeout() {
        return this.vTimeout;
    }

    setTimeout(pTimeout: number) {
        this.vTimeout = pTimeout;
    }

    resetTimeout() {
        this.vTimeout = 60000;
    }

    startTimer(pObservables: Observable<any>) {
        if(!pObservables) {
            pObservables = Observable.create( obs => {
                
            });
        }
    }

    timeoutEvent() {
        
        this._authenticationService.logoutCallBack(this);
    }
}