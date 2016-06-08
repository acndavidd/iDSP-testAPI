import {IDSPModel} from '../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class RetailerOutputProfileModel extends IDSPModel{
		retailerID:string;
		storeName: string;
		outletType:string;
		subOutletType:string;
		ownerFirstName:string;
		ownerMiddleName:string;
		ownerLastName:string;
		personalMin:string;
		storeAddress:string;
		civilStatus:string;
		email:string;
		gender:string;
		birthday:string;
		totalAmountofSelfTransaction:string;
		valueSegment:string;
		threshold:string;
		dspId:string;
		dspName:string;
		firstRetailerMIN:string
		retailer_profile;
		Errors:any;

	constructor( ) {
		super();
	}
	
	getRetailerProfile(){

		// this.retailer_profile = {
		// 		retailer_id : pParam.retailerID,
		// 		store_name : pParam.storeName,
		// 		outlet_type : outletType,
		// 		sub_outlet_type : subOutletType,
		// 		owner_first_name : ownerFirstName,
		// 		owner_middle_name : ownerMiddleName,
		// 		owner_last_name :	ownerLastName,
		// 		personal_min :	personalMin,
		// 		store_address :	storeAddress,
		// 		civil_status :	civilStatus,
		// 		email :	email,
		// 		gender :	gender,
		// 		birthday :	birthday,
		// 		total_amount_self_transaction :	totalAmountofSelfTransaction,
		// 		value_segment :	valueSegment,
		// 		threshold :	threshold,
		// 		dsp_id : dspId,
		// 		dsp_name :	dspName,
		// 		first_retailer_min : firstRetailerMIN
		// 	}
	}
	
}