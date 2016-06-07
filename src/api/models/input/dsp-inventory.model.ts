import {IDSPModel} from '../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class DspInventoryModel extends IDSPModel{

	username: string;

	constructor(pUsername: string) {
		super();
		this.username = pUsername;
	}
}