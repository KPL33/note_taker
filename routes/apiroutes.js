//Dane said 'import "fs" on whichever .js files you think it will be necessary. Post is 1 for sure.

//Similar to the 'htmlroutes.js' file, here we are establishing our 'routes' relating to the 'apis' being utilized for our app. In this way, we make our code more modular, which eases maintenance and trouble-shooting by categorizing routes, based on their concerns.

//Here, we establish a 'router', which will serve to bundle the 'req'uest and 'res'ponse paths to be utilized in our 'server.js' file.
const router = require('express').Router();

//Here, we require 'our database.json' file so that we can store user inputs. First JavaScript will read them, then parse them, edit them, stringify them and then write the new data when all of these steps are complete.
const db = require('../db/db.json');

//Because JavaScript defaults to (assumes) 'index.js', we don't need to specify any file, since all of our routes are bundled in the 'index.js' file and therefor, will be read together.
router.get('/notes', (req, res) => {
  res.json(db);
});


//Dane said: Post is a little different from get. We'll need to add to the db, use fs to rewrite the db.
router.post('/notes', (req, res) => {
  res.json(db);
});

module.exports = router;