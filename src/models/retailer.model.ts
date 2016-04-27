/// <reference path="idsp.model.ts" />
"use strict";
export class Retailer implements Model.IDSPModel{
	private _storename:string;
	private _owername:string;
	private _servicenumber:number;
	private _storeaddress:string;

	constructor(){}

	public get storename(){
		return this._storename;
	}

	public get ownername(){
		return this._owername;
	}

	public get servicenumber(){
		return this._servicenumber;
	}
	
	public get storeaddress(){
		return this._storeaddress;
	}
}