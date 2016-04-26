import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response,RequestOptionsArgs,Headers,Http,Connection,RequestOptions} from 'angular2/http';

@Injectable()

export class AuthenticationService{
	private service_url:string;
	private error_msg:string;

	constructor(private _http: Http){
		this.service_url = 'http://127.0.0.1:8080/api';
	}

	login(username:string,password:string){
		console.log(username + '   ' + password);
		if(!this.loginValidation(username,password)){
			this.error_msg = 'Invalid username or password';
		}else{
			console.log('call login service');
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
		this._http.post(this.service_url + '/login',data,
			<RequestOptionsArgs> {headers: new Headers(
                {'Content-Type': 'application/x-www-form-urlencoded'})
            }).subscribe(
            	response => {
            		console.log(response);
            	},
            	error => {
            		console.log(error);
            	}
            );
       	return false;
	}
}