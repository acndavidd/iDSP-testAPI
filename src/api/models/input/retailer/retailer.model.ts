import {IDSPModel} from '../../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class RetailerInputModel extends IDSPModel{
	username: string;
	retailerid: string;
	recordstart: number;
	recordend: number;

	constructor(pUsername: string, pRetailerID: string, pRecordStart: number, pRecordEnd: number) {
		super();
		this.username = pUsername;
		this.retailerid = pRetailerID;
		this.recordstart = pRecordStart;
		this.recordend = pRecordEnd;
	}
}