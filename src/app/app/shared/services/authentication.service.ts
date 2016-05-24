import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';
import {Modal} from './modal.service';
import {LayoutService} from './layout.service';
import {PageNavigationService} from './page-navigation.service';

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
                let vResponse = JSON.parse(response.json());
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
                this._modalService.showErrorModal(this.vErrorMsg);
            }
        );
    }

    submitMPIN(pMPIN: string) {
        let vData = {
            Username : this.vDSPID,
            MPIN : pMPIN
        };
        this._http.post('/submitMPIN', JSON.stringify(vData)).subscribe(
            response => {
                console.log(response);
            },
            error => {
                this.vErrorMsg = 'failed connecting to login service';
                this._modalService.showErrorModal(this.vErrorMsg);
            }
        );
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
    }

    getLoadingState(): boolean {
        return this.vIsLoading;
    }
}