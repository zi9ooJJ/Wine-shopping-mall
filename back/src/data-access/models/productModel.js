const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    producer: {
      type: String,
      required: true,
    },

    // TODO: 구매할 때 수량 조정 가능 여부 확인
    // inventory: {
    //     type: Number,
    //     min: 0,
    //     default: 10,
    //     required: false
    // }
  },
  {
    collection: "products",
    timestamps: true, // format기능
    versionKey: false,
  }
);

exports.Product = mongoose.model("Product", ProductSchema);
