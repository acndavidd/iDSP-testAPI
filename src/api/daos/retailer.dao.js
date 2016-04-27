/// <reference path="idsp.dao.ts" />
import { MySql } from '../services/mysql.service';
import { Retailer } from '../../models/retailer.model';
export class RetailerDAO {
    constructor() {
        this.table_name = 'retailer';
        this.async = store();
        this.async = create(retailer, Retailer);
        /*async create(user:User):Promise<User> {
            const query:string = "insert into "+this.table_name+" values('"+user.username+"','"+user.password+"')";
            console.log(query);
            //var resp:string =  await this._mysql.executeQuery(query);
            return user;
        }*/
        this.async = read(id, number);
        this.async = update(retailer, Retailer);
        this.async = delete (id);
    }
    Promise() {
        this._mysql = new MySql();
        const query = "select * from " + this.table_name;
        var resp = await;
        this._mysql.executeQuery(query);
        let Retailer = JSON.parse(JSON.stringify(resp));
        return Retailer;
    }
    Promise() {
        return retailer;
    }
    Promise() {
    }
    Promise() {
        return false;
    }
}
number;
Promise < boolean > {
    return: false
};
//# sourceMappingURL=retailer.dao.js.map