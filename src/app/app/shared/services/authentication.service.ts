import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';
import {Modal} from './modal.service';
import {LayoutService} from './layout.service';

@Injectable()

export class AuthenticationService {
    private vServiceUrl: string;
    private vErrorMsg: string;
    private vIsLoading: boolean;

    constructor(
        private _http: Http,
        private _router: Router,
        private _layoutService: LayoutService,
        private _modalService: Modal.ModalService) {

        this.vIsLoading = false;
    }

    login(pUsername: string, pPassword: string) {
        if (!this.loginValidation(pUsername, pPassword)) {
            this.vErrorMsg = 'Invalid username or password';
        } else {
            this.vIsLoading = true;
            this.loginService(pUsername, pPassword);
        }
    }

    autoLogin() {
        this._http.get('/verifyToken',
            <RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/x-www-form-urlencoded'})
            }).subscribe(
                response => {
                    this.vIsLoading = false;
                    if (response.json().success === 1) {// success login
                        // set token to local storage(mobile)
                        // this._router.navigate(['MyTransaction']);
                        this._router.navigate(['MainPage', 'MyTransaction']);
                    } else {// failed login
                        this.vErrorMsg = response.json().error;
                    }
                },
                error => {
                    console.log(error);
                    this.vErrorMsg = 'failed connecting to login service';
                }
            );
    }

    loginValidation(pUsername: string, pPassword: string): boolean {
        console.log('Start validate user and password ' + pUsername + ' : ' +  pPassword);
        if (pUsername === null || pUsername === '') return false;
        if (pPassword === null || pPassword  === '') return false;
        return true;
    }

    loginService(pUsername: string, pPassword: string): boolean {
        console.log('Start hit login service');
        let vData = {
            username : pUsername,
            password : pPassword
        };
        this._http.post('/login', JSON.stringify(vData)).subscribe(
                response => {
                    if (response.json().success === 1) { // success login
                        // set token to local storage(mobile)
                        localStorage.setItem('accessToken', response.json().token);
                        console.log('Login Sukses with token ' + response.json().token);
                        // this._router.navigate(['MyTransaction']);
                        this._router.navigate(['MainPage', 'MyTransaction']);
                    } else {// failed login
                        this.vErrorMsg = response.json().error;
                    }
                },
                error => {
                    console.log(error);
                    this.vErrorMsg = 'failed connecting to login service';
                }
            );
        return false;
    }

    logoutCallBack(pParams) {
        // trigger logout service and remove localstorage data for mobile
        pParams._layoutService.toggleLeftMenu();
        pParams._layoutService.toggleHeader();
        pParams._modalService.vShowModal = false;
        pParams._router.navigate(['Starter', 'Login']);
    } 

    logout() {
        let params = {
            _layoutService : this._layoutService,
            _router : this._router,
            _modalService : this._modalService
        };
        this._modalService.toggleModal('Are you sure you<br/>want to Logout ?', Modal.ModalType.CONFIRMATION, { ModalButton : Modal.ModalButton.OK_CANCEL, callback : this.logoutCallBack, param : params });
        /*
        this._http.get('/logout').subscribe(
            response => {
                if (response.json().success === 1) { // success login
                    // remove token of mobile device
                    localStorage.removeItem('accessToken');
                } else { // failed login
                    console.log(response.json().error);
                }
            },
            error => {
                console.log(error);
            }
        );
        this._router.navigate(['Starter']);*/
    }

    getError(): string {
        return this.vErrorMsg;
    }

    getLoadingState(): boolean {
        return this.vIsLoading;
    }
}