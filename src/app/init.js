// Load google Analytics 
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

var configChannel = 'web'; //possible values: app, web
var vDbSqlite;

var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;

if(navigator.userAgent.match(/(iOS|iPhone|iPod|iPad|Android|blackberry|Windows Phone)/) && app) {
    console.log("UA: Running in Cordova/PhoneGap");
    var script = document.createElement('script');
    script.src = 'cordova.js';
    document.head.appendChild(script);
    document.addEventListener("deviceready", bootstrapApp, false);
    console.log("device ready event listener activated");
    configChannel = 'app';
}else{
    configChannel = 'web';
    console.log("UA: Running in browser");
    bootstrapWeb();    
}

function bootstrapWeb() {
    // WL.Client.init(wlInitOptions);
    console.log("Bootstrapping AngularJS");
    System.config({
        packages: {        
            app: {
                format: 'register',
                defaultExtension: 'js'
           }
        }
    });
    System.import('app/main')
    .then(null, console.error.bind(console));
    ga('create', 'UA-75852872-3', 'auto');
}

var smsList = [];
var interceptEnabled = false;

function bootstrapApp() {
    // set status bar
    if(window.StatusBar) {
    // org.apache.cordova.statusbar required
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString("#40aa1b");
    }
    // StatusBar.overlaysWebView(false);
    console.log("Bootstrapping AngularJS");
    System.config({
        packages: {        
            app: {
                format: 'register',
                defaultExtension: 'js'
            }
        }
    });
    System.import('app/main')
    .then(null, console.error.bind(console));
    ga('create', 'UA-75852872-2', {'storage': 'none','clientId':device.uuid});
    ga('set','checkProtocolTask',null);
    ga('set','checkStorageTask',null);
    // document.addEventListener("backbutton", onBackKeyDown, false);
    console.log("this device is :" + device.cordova);

    // sqlite
    vDbSqlite = window.sqlitePlugin;
    window.sqlitePlugin.openDatabase({ name: 'hello-world.db', location: 'default' }, function (db) {
    db.executeSql("select length('tenletters') as stringlength", [], function (res) {
      var stringlength = res.rows.item(0).stringlength;
      console.log('got stringlength: ' + stringlength);
      document.getElementById('deviceready').querySelector('.received').innerHTML = 'stringlength: ' + stringlength;
        });
    });

    // sms
    if (! SMS ) { alert( 'SMS plugin not ready' ); return; }

    if(SMS) SMS.startWatch(function(){
                update('watching', 'watching started');
            }, function(){
                updateStatus('failed to start watching');
            });

    document.addEventListener('onSMSArrive', function(e){
        var data = e.data;
        smsList.push( data );
            
        updateStatus('SMS arrived, count: ' + smsList.length );
                
        alert( data );
        console.log( data );
        console.log('sms arrived~!'); 
    });

    if(SMS) SMS.stopWatch(function(){
        update('watching', 'watching stopped');
    }, function(){
        updateStatus('failed to stop watching');
    });

    // fullscreen
    AndroidFullScreen.immersiveMode(successFunction, errorFunction);
}

function successFunction()
{
    console.info("It worked!");
}

function errorFunction(error)
{
    console.error(error);
}

function onBackKeyDown() {
    // window.location.href = '/login';
    alert('back key pressed');
    console.log('back key pressed');
    // Handle the back button
}