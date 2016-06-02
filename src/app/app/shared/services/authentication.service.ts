import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';
import {Modal} from './modal.service';
import {LayoutService} from './layout.service';
import {PageNavigationService} from './page-navigation.service';

declare var configChannel: any;

@Injectable()

export class AuthenticationService {
    private vServiceUrl: string;
    private vErrorMsg: string;
    private vIsLoading: boolean;
    private vDSPID: string;

    constructor(
        private _http: Http,
        private _router: Router,
        private _layoutService: LayoutService,
        private _modalService: Modal.ModalService,
        private _pageNavigationService: PageNavigationService) {
    }

    login(pUsername: string, pPassword: string) {
        if (!this.loginValidation(pUsername, pPassword)) {
            this.vErrorMsg = 'Invalid Username or Password';
            this._modalService.showErrorModal(this.vErrorMsg);
        } else {
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
        if (pUsername === undefined || pUsername === null || pUsername === '') return false;
        if (pPassword === undefined || pPassword === null || pPassword  === '') return false;
        return true;
    }

    loginService(pUsername: string, pPassword: string) {
        let vData = {
            Username : pUsername,
            Password : pPassword
        };
        this._http.post('/login', JSON.stringify(vData)).subscribe(
            response => {
                let vResponse = response.json();
                if(vResponse.Status === 200) {
                    this.vDSPID = pUsername;
                    alert('MPIN : ' + vResponse.MPIN);
                    this._router.navigate(['Mpin']);
                }else {
                    this.vErrorMsg = vResponse.StatusMessage;
                    this._modalService.showErrorModal(this.vErrorMsg);
                }
            },
            error => {
                this.vErrorMsg = 'Failed connecting to login service';
                console.log(error);
                this._modalService.showErrorModal(this.vErrorMsg);
            }
        );
    }

    submitMPIN(pMPIN: string) {
        console.log(this.vDSPID);
        let vData = {
            Username : 'DSP00001',
            MPIN : pMPIN
        };
        this._http.post('/login/MPIN', JSON.stringify(vData)).subscribe(
            response => {
                let vResponse = response.json();
                if(vResponse.Status === 200) {
                    // Set accessToken to localstorage for mobile apps
                    if(configChannel === 'app') {
                        localStorage.setItem('accessToken', vResponse.accessToken);
                    }
                    this._pageNavigationService.navigate('Home', null, null);
                }else {
                    this.vErrorMsg = vResponse.StatusMessage;
                    this._modalService.showErrorModal(this.vErrorMsg);
                }
            },
            error => {
                this.vErrorMsg = 'failed connecting to login service';
                this._modalService.showErrorModal(this.vErrorMsg);
            }
        );
    }

    test() {
        this._http.get('/verifyToken').subscribe(
            response => {
                let vResponse = response.json();
                if(vResponse.Status === 200) {
                   alert(vResponse.TokenObject.body.DSP_ID);
                }
            },
            error => {
                
            }
        );
    }

    logoutCallBack(pParams) {
        // trigger logout service to clear session cookies and remove localstorage data for mobile
        pParams._http.get('/logout').subscribe(
            response => {
                // remove accessToken from localstorage for mobile apps
                if(configChannel === 'app') {
                    localStorage.removeItem('accessToken');
                }
                pParams._layoutService.hideLeftMenu();
                pParams._layoutService.toggleHeader();
                pParams._modalService.vShowModal = false;
            },
            error => {
                // this.vErrorMsg = 'failed connecting to login service';
                // this._modalService.showErrorModal(this.vErrorMsg);
            }
        );
        pParams._router.navigate(['Starter', 'Login']);
    } 

    logout() {
        let params = {
            _layoutService : this._layoutService,
            _router : this._router,
            _modalService : this._modalService,
            _http : this._http
        };
        this._modalService.toggleModal('Are you sure you<br/>want to Logout ?', Modal.ModalType.CONFIRMATION, { ModalButton : Modal.ModalButton.OK_CANCEL, callback : this.logoutCallBack, param : params });
    }

    getLoadingState(): boolean {
        return this.vIsLoading;
    }
}