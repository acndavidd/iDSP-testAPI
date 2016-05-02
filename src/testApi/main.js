///<reference path="typings/main.d.ts" />
var express = require('express');
var app = express();
var db_orm = require('./model/db_orm');
//var sequel = require('sequelize');
//var path      = require("path");
//var dbconn    = require(path.join(__dirname, '..', 'config', 'dbconn.js'));
//sequel.setup(dbconn.name, dbconn.user, dbconn.pass, {
//        host: dbconn.host,
//        //logging: false,
//        native: false,
//        dialect: dbconn.dialect
//    });
app.get('/testCreateUserProfile', function (req, res) {
    var message = 'Insert start.';
    var vFirstName = req.param('first');
    var VLastName = req.param('last');
    var user2 = db_orm.model('public.users');
    var genID;
    return db_orm.sequelize().transaction(function (t) {
        return user2.create({
            firstName: vFirstName,
            lastName: VLastName
        } //, {isNewRecord:true}
        , { transaction: t }).then(function (user) {
            console.log("Successfully insert " + user.get("id"));
            genID = user.get("id");
            //console.log(t);
            var profile = db_orm.model('public.profile');
            return profile.create({
                id: 1,
                userId: 1,
                profileName: 'testt' + genID
            }, { transaction: t }).catch(function (error) {
                console.log("Gagal insert profile " + error);
                message = 'Insert failed.';
                //console.log(t);
                throw "INSERT PROFILE ERROR";
            });
        }, { transaction: t }).catch(function (error) {
            console.log("Gagal insert users " + error);
            message = 'Insert failed.';
            genID = 0;
            //t.rollback();
            throw "Insert user error, " + error;
        });
    }).then(function (result) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
        //console.log(t.)
        res.send("Success Insert" + ' Time :' + new Date().toLocaleString() + " with ID : " + genID);
    }).catch(function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
        //t.rollback();
        res.send("Failed to Insert" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
    });
});
app.get('/testDeleteProfile', function (req, res) {
    var message = 'Delete profile start.';
    var vId = req.param('id');
    var profile = db_orm.model('public.profile');
    //in Progress 
    profile.destroy({
        where: {
            id: vId
        }
    });
    res.send(message + ' Time :' + new Date().toLocaleString());
});
app.get('/testUpdateUser', function (req, res) {
    var message = 'Delete profile start.';
    var vLastName = req.param('last');
    var vId = req.param('id');
    var users = db_orm.model('public.users');
    //in Progress 
    users.update({
        lastName: vLastName,
    }, {
        where: {
            id: vId
        }
    }).then(function (user) {
        res.send("Update Success for id " + vId + ' Time :' + new Date().toLocaleString());
    });
});
app.get('/testQueryUser', function (req, res) {
    var message = 'Query users start.';
    var vId = req.param('id');
    var users = db_orm.model('public.users');
    users.findOne({
        where: {
            id: vId
        }
    }).then(function (result) {
        console.log(result);
        if (result === null) {
            throw " NO Data Found";
        }
        else {
            res.send('User Found, ID =' + result.id + 'First =' + result.firstName + 'Last =' + result.lastName + '. Time :' + new Date().toLocaleString());
        }
    }).catch(function (error) {
        console.log("Gagal Query users" + error);
        res.send("Failed to Query" + ' Time :' + new Date().toLocaleString() + " Error : " + error);
    });
});
var server = app.listen(3001, "localhost", function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host);
    console.log(port);
    console.log('Example app listening at http://%s:%s', host, port);
});
//# sourceMappingURL=main.js.map