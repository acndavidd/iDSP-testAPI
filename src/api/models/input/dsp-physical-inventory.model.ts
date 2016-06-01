import {IDSPModel} from '../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class DspPhysicalInventoryModel extends IDSPModel{

	username: string;
	type: string;
	recordStart: string;
	recordEnd: string;
	brand: string;
	subCategory: string;

	constructor(pUsername: string, pType:string, pRecordStart:string, pRecordEnd:string, pBrand:string, pSubCategory:string) {
		super();
		this.username = pUsername;
		this.type = pType;
		this.recordStart = pRecordStart;
		this.recordEnd = pRecordEnd;
		this.brand = pBrand;
		this.subCategory = pSubCategory;
	}
}