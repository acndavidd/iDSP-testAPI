"use strict";
const idsp_model_1 = require('../../idsp.model');
var Inventory;
(function (Inventory) {
    class LoadInventory extends idsp_model_1.IDSPModel {
        constructor(pUsername, pRetailerID, pCorporateID, pBranchID, pTransKey, pReqRefNo, pReqTimestamp, pTerminalID, pAddress, pZipCode) {
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
                username: this.username
            };
            this.paramDSPElpSmart = {
                corporateid: this.corporateID,
                branchid: this.branchID,
                transactionkey: this.transactionKey,
                requestrefno: this.requestRefNo,
                transactiontype: 'DLRBAL',
                requesttimestamp: this.requestTimestamp,
                terminalid: this.terminalID,
                address: this.address,
                zipcode: this.zipCode
            };
            this.paramDSPElpSun = {
                corporateid: this.corporateID,
                branchid: this.branchID,
                transactionkey: this.transactionKey,
                requestrefno: this.requestRefNo,
                transactiontype: 'DLRBALSUN',
                requesttimestamp: this.requestTimestamp,
                terminalid: this.terminalID,
                address: this.address,
                zipcode: this.zipCode
            };
            this.paramDSPCoba = {
                corporateid: this.corporateID
            };
        }
    }
    Inventory.LoadInventory = LoadInventory;
    class PhysicalInventory extends idsp_model_1.IDSPModel {
        constructor(pUsername, pRecordStart, pRecordEnd, pRetailerID) {
            super();
            this.username = pUsername;
            this.recordStart = pRecordStart;
            this.recordEnd = pRecordEnd;
            this.retailerID = pRetailerID;
            this.paramDSP = {
                username: this.username,
                recordstart: this.recordStart,
                recordend: this.recordEnd
            };
            this.paramRetailer = {
                username: this.username,
                recordstart: this.recordStart,
                recordend: this.recordEnd,
                retailerid: this.retailerID
            };
        }
    }
    Inventory.PhysicalInventory = PhysicalInventory;
})(Inventory = exports.Inventory || (exports.Inventory = {}));
//# sourceMappingURL=inventory.model.js.map