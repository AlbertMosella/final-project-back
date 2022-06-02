const express = require("express");
const { getProperties } = require("../controllers/propertyControllers");

const propertyRouter = express.Router();

propertyRouter.get("/", getProperties);

module.exports = propertyRouter;
