import {IDSPModel} from '../../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class SelfTransactionRetailerModel extends IDSPModel{

	// @IsLength(8,8, {message : 'Invalid DSP ID'});
	username: string;
	retailerid: string;
	recordstart: number;
	recordend: number;

	constructor(pUsername:string, pRetailerId: string, pRecordStart :number; pRecordEnd:number) {
		super();
		this.username = pUsername;
		this.retailerid = pRetailerId;
		this.recordstart = pRecordStart;
		this.recordend = pRecordEnd;
	}
}