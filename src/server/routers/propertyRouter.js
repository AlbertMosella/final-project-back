const express = require("express");
const {
  getProperties,
  deleteProperty,
} = require("../controllers/propertyControllers");

const propertyRouter = express.Router();

propertyRouter.get("/", getProperties);
propertyRouter.delete("/:idProperty", deleteProperty);

module.exports = propertyRouter;
