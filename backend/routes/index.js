const express = require('express');
const router = express.Router();
const pingRoutes = require('./ping');
const generateTokenRoutes=require("./generateToken")
const matchDataRoutes=require("./matchData")
const byBallsDataRoutes=require("./byBallData")

pingRoutes(router);
generateTokenRoutes(router)
matchDataRoutes(router)
byBallsDataRoutes(router)

module.exports = router;