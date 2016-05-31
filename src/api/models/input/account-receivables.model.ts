import {IDSPModel} from '../idsp.model';
import {isValid} from 'class-validator';

export class AccModel extends IDSPModel {
	Username: string;
	RouteDay: number;
	Source: string;

	constructor(pUsername: string, pDay:number, pSource: string) {
		super();
		this.Username = pUsername;
		this.RouteDay = pDay;
		this.Source = pSource;
	}
}