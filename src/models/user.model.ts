/// <reference path="idsp.model.ts" />
export class User implements Model.IDSPModel{
	private _username:string;
	private _password:string;
	private _role:number;

	constructor(_username:string,_password:string,_role:number){
		this._username = _username;
		this._password = _password;
		this._role = _role;
	}

	public get username(){
		return this._username;
	}

	public get password(){
		return this._password;
	}

	public get role(){
		return this._role;
	}
}