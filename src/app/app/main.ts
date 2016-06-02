///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {IDSPComponent} from './idsp.component';
import {enableProdMode, provide, Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS, BaseRequestOptions, RequestOptions, BrowserXhr} from 'angular2/http';
import {Headers, XHRBackend} from 'angular2/http';
import {ROUTER_PROVIDERS, Router, APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {MyHttp} from './shared/services/my-http.service';
import {Modal} from './shared/services/modal.service';
import 'rxjs/Rx';

declare var configChannel: any;
declare var configAppType: any;


class MyOptions extends BaseRequestOptions {
    headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('accessToken'))
    });
}

@Injectable()
export class CustomBrowserXhr extends BrowserXhr {
    constructor() {
        super();
    }
    build(): any {
        let xhr = super.build();
        xhr.withCredentials = true;
        return <any>(xhr);
    }
}

enableProdMode();

bootstrap(IDSPComponent, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide(APP_BASE_HREF, { useValue: getPath() }),
    HTTP_PROVIDERS,
    provide(Http, {
        useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, _router: Router, _modalService: Modal.ModalService ) => {
            let originalHttp = new Http(xhrBackend, requestOptions);
            return new MyHttp(originalHttp, _router, _modalService);
        },
        deps: [XHRBackend, RequestOptions, Router]
    }),
    provide(BrowserXhr, { useClass: CustomBrowserXhr })
]);

function getPath() {
    var str = window.location.href;
    var res = str.replace('index.html', '');
    if (configChannel === 'web') {
        res = '/';
    }
    return res;
}