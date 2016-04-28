import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response,RequestOptionsArgs,Headers,Http,Connection,RequestOptions} from 'angular2/http';

@Injectable()

export class AuthenticationService{
	private service_url:string;
	private error_msg:string;
	private is_loading:boolean;

	constructor(
		private _http: Http,
		private _router: Router){

		this.is_loading = false;
	}

	login(username:string,password:string){
		if(!this.loginValidation(username,password)){
			this.error_msg = 'Invalid username or password';
		}else{
			this.is_loading = true;
			this.loginService(username,password);
		}
	}

	loginValidation(username:string,password:string):boolean{
		if(username == null || username == "")return false;
		if(password == null || password  == "")return false;
		return true;
	}

	loginService(username:string,password:string):boolean{
		let data:string = 'username='+username+'&password='+password;
		this._http.post('/login',data,
			<RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/x-www-form-urlencoded'})
            }).subscribe(
            	response => {
            		this.is_loading = false;
            		if(response.json().success == 1){//success login
            			//set token to local storage(mobile)
            			localStorage.setItem('accessToken', response.json().token);
            			this._router.navigate(['MyTransaction']);
            		}else{//failed login
            			this.error_msg = response.json().error;
            		}
            	},
            	error => {
            		console.log(error);
            		this.error_msg = 'failed connecting to login service';
            	}
            );
       	return false;
	}

	checkToken():boolean{
		this._http.get('/check')
            .subscribe(
            	response => {
            		console.log(response);
            	},
            	error => {
            		console.log(error);
            	}
            );
        return false;
	}

	getError():string{
		return this.error_msg;
	}

	getLoadingState():boolean{
		return this.is_loading;
	}
}