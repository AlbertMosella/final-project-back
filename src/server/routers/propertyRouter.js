const express = require("express");
const {
  getProperties,
  deleteProperty,
  createProperty,
  editProperty,
  getOneProperty,
} = require("../controllers/propertyControllers");

const propertyRouter = express.Router();

propertyRouter.get("/", getProperties);
propertyRouter.delete("/:idProperty", deleteProperty);
propertyRouter.post("/", createProperty);
propertyRouter.put("/:idProperty", editProperty);
propertyRouter.get("/:idProperty", getOneProperty);

module.exports = propertyRouter;
