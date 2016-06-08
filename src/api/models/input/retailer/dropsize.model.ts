import {IDSPModel} from '../../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class DropsizeModel extends IDSPModel{
	brand: string;
	month: number;
	retailer_id: string;
	subcat_type: string;
	paramLoad;

	constructor(pBrand: string, pMonth: number, pRetailerId: string, pSubcatType: string) {
		super();
		this.brand = pBrand;
		this.month = pMonth;
		this.retailer_id = pRetailerId;
		this.subcat_type = pSubcatType;

		this.paramLoad = {
			brand : this.brand,
			month : this.month,
			retailer_id : this.retailer_id,
			subcat_type : this.subcat_type
		}
	}
}