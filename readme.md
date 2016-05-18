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

0. install ANDROID SDK & JDK
1. 'npm install -g cordova' on /app folder
2. 'cordova create cordova ph.com.smart.idsp iDSP' on /src folder [cordova create <folder_name> <domain> <app_name>]
3. 'cordova platform add android --save' on /cordova folder
4. 'cordova prepare' on /cordova folder

## Build

1. Run `grunt cordova` on /app folder
2. Run `cordova build ios` or `cordova build android` on /cordova folder
3. For ios, open `.xcodeproj` file under `/platforms/ios/`
