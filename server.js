//'server.js' serves as our 'hub'. It is where all of our routes lead, so that our app can run properly.
const express = require('express');

//Here, we are accessing the 'index.js' file in the 'routes' folder of our file tree. We do not need to specifically name 'index.js' as the file, because JavaScript (by default) looks for the file by that name in the folder we've specified.
const routes = require('./routes');

//Here, we let our app know that it will be receiving all 'process'ing activity either through the Heroku 'env'ironment (for this app), or through our local 'port' '3001'.
const PORT = process.env.port || 3001;

//Here, we that we initialize 'express' so that we can enable our routes and let our files exchange information.
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Here, we declare that all of our 'static' files will come from our 'public' folder (javascript, html, css etc.).
app.use(express.static('public'));

app.use(routes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);