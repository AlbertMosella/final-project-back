const { Schema, model } = require("mongoose");

const PropertySchema = new Schema({
  typeOf: {
    type: String,
    require: true,
  },
  adress: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  surface: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  bedrooms: {
    type: Number,
    require: true,
  },
  bathrooms: {
    type: Number,
    require: true,
  },
  year: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  views: {
    type: Boolean,
    require: true,
    default: false,
  },
  heating: {
    type: Boolean,
    require: true,
    default: false,
  },
  airConditioning: {
    type: Boolean,
    require: true,
    default: false,
  },
  parking: {
    type: Boolean,
    require: true,
    default: false,
  },
  pool: {
    type: Boolean,
    require: true,
    default: false,
  },
  storage: {
    type: Boolean,
    require: true,
    default: false,
  },
  terrace: {
    type: Boolean,
    require: true,
    default: false,
  },
  fireplace: {
    type: Boolean,
    require: true,
    default: false,
  },
  garden: {
    type: Boolean,
    require: true,
    default: false,
  },
  laundryRoom: {
    type: Boolean,
    require: true,
    default: false,
  },
});

const Property = model("Property", PropertySchema, "properties");
module.exports = Property;
