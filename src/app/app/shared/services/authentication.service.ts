import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response,RequestOptionsArgs,Headers,Http,Connection,RequestOptions} from 'angular2/http';
import {MyHttp} from './my-http.service'

@Injectable()

export class AuthenticationService{
	private service_url:string;
	private error_msg:string;

	constructor(private _http: Http){
		
	}

	login(username:string,password:string){
		if(!this.loginValidation(username,password)){
			this.error_msg = 'Invalid username or password';
		}else{
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
		this._http.get('/login',data,
			<RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/x-www-form-urlencoded'})
            }).subscribe(
            	response => {
            		localStorage.setItem('accessToken', response.json().token);
            	},
            	error => {
            		console.log(error);
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
	}

	getError():string{
		return this.error_msg;
	}
}