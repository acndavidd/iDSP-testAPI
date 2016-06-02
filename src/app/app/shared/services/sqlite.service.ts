import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

declare var vDbSqlite: any;
declare var configChannel: any;
const vDbName = 'idsp.db';
const vDbLocation = 'default';

@Injectable()

export class SQLiteService {
    private vInitialized: boolean;
    constructor() {
        this.vInitialized = false;
    }

    initializeDB() {
        console.log('initialize sqlite plugin');
        let vCurrContext = this;
        return new Promise(
            function (pResolve, pReject) {
                if (vCurrContext.isApp()) {
                    vDbSqlite.openDatabase({name: vDbName, location: vDbLocation}, function(pDb){
                        vDbSqlite = pDb;
                        vCurrContext.vInitialized = true;
                        pResolve(pDb);
                    }, function(pErr) {
                        pReject(pErr);
                    });
                }
            }
        );
    }

    executeQuery(pQuery: string, pParams?: any) {
        let vCurrContext = this;
        if (this.isApp()) {
            return new Observable<any>((pObserver) => {
                if (!this.vInitialized) {
                    vCurrContext.initializeDB().then(function(pResult){
                        vCurrContext.queryPromise(pQuery, pParams).then(function(pQueryResult){
                            pObserver.next(pQueryResult);
                            pObserver.complete();
                        }).catch(function(pErr){
                            pObserver.error(pErr);
                        });
                    });
                }else {
                    vCurrContext.queryPromise(pQuery, pParams).then(function(pQueryResult){
                        pObserver.next(pQueryResult);
                        pObserver.complete();
                    }).catch(function(pErr){
                        pObserver.error(pErr);
                    });
                }
            });
        }
    }

    queryPromise(pQuery: string, pParams?: any) {
        return new Promise<any>(
            function(pResolve, pReject){
                vDbSqlite.executeSql(pQuery, pParams, function(pResultSet){
                    pResolve(pResultSet);
                }, function(pError){
                    pReject(pError);
                });
            }
        );
    }

    isApp() {
        return (configChannel === 'app');
    }
}