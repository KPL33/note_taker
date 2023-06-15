//'server.js' serves as our 'hub'. It is where all of our routes lead, so that our app can run properly from here. We 'require' the 'express' NodeJS framework so that we can utilize its built-in features to run our app.
const express = require('express');

//One of the built in features of 'express' is 'path'. We access it here so that our app can utilize it to make sense of the 'path's we assign to find each file, when they are referenced in the code block. Actual 'path's to each of those supplementary files are detailed where they are declared.
const path = require('path');

//Here, we are accessing the 'index.js' file in the 'routes' folder of our file tree. We do not need to specifically name 'index.js' as the file, because JavaScript (by default) looks for the file by that name in the folder we've specified.
const routes = require('./routes');

//Here, we let our app know that it will be receiving all 'process'ing activity either through the Heroku 'env'ironment (for this app), or through our local 'port' '3001'.
const PORT = process.env.port || 3001;

//Here, we initialize 'express' (which we're defining as 'app') so that we can enable our routes and let our files exchange information.
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Here, we declare that all of our 'static' files will come from our 'public' folder (javascript, html, css etc.).
app.use(express.static('public'));

app.use(routes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);