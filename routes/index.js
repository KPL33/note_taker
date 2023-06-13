const router = require('express').Router();
const htmlroutes = require('./htmlroutes');
const apiroutes = require('./apiroutes');

router.use('/api', apiroutes);

router.use('/', htmlroutes);


module.exports = router;
