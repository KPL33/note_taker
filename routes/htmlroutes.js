//Similar to the 'apiroutes.js' file, here we are establishing our 'routes' relating to the 'html' file.
const path = require('path');
//Here, we establish a 'router', which will serve to bundle the 'req'uest and 'res'ponse paths to be utilized in our 'server.js' file.
const router = require('express').Router();

//Here, we are instructing that if we receive a 'req'uest for 'notes', our 'router' (which we're exporting in the last line of code in this doc) will contain a route to our 'notes'.html file. By receiving the 'req'uest route, we're asking that this file 'res'ponds with the 'path' (relative to 'htmlroutes.js' in our file-tree) to the 'notes' file, within our 'public' folder.
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = router;