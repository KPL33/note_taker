//As is the case in 'htmlroutes.js' and 'apiroutes.js', here we use the built-in 'express' 'Router' method, which helps to bundle the 'req'uest and 'res'ponse paths that are being utilized by our 'server.js' file. We assign this method to the 'const' 'router'.
const router = require('express').Router();

//We require our support 'routes' files so that 'index.js' can read and pass them on to 'server.js'. The filepaths for each are set relative to this file, 'index.js'. This gives points our middleware in the right direction to execute the code container in both the 'apiroutes' and 'htmlroutes' files.
const htmlroutes = require('./htmlroutes');
const apiroutes = require('./apiroutes');

//Here, we 'use' a built-in middleware route-handler function of 'Express' to help our app categorize the code in 'apiroutes'. We use 'Express' to inform 'index.js' that by using the prefix '/api' before all 'apiroutes', 'index.js' has the appropriate routes needed to execute all code in 'apiroutes'.
router.use('/api', apiroutes);

//Similar to the above, we help categorize the other routes here, with one difference: the 'routes' in 'htmlroutes' do not need a specific prefix added, so we assig '/', which essentially is = to 'blank'.
router.use('/', htmlroutes);

///It is important that we bundle all routes concerned with our app to this 'index.js' file, because when 'req'uiring a folder, JavaScript (by default) looks for the 'index.js' file in our root folder, so having all of the 'routes' here ensures that all 'routes' referenced can be read. Here we 'export' our bundled 'routes', to be imported by our 'hub', 'server.js'.
module.exports = router;
