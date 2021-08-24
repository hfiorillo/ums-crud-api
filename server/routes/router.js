const express = require('express');
// instead of calling a const app and creating a new app
// call route method of express to import to server.js
const route = express.Router()

const services = require('../services/render');

/**
 * @description Root Route
 * @method GET /
 */

route.get('/',services.homeRoutes);

/**
 * @description add user
 * @method GET /add-user
 */
 
route.get('/add-user',services.add_user);

/**
 * @description update user
 * @method GET /update-user
 */
 
route.get('/update-user',services.update_user);



 // export the route
 module.exports = route