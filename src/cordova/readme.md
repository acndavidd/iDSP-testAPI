
# Cordova Project

## Installation

0. install ANDROID SDK & JDK
1. 'npm install -g cordova' on /app folder
2. 'cordova create cordova ph.com.smart.idsp iDSP' on /src folder [cordova create <folder_name> <domain> <app_name>]
3. 'cordova platform add android --save' on /cordova folder
4. 'cordova prepare' on /cordova folder

## Build

1. Run `grunt debug` on /app folder (can be killed after it's done)
2. Run `grunt cordova` on /app folder
3. Run `cordova build ios` or `cordova build android` on /cordova folder
4. For ios, open `.xcodeproj` file under `/platforms/ios/`
