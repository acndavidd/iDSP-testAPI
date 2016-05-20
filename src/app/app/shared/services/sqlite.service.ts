var vDbSqlite;
var configChannel;
const vDbName = 'idsp.db';
const vDbLocation = 'default';

import {Injectable} from 'angular2/core';

@Injectable()

export class SQLiteService {
    constructor() {
        if(this.isApp()) {
            vDbSqlite = vDbSqlite.openDatabase({name: vDbName, location: vDbLocation},function(pDb){
                console.log('Success Bro');
            },function(pErr){
                console.log('Error Bro : ' + pErr);
            });
        }
    }

    isApp():boolean {
        return (configChannel === 'app');
    }
}