import {IDSPModel} from './idsp.model';

export class TokenObject extends IDSPModel{
	private DSPId:string;
	private expired:Date;
	private OPISToken:string;

	constructor() {
		super();
	}

	setOPISToken(pOPISToken: string) {
		this.OPISToken = pOPISToken;
	}

	getOPISToken(): string {
		return this.OPISToken;
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