import {IDSPModel} from '../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class RetailerOutputModel extends IDSPModel{
	retailerId: string;
	storeName: string;
	outletType: string;
	retailerMinDetails:number;
	retailerAddress:string;
	numberofSELFTransaction:number;
	numberofAginfSELFTransaction:number;
	totalAmountSELFTransaction:number;
	DspId:string;
	DspName:string;

	param_to_db;
	Errors: any;

	constructor(pRetailerID: string, pStoreName:string, pOutletType:string, pRetailerMinDetails:number, pRetailerAddress:string, pNumberofSELFTransaction:number, pNumberofAgingSELFTransaction:number, pTotalAmountofSELFTransaction:number, pDspId:string, pDspName:string) {
		super();
		this.retailerId = pRetailerID;
		this.storeName = pStoreName;
		this.outletType = pOutletType;
		this.retailerMinDetails = pRetailerMinDetails;
		this.retailerAddress = pRetailerAddress;
		this.numberofSELFTransaction = pNumberofSELFTransaction;
		this.numberofAginfSELFTransaction = pNumberofAgingSELFTransaction;
		this.totalAmountSELFTransaction = pTotalAmountofSELFTransaction;
		this.DspId = pDspId;
		this.DspName = pDspName;


		this.param_to_db = {
			retailerid : this.retailerId,
			store_name : this.storeName,
			outlet_type : this.outletType,
			retailer_min : this.retailerMinDetails,
			retailer_address : this.retailerAddress,
			number_of_self_transaction : this.numberofSELFTransaction,
			number_of_aging_self_transaction : this.numberofAginfSELFTransaction,
			total_amount_self_transaction : this.totalAmountSELFTransaction,
			dsp_id : this.DspId,
			dsp_name: this.DspName
		}

	}
}