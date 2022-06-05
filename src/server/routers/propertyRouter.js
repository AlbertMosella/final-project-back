const express = require("express");
const {
  getProperties,
  deleteProperty,
  createProperty,
} = require("../controllers/propertyControllers");

const propertyRouter = express.Router();

propertyRouter.get("/", getProperties);
propertyRouter.delete("/:idProperty", deleteProperty);
propertyRouter.post("/", createProperty);

module.exports = propertyRouter;
