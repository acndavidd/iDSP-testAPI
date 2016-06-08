import {IDSPModel} from '../../idsp.model';
import {isValid, IsLength} from 'class-validator';

export module Inventory {
	export class LoadInventory extends IDSPModel {

		username: string;
		retailerID: string;
		corporateID: string;
		branchID: string;
		transactionKey: string;
		requestRefNo: string;
		transactionType: string;
		requestTimestamp: string;
		terminalID: string;
		address: string;
		zipCode: string;

		paramDSPOpis;
		paramDSPElpSmart;
		paramDSPElpSun;
		paramDSPCoba;
		paramRetailerOpis;

		constructor(pUsername: string, pRetailerID: string, pCorporateID: string, pBranchID: string, pTransKey: string, pReqRefNo: string, pReqTimestamp: string, pTerminalID: string, pAddress: string, pZipCode: string) {
			super();
			this.username = pUsername;
			this.retailerID = pRetailerID;

			this.corporateID = pCorporateID;
			this.branchID = pBranchID;
			this.transactionKey = pTransKey;
			this.requestRefNo = pReqRefNo;
			this.requestTimestamp = pReqTimestamp;
			this.terminalID = pTerminalID;
			this.address = pAddress;
			this.zipCode = pZipCode;

			this.paramDSPOpis = {
				username : this.username
			}

			this.paramDSPElpSmart = {
				corporateid : this.corporateID,
				branchid : this.branchID,
				transactionkey : this.transactionKey,
				requestrefno : this.requestRefNo,
				transactiontype : 'DLRBAL',
				requesttimestamp : this.requestTimestamp,
				terminalid : this.terminalID,
				address : this.address,
				zipcode : this.zipCode
			}


			this.paramDSPElpSun = {
				corporateid : this.corporateID,
				branchid : this.branchID,
				transactionkey : this.transactionKey,
				requestrefno : this.requestRefNo,
				transactiontype : 'DLRBALSUN',
				requesttimestamp : this.requestTimestamp,
				terminalid : this.terminalID,
				address : this.address,
				zipcode : this.zipCode
			}

			this.paramDSPCoba = {
				corporateid : this.corporateID
			}
		}
	}

	export class PhysicalInventory extends IDSPModel {

		username: string;
		recordStart: string;
		recordEnd: string;
		retailerID: string;

		paramDSP;
		paramRetailer;

		constructor(pUsername: string, pRecordStart: string, pRecordEnd: string, pRetailerID: string) {
			super();
			this.username = pUsername;
			this.recordStart = pRecordStart;
			this.recordEnd = pRecordEnd;
			this.retailerID = pRetailerID;

			this.paramDSP = {
				username : this.username,
				recordstart : this.recordStart,
				recordend : this.recordEnd
			}

			this.paramRetailer = {
				username : this.username,
				recordstart : this.recordStart,
				recordend : this.recordEnd,
				retailerid : this.retailerID
			}
		}
	}
}