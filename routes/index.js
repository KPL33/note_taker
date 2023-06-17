// And from there, 'server.js' is importing 'index.js', which will include both 'api' and 'html' 'routes' files.

//Here, we establish a 'router', which will serve to bundle the 'req'uest and 'res'ponse paths to be utilized in our 'server.js' file.
const router = require('express').Router();
const htmlroutes = require('./htmlroutes');
const apiroutes = require('./apiroutes');

//Here, we are declaring that for our router (for 'index.js'), we do not want to add a prefix, so we use '/' as one of the inputs, essentially leaving it blank. The other input we will 'use' is 'htmlroutes', which we're accessing from 'htmlroutes.js', through 'const htmlroutes', declaed above.

router.use('/api', apiroutes);

//Here, we are declaring that for our router (for 'index.js'), we do not want to add a prefix, so we use '/' as one of the inputs, essentially leaving it blank. The other input we will 'use' is 'htmlroutes', which we're accessing from 'htmlroutes.js', through 'const htmlroutes', declaed above. Importantly, the 'htmlroutes' file contains the '* route', so it needs to come last of the 'routes'. That is because it is designed to catch-'all' that has not been more specifically routed by the routes appearing above it in this code.
router.use('/', htmlroutes);

///It is important that we bundle all routes concerned with our app to the 'index.js' file, because when 'req'uiring a folder, JavaScript (by default) looks for the 'index.js' file, so having all of the 'routes' here ensures that all 'routes' referenced can be read. Here we 'export' our bundled 'routes', to be imported by our 'hub', 'server.js'.
module.exports = router;
