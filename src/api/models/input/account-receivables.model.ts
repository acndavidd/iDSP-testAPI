import {IDSPModel} from '../idsp.model';
import {isValid} from 'class-validator';

export class AccountReceivableModel extends IDSPModel {
	Username: string;
	RouteDay: number;
	Source: string;
	RetailerId: string;
	RetailerName: string;
	RetailerMin: string;
	TotalAmount: number;
	RecordStart: number;
	RecordEnd: number;

	ParamSpSelf;
	ParamSpBcp;
	ParamOpis;

	constructor(pUsername: string, pDay:number, pSource: string, pRetailerId: string, pRetailerName: string, pRetailerMin: string, pTotalAmount: number, pRecordStart: number, pRecordEnd: number) {
		super();
		this.Username = pUsername;
		this.RouteDay = pDay;
		this.Source = pSource;
		this.RetailerId = pRetailerId;
		this.RetailerName = pRetailerName;
		this.RetailerMin = pRetailerMin;
		this.TotalAmount = pTotalAmount;
		this.RecordStart = pRecordStart;
		this.RecordEnd = pRecordEnd;
		
		this.ParamSpSelf = {
			source : this.Source,
			routeday : this.RouteDay,
			retailer_id : this.RetailerId,
			retailer_name : this.RetailerName,
			retailer_min : this.RetailerMin,
			self_amount : this.TotalAmount
		};

		this.ParamOpis = {
			username : this.Username,
			recordstart : this.RecordStart,
			recordend : this.RecordEnd,
			retailername : this.RetailerName,
			retailermin : this.RetailerMin
		}

		this.ParamSpBcp = {
			username : this.Username,
			routeday : this.RouteDay,
			source : this.Source
		};
	}
}