const express = require("express");
const {
  getProperties,
  deleteProperty,
  createProperty,
  editProperty,
} = require("../controllers/propertyControllers");

const propertyRouter = express.Router();

propertyRouter.get("/", getProperties);
propertyRouter.delete("/:idProperty", deleteProperty);
propertyRouter.post("/", createProperty);
propertyRouter.put("/:idProperty", editProperty);

module.exports = propertyRouter;
