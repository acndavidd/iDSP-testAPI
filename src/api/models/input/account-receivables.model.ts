import {IDSPModel} from '../idsp.model';
import {isValid} from 'class-validator';

export class AccModel extends IDSPModel {
	Username: string;
	RouteDay: number;
	Source: string;
	RetailerId: string;
	RetailerName: string;
	RetailerMin: string;
	TotalAmount: number;

	ParamSpSelf;
	ParamSpBcp;
	ParamOpis;

	constructor(pUsername: string, pDay:number, pSource: string, pRetailerId: string, pRetailerName: string, pRetailerMin: string, pTotalAmount: number) {
		super();
		this.Username = pUsername;
		this.RouteDay = pDay;
		this.Source = pSource;
		this.RetailerId = pRetailerId;
		this.RetailerName = pRetailerName;
		this.RetailerMin = pRetailerMin;
		this.TotalAmount = pTotalAmount;
		
		this.ParamSpSelf = {
			source : this.Source,
			routeday : this.RouteDay,
			retailer_id : this.RetailerId,
			retailer_name : this.RetailerName,
			retailer_min : this.RetailerMin,
			self_amount : this.TotalAmount
		};

		this.ParamOpis = {
			source : this.Source,
			username : this.Username
		}

		this.ParamSpBcp = {
			username : this.Username,
			routeday : this.RouteDay,
			source : this.Source
		};
	}
}