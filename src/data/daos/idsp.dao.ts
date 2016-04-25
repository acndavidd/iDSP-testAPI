/// <reference path="../../models/idsp.model.ts" />
module DAO{
	export interface DAO<T extends Model.IDSPModel>{
		create(t: T):Promise<T>;
        read(id: number):Promise<T>;
        update(t: T):Promise<boolean>;
        delete(id: number):Promise<boolean>;
	}
}