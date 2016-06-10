import {IDSPModel} from '../../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class CallInfoModel extends IDSPModel{

	// @IsLength(8,8, {message : 'Invalid DSP ID'});
	username: string;
	retailerid: string;
	day : number

	constructor(pUsername:string, pRetailerId: string, pDay : number) {
		super();
		this.username = pUsername;
		this.retailerid = pRetailerId;
		this.day = pDay;
	}
}