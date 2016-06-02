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
    vTimeoutObs: Observable<void>;
    constructor( 
        private _authenticationService: AuthenticationService,
        private _router: Router,
        private _layoutService: LayoutService,
        private _modalService: Modal.ModalService,
        private _pageNavigationService: PageNavigationService) {
        this.vTimeout = 10000;
    }

    getTimeout() {
        return this.vTimeout;
    }

    setTimeout(pTimeout: number) {
        this.vTimeout = pTimeout;
    }

    resetTimeout() {
        this.vTimeout = 10000;
    }

    startTimer() {
        console.log(Date.now() + '     start timer : ' + this.vTimeout);
        let vCurrentContext = this;
        return Observable.create(pObserever => {
            let timer = setInterval(function() {
                vCurrentContext.vTimeout -= 1000;
                console.log(vCurrentContext.vTimeout);
                if(vCurrentContext.vTimeout === 0) {
                    vCurrentContext.timeoutEvent();
                    clearInterval(timer);
                }
            }, 1000);
            pObserever.complete();
        });
    }

    timeoutEvent() {
        console.log('Anjay : ' + Date.now());
    }
}