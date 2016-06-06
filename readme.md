# iDSP App

## Installation

1. Install grunt-cli globally `npm install -g grunt-cli lite-server typings`
1. `cd src/app`
1. Run `npm install`.
1. Run `typings install`
1. copy `src/app/config/service.json.example` to `src/app/config/service.json`


## Running
(reserved for further instructions)

## Debug
To run the project on debug mode, run `grunt debug` on `src/app`, 

This will build the project and copy the files to base project directory under `debug/`.

Run `lite-server` in the `debug/` directory.

# Cordova Project

## Installation

1. install ANDROID SDK & JDK
2. backup current config.xml and .gitignore from /cordova

		mkdir cordovabackup
		copy src/cordova/config.xml cordovabackup/config.xml
		copy src/cordova/.gitignore cordovabackup/.gitignore
3. `npm install -g cordova`
4. create cordova project on src folder
	
		cd src
		cordova create cordova ph.com.smart.idsp iDSP
	syntax details: `cordova create <folder_name> <domain> <app_name>`
3. add android platform on cordova folder

		cd cordova
		cordova platform add android --save
4. prepare cordova for build

		cordova prepare

## Build

1. Run `grunt cordova` on /app folder
2. Run `cordova build ios` or `cordova build android` on /cordova folder
3. For ios, open `.xcodeproj` file under `/platforms/ios/`
4. Building with keystore

		cordova build android --release -- --keystore=./android-test.keystore --storePassword=password --alias=android-test --password=password