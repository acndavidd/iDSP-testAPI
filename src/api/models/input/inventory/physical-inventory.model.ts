import {IDSPModel} from '../../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class PhysicalInventoryModel extends IDSPModel{

	salesperson: string;
	retailerid: string;
	Errors: any;

	constructor(psalesPerson: string, pRetailerId:string) {
		super();
		this.salesperson = psalesPerson;
		this.retailerid = pRetailerId;
	}
}