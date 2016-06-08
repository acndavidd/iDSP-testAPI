import {IDSPModel} from '../../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class BalanceModel extends IDSPModel{
	min: string;
	source: string;

	constructor(pMin: string, pSource: string) {
		super();
		this.min = pMin;
		this.source = pSource;
	}
}