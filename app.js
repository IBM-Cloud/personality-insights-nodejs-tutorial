/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

var watson = require('watson-developer-cloud'),
    multer = require('multer');

var creds = appEnv.getServiceCreds('personality-insights-tutorial');
creds.version = 'v2';
var personalityInsights = watson.personality_insights(creds);

var uploading = multer({
    storage: multer.memoryStorage()
});

app.set('json spaces', 4);

app.post('/upload', uploading.single('file'), function (request, response) {
    console.log("file");
    var txtFile = request.file.buffer.toString();
    console.log(request.file.buffer);

    personalityInsights.profile({
        text: txtFile },
        function (error, result) {
            if (error) {
                response.send(error);
            }
            else {
                response.json(result);
            }
        }
    );
});


