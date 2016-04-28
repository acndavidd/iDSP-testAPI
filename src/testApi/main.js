///<reference path="typings/main.d.ts" />
var express = require('express');
var app = express();
var db_orm = require('./model/db_orm');
app.get('/testCreateUserProfile', function (req, res) {
    var message = 'Insert start.';
    var vFirstName = req.param('first');
    var VLastName = req.param('last');
    var user2 = db_orm.model('public.users');
    var genID;
    user2.create({
        firstName: vFirstName,
        lastName: VLastName
    }, { isNewRecord: true }).then(function (user) {
        console.log("Successfully insert" + user.get("id"));
        genID = user.get("id");
        var profile = db_orm.model('public.profile');
        profile.create({
            id: genID,
            userId: genID,
            profileName: 'testt' + genID
        }).catch(function (error) {
            console.log("Gagal insert profile" + error);
            message = 'Insert failed.';
        });
        res.send("Insert Success for id " + genID + ' Time :' + new Date().toLocaleString());
    }).catch(function (error) {
        console.log("Gagal insert users" + error);
        message = 'Insert failed.';
        genID = 0;
        res.send("Failed to Insert" + ' Time :' + new Date().toLocaleString() + " Error : " + error);
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