//Dane said 'import "fs" on whichever .js files you think it will be necessary.

const router = require('express').Router();

const db = require('../db/db.json');

router.get('/notes', (req, res) => {
  res.json(db);
});


//I think we need this?
router.post('/notes', (req, res) => {
  res.json(db);
});

module.exports = router;