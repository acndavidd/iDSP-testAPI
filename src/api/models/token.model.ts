import {IDSPModel} from './idsp.model';

export class TokenObject extends IDSPModel{
	private DSPId:string;
	private expired:Date;

	constructor() {
		super();
	}

	setDSPId(pDSPId: string) {
		this.DSPId = pDSPId;
	}

	getDSPId():string {
		return this.DSPId;
	}

	getExpired():Date {
		return this.expired;
	}
}