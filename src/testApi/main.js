///<reference path="typings/main.d.ts" />
var express = require('express');
var app = express();
var db_orm = require('./model/db_orm');
app.get('/testCreateUserProfile', function (req, res) {
    var message = 'Insert done.';
    var user2 = db_orm.model('public.users');
    var genID = 0;
    user2.create({
        firstName: 'testAja2',
        lastName: 'testLagi2'
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
    }).catch(function (error) {
        console.log("Gagal insert users" + error);
        message = 'Insert failed.';
        genID = 0;
    });
    res.send(message + ' Time :' + new Date().toLocaleString());
});
var server = app.listen(3001, "localhost", function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(host);
    console.log(port);
    console.log('Example app listening at http://%s:%s', host, port);
});
//# sourceMappingURL=main.js.map