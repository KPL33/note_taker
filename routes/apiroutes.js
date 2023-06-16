//Dane said 'import "fs" on whichever .js files you think it will be necessary. Post is 1 for sure.

const path = require('path');

//Similar to the 'htmlroutes.js' file, here we are establishing our 'routes' relating to the 'apis' being utilized for our app. In this way, we make our code more modular, which eases maintenance and trouble-shooting by categorizing routes, based on their concerns.

const fs = require('fs');

//Here, we establish a 'router', which will serve to bundle the 'req'uest and 'res'ponse paths to be utilized in our 'server.js' file.
const router = require('express').Router();

const { v4: uuidv4 } = require('uuid');

//Here, we require 'our database.json' file so that we can store user inputs. First JavaScript will read them, then parse them, edit them, stringify them and then write the new data when all of these steps are complete.
const dbPath = path.join(__dirname, '../db/db.json');

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