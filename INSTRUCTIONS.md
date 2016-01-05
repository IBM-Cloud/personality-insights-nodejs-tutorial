#Instructions on how to perform each step

This application is meant to be used as a learning tutorial.  The `master` branch contains the finalized code.  There are multiple branches that contain finished product for each individual step.

There are 4 steps in total.

## Part 1
1. Login to [Bluemix](http://bluemix.net) (create an account if you have not done so already)
2. Click on catalog at the top, click on "SDK for Node.js"
3. Enter a name for your application on the right hand side

   Note: Bluemix will make sure you have a unique name for your app here.  The name of your app will be the hostname for your app.
4. Click Create
5. Wait a bit, Click "Download Code".
6. Extract the zip file.

Part 1 is complete.  You have successfully built a basic Bluemix app and downloaded the source code.  The result for step is available [on Github here](https://github.com/IBM-Bluemix/personality-insights-nodejs-tutorial/tree/step1).

## Part 2
1. We now need to import the Watson SDK for Node.js.  To do this app the following to your `app.js` file at the bottom.
        var watson = require('watson-developer-cloud');

        var creds = appEnv.getServiceCreds('personality-insights-tutorial');
        creds.version = 'v2';
        var personalityInsights = watson.personality_insights(creds);
2.  Next we need to pull in the Watson SDK for Node.js, to do this we need to augment our `package.json` file to resemble the following.

        {
          "name": "NodejsStarterApp",
          "version": "0.0.1",
          "description": "A sample nodejs app for Bluemix",
          "scripts": {
            "start": "node app.js"
          },
          "dependencies": {
            "cfenv": "1.0.x",
            "express": "4.12.x",
            "watson-developer-cloud": "*"
          },
          "repository": {},
          "engines": {
            "node": "0.12.x"
          }
        }

If you notice in Step 2 we have added a line, `"watson-developer-cloud": "*"`.  This is telling Node that we need to import the Watson SDK for Node.js.

In Step 1 in this part we pulled in the Watson SDK for Node.js into our app code and read the credentials from Bluemix for the application.  Next we setup the code required to talk to Watson Personality Insights.

Part 2 is complete.  The result for step is available [on Github here](https://github.com/IBM-Bluemix/personality-insights-nodejs-tutorial/tree/step2).

## Part 3
Now since we have imported the Watson SDK for Node.js into our application we need to allow the users of our application to upload files to be analyzed by IBM Watson.  To do this we need to add some HTML to `public/index.html`.

1. Inside of `public/index.html` we need to delete everything between the two `<body>` tags.
   Your body should be empty, it should look like the following.

        <!DOCTYPE html>
        <html>

          <head>
            <title>NodeJS Starter Application</title>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="stylesheets/style.css">
          </head>

          <body>
          </body>

        </html>
2. We need to add a simple HTML form to upload the file to our Node app to then send the file to IBM Watson.  Between `<body>` and `</body>` we need to add the following.

        <body>
            <form action="/upload" method="POST" enctype="multipart/form-data">
                Select a txt file to upload:
                <input type="file" name="file">
                <input type="submit" value="Upload File">
            </form>
        </body>

The above code in step 2 will allow a user to browser on their machine for a `.txt` file and upload that file to the Node application. 

Part 3 is complete.  The result for step is available [on Github here](https://github.com/IBM-Bluemix/personality-insights-nodejs-tutorial/tree/step3).

## Part 4
In this part we need to take the file that has been uploaded and send it to IBM Watson and send the result back to the user of our application.

1. To do this we need to add the following code to the bottom of our `app.js` file.

        var multer = require('mutler');

        var uploading = multer({
            storage: multer.memoryStorage()
        });

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
                        response.send(result);
                    }
                }
            );
        });
2. Next we need to add the package `mutler` to our `package.json` file so Node knows to install the new dependency. Your `package.json` file should like what is below.

        {
          "name": "NodejsStarterApp",
          "version": "0.0.1",
          "description": "A sample nodejs app for Bluemix",
          "scripts": {
            "start": "node app.js"
          },
          "dependencies": {
            "cfenv": "1.0.x",
            "express": "4.12.x",
            "multer": "^1.1.0",
            "watson-developer-cloud": "*"
          },
          "repository": {},
          "engines": {
            "node": "0.12.x"
          }
        }

In the above step we added a new line `"multer": "^1.1.0",`, this tells Node to install the package called mutler.

At this point you have a working application and Part 4 is now complete. The result for step is available [on Github here](https://github.com/IBM-Bluemix/personality-insights-nodejs-tutorial/tree/step4).
