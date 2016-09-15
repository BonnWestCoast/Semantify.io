
/* Little JS script to upload XML files (Schema and Instance) to the Java API Rest */

var request = require('request');
var fs = require('fs');
var url = 'http://localhost:8080/rest/ontologies'

req = request.post(
        url,
        function (error, response, body) {

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

var form = req.form();
/*
form.append('schema', fs.createReadStream('other_xml/books.xsd'));
form.append('instance', fs.createReadStream('other_xml/books.xml'));
form.append('ontName', 'books');
*/

form.append('schema', fs.createReadStream('opc_ua/UANodeSet.xsd'));
form.append('instance', fs.createReadStream('opc_ua/Opc.Ua.NodeSet2.test.xml'));
form.append('ontName', 'test_opcua');
