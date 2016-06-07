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
		paramDSPElp;
		paramRetailerOpis;
		paramRetailerElp;

		constructor(pUsername: string, pRetailerID: string, pCorporateID: string, pBranchID: string, pTransKey: string, pReqRefNo: string, pTransType: string, pReqTimestamp: string, pTerminalID: string, pAddress: string, pZipCode: string) {
			super();
			this.username = pUsername;
			this.retailerID = pRetailerID;

			this.corporateID = pCorporateID;
			this.branchID = pBranchID;
			this.transactionKey = pTransKey;
			this.requestRefNo = pReqRefNo;
			this.transactionType = pTransType;
			this.requestTimestamp = pReqTimestamp;
			this.terminalID = pTerminalID;
			this.address = pAddress;
			this.zipCode = pZipCode;

			this.paramDSPOpis = {
				username : this.username
			}

			this.paramDSPElp = {
				corporateID : this.corporateID,
				branchID : this.branchID,
				transactionKey : this.transactionKey,
				requestRefNo : this.requestRefNo,
				transactionType : this.transactionType,
				requestTimestamp : this.requestTimestamp,
				terminalID : this.terminalID,
				address : this.address,
				zipCode : this.zipCode
			}

			this.paramRetailerOpis = {
				username : this.username,
				retailerID : this.retailerID
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
				username : this.username
			}

			this.paramRetailer = {
				username : this.username,
				recordStart : this.recordStart,
				recordEnd : this.recordEnd,
				retailerID : this.retailerID
			}
		}
	}
}