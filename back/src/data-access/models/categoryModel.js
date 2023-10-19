const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  {
    collection: "categories",
    timestamps: true, // format기능
    versionKey : false
  }
);

exports.Category = mongoose.model('Category', CategorySchema); 
