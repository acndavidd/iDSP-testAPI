import {validate, isValid, IsLength} from 'class-validator';

export class LoginModel {
	@IsLength(8,8, {message : 'Invalid DSP ID'})
	Username: string;
	Password: string;
	Errors: any;

	constructor(pUsername: string, pPassword:string) {
		this.Username = pUsername;
		this.Password = pPassword;
	}

	validate() {
		if(!isValid(this)) {
			this.Errors = validate(this);
		}
		return isValid(this);
	}
}