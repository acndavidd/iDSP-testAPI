import {IDSPModel} from '../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class DspInventoryModel extends IDSPModel{

	username: string;
	type: string;

	constructor(pUsername: string, pType:string) {
		super();
		this.username = pUsername;
		this.type = pType;
	}
}