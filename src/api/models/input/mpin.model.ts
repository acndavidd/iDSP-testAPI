import {IDSPModel} from '../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class MPINModel extends IDSPModel{
	Username: string;

	@IsLength(5,5, {message : 'Invalid MPIN Format'})
	MPIN: string;

	constructor(pUsername: string, pMPIN:string) {
		super();
		this.Username = pUsername;
		this.MPIN = pMPIN;
	}
}