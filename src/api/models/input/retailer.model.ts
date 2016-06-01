import {IDSPModel} from '../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class RetailerModel extends IDSPModel{

	@IsLength(8,8, {message : 'Invalid DSP ID'})
	username: string;
	Errors: any;

	constructor(pUsername: string) {
		super();
		this.username = pUsername;
	}
}