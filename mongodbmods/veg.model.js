const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vegSchema = new Schema({
  veg: {
    type: String,
    required: true, //value is required
    index: { unique: true }, //value must be unique, value is specified as the index
    trim: true, //remove whitespace
    minlength: 1,
  },
  name: {
    type: String,
    required: true,
    unique: false, //value is not required to be unique
    trim: true,
    minlength: 1,
  },
  water: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 1,
  },
  pDist: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 1,
  },
  gTime: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 1,
  },
  sType: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 1,
  },
  tip1: {
    type: String,
    required: false, //value is not required
    unique: false,
    trim: true,
    minlength: 1,
  },
  tip2: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    minlength: 1,
  },
});
//crud create read update delete added here, refer to my routes folder
const vegBase = mongoose.model("VegBase", vegSchema); //this makes a collection in mongodb called vegbases

module.exports = vegBase;
