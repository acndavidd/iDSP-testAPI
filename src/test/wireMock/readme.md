# IDSP Mock Wired

Purpose : As simulator to simulate response from SMART or External System web service

## Installation

1. Make Sure java is configured in your environment system variable.


## Add New API
1. Create new file inside folder 'mappings' with extension .json
2. Define the request and response depends on the agreed contract / interface. (For Example : See sample-xxx-api.json)


## Running the WireMock Web Service
1. Change directory to \test\wireMock\
2. Run 'java -jar wiremock-1.57-standalone.jar --port 7777' in your comamand prompt.  (Feel free to change to the port to any free port)
3. Try to Hit the web service url 'http://localhost:7777/__admin' to Check the server is up and your mock service is exist. (Try to stop the java and run it again to refresh the Mock API)


## How to Use 
1. Hit the web service in url 'http://localhost:7777/xxxx/xxxx' in your browser or any HTTP Post Tools ( xxx depends on the mapping)


##Source Code :
http://wiremock.org/running-standalone.html
https://smarttechie.org/2016/02/28/wiremock-mock-your-rest-apis/