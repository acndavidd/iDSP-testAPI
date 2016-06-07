import {IDSPModel} from '../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class RetailerProfileModel extends IDSPModel{

	@IsLength(8,8, {message : 'Invalid DSP ID'})
	username: string;

	retailerid: string;

	Errors:any;

	constructor(pUsername:string, pRetailerId: string) {
		super();
		this.username = pUsername;
		this.retailerid = pRetailerId;
	}
}