import {IDSPModel} from '../idsp.model';
import {isValid, IsLength} from 'class-validator';

export module Account {
	export class Account extends IDSPModel {

		Username: string;
		Password: string;

		constructor(pUsername: string, pPassword:string) {
			super();
			this.Username = pUsername;
			this.Password = pPassword;
		}
	}

	export class MPIN extends IDSPModel {

		Username: string;
		MPIN: string;

		constructor(pUsername: string, pMPIN:string) {
			super();
			this.Username = pUsername;
			this.MPIN = pMPIN;
		}
	}
}