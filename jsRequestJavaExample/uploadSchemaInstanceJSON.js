
/* Little JS script to upload XML files (Schema and Instance) to the Java API Rest */

var request = require('request');
var url = 'http://localhost:8080/rest/ontologies'

var requestString = {
    "schema": "SCHEMA",
    "instance": "INSTANCE",
    "ontName": "ONTNAME",
}

var options = {
    url: url,
    method: 'post',
    json: true,
    headers: { "content-type": "application/json" },
    body: requestString
}

req = request( options , function (error, response, body) {

            if (!error && response.statusCode == 200) {
                console.log(body);
                console.log('ok')
            } else {
                console.log(response);
                //console.log(response.statusCode);
                console.log('error')
            }
        }
)
