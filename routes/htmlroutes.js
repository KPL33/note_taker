//Similar to the 'apiroutes.js' file, in 'htmlroutes.js' we are establishing our 'routes' relating to the 'html' file utilized in our app. We separate our routes based on their concerns, because this will simplify maintenance and trouble-shooting.

//Here, the built-in (to NodeJS) 'path' module is providing utilities for our app to work with the 'htmlroutes' file. It essentialy allows the file which is importing 'htmlroutes' ('index.js') to find this file, along with 'apiroutes, which is utilizing the same 'paths' module. And from there, 'server.js' is importing 'index.js', which will include both 'api' and 'html' 'routes' files.
const path = require('path');

//As is the case in 'apiroutes.js', here we use the built-in 'express' 'Router' method, which helps to bundle the 'req'uest and 'res'ponse paths that are being utilized by our 'server.js' file. We assign it to the 'const' 'router'.
const router = require('express').Router();

//Here, we are instructing that if we receive a 'req'uest for the 'notes' 'html' page (which occurs when theuser clicks the 'Get Started' button on our home/'index.html' page), our 'router' (which we're 'export'ing, below) will load ('send' or 'res'pond with) that page to the user, by supplying the 'path' to it.
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

//Similarly, here we are instructing that if we receive a 'req'uest for anything else ('*'), our 'router' will load ('send' or 'res'pond with) the 'index.html file (our app's homepage).
router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

//And here, we 'export' the above code as 'router', to be bundled with other routes, in 'index.html.'
module.exports = router;