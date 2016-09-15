/* Little script to communicate Node.js with an API Rest */
var request = require('request');

var url = 'http://localhost:8080/rest/ontologies/query/tbox'
var query = "PREFIX owl: <http://www.w3.org/2002/07/owl#> " +
            "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
            "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
            "select * " +
            "where { ?a ?b ?c }";

var requestString = { "data": query }

var options = {
    url: url,
    method: 'post',
    json: true,
    headers: {
        "content-type": "application/json",
    },
    //body: JSON.stringify(requestString)
    body: requestString
}

console.log( JSON.stringify(requestString) );

req = request( options, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            console.log(response.body);
            console.log('ok')
        } else {
            console.log('error')
            console.log(error)
            console.log(response.body);
            console.log(response.statusCode);
        }
    }
)
