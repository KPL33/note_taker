//'server.js' serves as our 'hub'. It ultimately handles all of our routes, so that our app can run properly. We 'require' the 'express' NodeJS framework so that we can utilize its built-in features to run our app.
const express = require('express');

const path = require('path');

//Here, we are accessing our various 'routes' via the 'index.js' file we created. We do not need to specifically name 'index.js', as JavaScript (by default) looks for the file by that name in the folder we've specified.
const routes = require('./routes');

//Here, we let our app know that it will be receiving all 'process'ing activity either through the Heroku 'env'ironment (for this app), or through our local 'port' '3001', depending on where it is being loaded.
const PORT = process.env.PORT || 3001;

//Here, we initialize 'express' (which we're defining as 'app') so that we can enable our routes and let our files exchange information.
const app = express();

//Here, we declare that 'express' (defined above) will use its built-in methods relating to '.json' files, decode 'urlencoded' information received when our app is running and access the 'static' html files in our 'public' folder, as well as the related 'public' 'routes'. 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'))
app.use(express.static('public'));
app.use(routes);

//When we are able to see the 'log' below appear in the 'console', we know that our app is running on our local machine.
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);