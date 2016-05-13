function onLoad() {
	document.addEventListener("backbutton", onBackKeyDown, false);
    console.log("loading");
}
    document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	console.log("this device is :" + device.cordova);
}

function onBackKeyDown() {
	window.location('/');
	alert('test');
    // Handle the back button
}