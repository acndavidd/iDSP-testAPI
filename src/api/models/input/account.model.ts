import {IDSPModel} from '../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class Account extends IDSPModel {
	Username: string;
	Password: string;

	constructor(pUsername: string, pPassword:string) {
		super();
		this.Username = pUsername;
		this.Password = pPassword;
	}
}