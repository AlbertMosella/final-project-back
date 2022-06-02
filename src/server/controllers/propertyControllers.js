const chalk = require("chalk");
const debug = require("debug")("rustik:propertyControllers");
const Property = require("../../database/model/Property");

const getProperties = async (req, res) => {
  debug(chalk.green("Properties request received"));
  const properties = await Property.find();
  res.status(200).json(properties);
};

module.exports = { getProperties };
