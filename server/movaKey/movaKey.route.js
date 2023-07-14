//Express
const express = require("express");

const route = express.Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../utl/checkAccess");

const MovaKeyController = require("./movaKey.controller");

// get setting
route.get("/", checkAccessWithSecretKey(), MovaKeyController.index);

module.exports = route;
