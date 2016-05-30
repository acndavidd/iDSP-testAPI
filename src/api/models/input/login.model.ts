import {IDSPModel} from '../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class LoginModel extends IDSPModel{

	@IsLength(8,8, {message : 'Invalid DSP ID'})
	Username: string;

	Password: string;
	Errors: any;

	constructor(pUsername: string, pPassword:string) {
		super();
		this.Username = pUsername;
		this.Password = pPassword;
	}
}