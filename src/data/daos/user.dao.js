/// <reference path="idsp.dao.ts" />
import { MySql } from '../services/mysql.service';
import { User } from '../../models/user.model';
export class UserDAO {
    constructor() {
        this.table_name = 'vr_master_user';
        this.async = create(user, User);
        this.async = login(username, string, password, string);
        /*async create(user:User):Promise<User> {
            const query:string = "insert into "+this.table_name+" values('"+user.username+"','"+user.password+"')";
            console.log(query);
            //var resp:string =  await this._mysql.executeQuery(query);
            return user;
        }*/
        this.async = read(id, number);
        this.async = update(user, User);
        this.async = delete (id);
    }
    Promise() {
        this._mysql = new MySql();
        const query = "insert into " + this.table_name + " (username,password) values('" + user.username + "','" + user.password + "')";
        var resp = await;
        this._mysql.executeQuery(query);
        return user;
    }
    Promise() {
        this._mysql = new MySql();
        const query = "select * from " + this.table_name + " where username = '" + username + "' and password = '" + password + "'";
        var resp = await;
        this._mysql.executeQuery(query);
        let user = JSON.parse(JSON.stringify(resp));
        return user;
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
//# sourceMappingURL=user.dao.js.map