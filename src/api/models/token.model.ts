import {IDSPModel} from './idsp.model';

export class TokenObject extends IDSPModel{
	private DSPId: string;
	private expired: Date;
	private OPISToken: string;
	private factorAuth0: boolean;
	private factorAuth1: boolean;
	
	constructor(pDSPId: string, pOPISToken: string, pFactorAuth0:boolean, pFactorAuth1:boolean) {
		super();
		this.DSPId = pDSPId;
		this.OPISToken = pOPISToken;
		this.factorAuth0 = pFactorAuth0;
		this.factorAuth1 = pFactorAuth1;
	}

	setDSPId(pDSPId: string) {
		this.DSPId = pDSPId;
	}

	getDSPId():string {
		return this.DSPId;
	}

	setOPISToken(pOPISToken: string) {
		this.OPISToken = pOPISToken;
	}

	getOPISToken(): string {
		return this.OPISToken;
	}

	setFactorAuth0(state: boolean) {
		this.factorAuth0 = state;
	}

	getFactorAuth0(): boolean {
		return this.factorAuth0;
	}

	setFactorAuth1(state: boolean) {
		this.factorAuth1 = state;
	}

	getFactorAuth1(): boolean {
		return this.factorAuth1;
	}
}