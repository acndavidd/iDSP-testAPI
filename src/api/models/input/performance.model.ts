import {IDSPModel} from '../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class PerformanceModel extends IDSPModel{

	@IsLength(8,8, {message : 'Invalid DSP ID'})
	salesPerson: string;
	actualType: string;
	brand: string;
	Errors: any;

	constructor(psalesPerson: string, pActualType:string, pBrand:string) {
		super();
		this.salesPerson = psalesPerson;
		this.actualType = pActualType;
		this.brand = pBrand;
	}
}