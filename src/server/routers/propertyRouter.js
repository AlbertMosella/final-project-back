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
const auth = require("../middlewares/auth/auth");

const propertyRouter = express.Router();

const upload = multer({
  dest: path.join("uploads", "images"),
});

propertyRouter.get("/", getProperties);
propertyRouter.delete("/:idProperty", auth, deleteProperty);
propertyRouter.post("/", upload.single("image"), auth, createProperty);
propertyRouter.put("/:idProperty", auth, editProperty);
propertyRouter.get("/:idProperty", getOneProperty);

module.exports = propertyRouter;
