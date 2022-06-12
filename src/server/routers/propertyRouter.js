const express = require("express");

const {
  getProperties,
  deleteProperty,
  createProperty,
  editProperty,
  getOneProperty,
} = require("../controllers/propertyControllers");
const auth = require("../middlewares/auth/auth");

const propertyRouter = express.Router();

propertyRouter.get("/", getProperties);
propertyRouter.delete("/:idProperty", auth, deleteProperty);
propertyRouter.post("/", auth, createProperty);
propertyRouter.put("/:idProperty", auth, editProperty);
propertyRouter.get("/:idProperty", getOneProperty);

module.exports = propertyRouter;
