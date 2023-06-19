//Similar to the 'htmlroutes.js' file, in 'apiroutes.js' we are establishing our 'routes' relating to the 'api' inputs on our app, (in our case 'get', 'post' & 'delete' 'req's from the user). We separate our routes based on their concerns, because this will simplify maintenance and trouble-shooting.


//Here, the built-in (to NodeJS) 'path' module is providing utilities for our app to work with the 'apiroutes' file. It essentialy allows 'index.js' (which is importing 'apiroutes') to find this file, along with 'htmlroutes, which is utilizing the same 'paths' module.
const path = require('path');

//'fs' gives us all of the built-in utilities of the "file system" ("read", "write", etc.), essentially for our app to run.
const fs = require('fs');

//As is the case in 'htmlroutes.js' and 'index.js', here we use the built-in 'express' 'Router' method, which helps to bundle the 'req'uest and 'res'ponse paths that are being utilized by our 'server.js' file. We assign this method to the 'const' 'router'.
const router = require('express').Router();

//Utlizing the 'uuid' framework, we can assign unique 'id's to each of the user's new notes as they're received. This info. is stored in the 'db.json' file, within the 'db' folder.
const { v4: uuidv4 } = require('uuid');

//Here, we declare a 'Path' to our 'db.json' file (database), which stores our user inputs. 
const dbPath = path.join(__dirname, '../db/db.json');

//Here, we declare that 'const db' stores our 'parse'd, JavaScript Object data (notes). First, we read the data, then we parse it so that we can keep track of each 'key/value' aspect of the note. Later, we'll push the new note's aspects into the array (in a new object), stringify the resulting data and write it all to the page for the user to read.
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

//Here, if a 'req' is made to the '/notes' endpoint, the 'res'ponse sends back the 'db' '.json' file, which contains any existing notes, or an empty array (both of which would be stored in 'db.json'; the array fills with the user's notes). It then 'post's the 'title' and 'text' of the new notes in the 'db.json' file, both of which populate the page that the user is viewing. It does not show the 'id', as that is simply used in the back-end of our app, to track the notes. JavaScript defaults to (assumes) it should look for the 'index.js' file, which is why we can simply use the path '/notes', in order for the path to connect.
router.get('/notes', (req, res) => {
  res.json(db);
});


router.post('/notes', (req, res) => {
  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text
  };

  //Here, we 'push' our 'newNote' to the end of the array of parsed note data, in 'db'.json.
  db.push(newNote);

  //Should an 'error' occur during this process, we 'return' that, in the 'console'.
  fs.writeFile(dbPath, JSON.stringify(db), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save note.' });
    }

    res.json(newNote);
  });

});

//Here, we give our app the ability to 'delete' a note, based on the unique 'id' assigned to it when the note was saved by the user. The ':' instructs our function that 'id' is a dynamic paramater. We then assign that 'id' to 'noteId' for this and other functions to utilize.
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;

  // This function 'find's the 'Index' of the 'note' with the matching 'id' in the array stored in 'db'.json, so that the correct 'note' is 'delete'd.
  const noteIndex = db.findIndex((note) => note.id === noteId);

  //Here, we account for instances when there are no past saved notes present.
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found.' });
  }

  //Here, we remove the correct note (which we assigned to 'noteIndex', above) and then remove just that '1' note, for each 'delete' request.
  db.splice(noteIndex, 1);

  // Then, we 'write' the updated 'JSON' 'File' as it is, and 'stringify' the contents so that the existing note(s) can be displayed to the user, on our page. We also provide a way for the app to communicate (through the 'console') that an error has occurred.
  fs.writeFile(dbPath, JSON.stringify(db), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete note.' });
    }

    //The function then 'res'ponds to the console with code '204', which indicates "No Content", if the note was deleted successfully.
    res.sendStatus(204);
  });
});

//And here, we 'export' the above code as 'router', to be bundled with other routes, in 'index.html.'
module.exports = router;