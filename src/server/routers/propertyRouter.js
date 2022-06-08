const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getProperties,
  deleteProperty,
  createProperty,
  editProperty,
  getOneProperty,
} = require("../controllers/propertyControllers");

const propertyRouter = express.Router();

const upload = multer({
  dest: path.join("uploads", "images"),
});

propertyRouter.get("/", getProperties);
propertyRouter.delete("/:idProperty", deleteProperty);
propertyRouter.post("/", upload.single("image"), createProperty);
propertyRouter.put("/:idProperty", editProperty);
propertyRouter.get("/:idProperty", getOneProperty);

module.exports = propertyRouter;
