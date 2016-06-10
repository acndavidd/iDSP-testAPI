import {IDSPModel} from '../../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class RetailerSalesOrderModel extends IDSPModel {
	minSource: string;
	minDestination: string;
	nominalValue: string;
	source: string;
	dspId: string;
	retailerId: string;
	orderDate: string;
	remarks: string;
	totalAmount: number;
	promoAmount: number;
	netAmount: number;
	paymentAmount: number;
	balance: number;
	paymentStatus: string;
	orderStatus: string;
	loadAmount: number;
	loadPromoCode: string;
	loadPromoAmount: number;
	loadRRN: string;
	loadStatus: string;
	phyQuantity: number;
	phyPrice: number;
	phyPromoPrice: number;
	vParamSalesOrder;
	vParamLoadSalesOrder;
	vParamPhySalesOrder;
	vParamELPLoadTransfer;

	constructor(
		pMinSource: string,
		pMinDestination: string,
		pNominalValue: string,
		pSource: string,
		pRetailerId: string,
		pDspId?: string,
		pOrderDate?: string,
		pRemarks?: string,
		pTotalAmount?: number,
		pPromoAmount?: number,
		pNetAmount?: number,
		pPaymentAmount?: number,
		pBalance?: number,
		pPaymentStatus?: string,
		pOrderStatus?: string,
		pLoadAmount?: number,
		pLoadPromoCode?: string,
		pLoadPromoAmount?: number,
		pLoadRRN?: string,
		pLoadStatus?: string,
		pPhyQuantity?: number,
		pPhyPrice?: number,
		pPhyPromoPrice?: number)
	{
		super();
		this.minSource = pMinSource;
		this.minDestination = pMinDestination;
		this.nominalValue = pNominalValue;
		this.source = pSource;
		this.dspId = pDspId;
		this.retailerId = pRetailerId;
		this.orderDate = pOrderDate;
		this.remarks = pRemarks;
		this.totalAmount = pTotalAmount;
		this.promoAmount = pPromoAmount;
		this.netAmount = pNetAmount;
		this.paymentAmount = pPaymentAmount;
		this.balance = pBalance;
		this.paymentStatus = pPaymentStatus;
		this.orderStatus = pOrderStatus;
		this.loadAmount = pLoadAmount;
		this.loadPromoCode = pLoadPromoCode;
		this.loadPromoAmount = pLoadPromoAmount;
		this.loadRRN = pLoadRRN;
		this.loadStatus = pLoadStatus;
		this.phyQuantity = pPhyQuantity;
		this.phyPrice = pPhyPrice;
		this.phyPromoPrice = pPhyPromoPrice;

		this.vParamSalesOrder = {
			dsp_id : this.dspId,
			retailer_id : this.retailerId,
			order_date : this.orderDate,
			remarks : this.remarks,
			total_amount : this.totalAmount,
			promo_amount : this.promoAmount,
			net_amount : this.netAmount,
			payment_amount : this.paymentAmount,
			balance : this.balance,
			payment_status : this.paymentStatus,
			order_status : this.orderStatus
		};

		this.vParamLoadSalesOrder = {
			amount : this.loadAmount,
			promo_code : this.loadPromoCode,
			promo_amount : this.loadPromoAmount,
			rrn : this.loadRRN,
			status : this.loadStatus
		};

		this.vParamPhySalesOrder = {
			quantity : this.phyQuantity,
			price : this.phyPrice,
			promo_price : this.phyPromoPrice
		};

		this.vParamELPLoadTransfer = {
			min_source : this.minSource,
			min_destination : this.minDestination,
			nominal_value : this.nominalValue,
			source : this.source
		}
	}
}