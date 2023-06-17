const path = require('path');

//Similar to the 'htmlroutes.js' file, here we are establishing our 'routes' relating to the 'apis' being utilized for our app. In this way, we make our code more modular, which eases maintenance and trouble-shooting by categorizing routes, based on their concerns.

const fs = require('fs');

//Here, we establish a 'router', which will serve to bundle the 'req'uest and 'res'ponse paths to be utilized in our 'server.js' file.
const router = require('express').Router();

// Here, we 'require' the 'uuid' framework, so that we can utilize its built-in commands to store the 'keys' of our notes. They are the unique "id", the "title" and the "text" (content), associated with each note. These keys and their values (assigned to each, via the user's inputs in our app) can be viewed in the 'db.json' file, within the 'db' folder (once the user has entered a new note). If all notes in our app have been deleted, the 'db.json' file will be an empty array.
const { v4: uuidv4 } = require('uuid');

//Here, we require our (database) 'db.json' file which store's our user inputs (and makes deletions when that 'req' is received). 
const dbPath = path.join(__dirname, '../db/db.json');

//Here, we declare that 'const db' stores our 'parse'd, JavaScript Object. data, we decalre that the '.json' file should be  with our First, our JavaScript will read the inputs, then parse them, edit them, stringify them and then write the new data when all of these steps are complete.
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

//Because JavaScript defaults to (assumes) 'index.js', we don't need to specify any file, since all of our routes are bundled in the 'index.js' file and therefor, will be read together.
router.get('/notes', (req, res) => {
  res.json(db);
});


//Dane said: Post is a little different from get. We'll need to add to the db, use fs to rewrite the
router.post('/notes', (req, res) => {
  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text
  };

  db.push(newNote);

  fs.writeFile(dbPath, JSON.stringify(db), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save note.' });
    }

    res.json(newNote);
  });

});

router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;

  // Find the index of the note with the matching ID in the `db` array
  const noteIndex = db.findIndex((note) => note.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found.' });
  }

  // Remove the note from the `db` array
  db.splice(noteIndex, 1);

  // Write the updated `db` array to the file
  fs.writeFile(dbPath, JSON.stringify(db), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete note.' });
    }

    res.sendStatus(204);
  });
});

module.exports = router;