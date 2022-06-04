const chalk = require("chalk");
const debug = require("debug")("rustik:propertyControllers");
const Property = require("../../database/model/Property");

const getProperties = async (req, res) => {
  debug(chalk.green("Properties request received"));
  const properties = await Property.find();
  res.status(200).json(properties);
};

const deleteProperty = async (req, res) => {
  debug(chalk.green("Request to delete a property received"));
  const { idProperty } = req.params;
  await Property.findByIdAndDelete(idProperty);
  res.status(200).json({ msg: `The property has been deleted` });
};

module.exports = { getProperties, deleteProperty };
