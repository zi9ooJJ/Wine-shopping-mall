const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const OrderSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    ordererId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    // canceledAt: {
    //   type: Date,
    // },
  },
  {
    collection: "orders", //"orders",
    timestamps: true, // format기능
    versionKey: false,
  }
);
exports.Order = mongoose.model("Order", OrderSchema);
