import {IDSPModel} from '../idsp.model';
import {isValid} from 'class-validator';

export class AccModel extends IDSPModel {
	Username: string;
	RouteDay: number;
	Source: string;

	ParamSp;
	ParamOpis;

	constructor(pUsername: string, pDay:number, pSource: string) {
		super();
		this.Username = pUsername;
		this.RouteDay = pDay;
		this.Source = pSource;
		
		this.ParamSp = {
			username : this.Username,
			routeday : this.RouteDay
		};

		this.ParamOpis = {
			source : this.Source,
			username : this.Username
		}
	}
}