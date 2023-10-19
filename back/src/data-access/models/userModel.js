const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    //& (중요) role의 default 값 user로 하기
    role: {
      type: String,
      default: "user",
      required: true,
    },
  },
  {
    collection: "users",
    timestamps: true, // format기능 & updatedAT, createdAt 자동 생성
    versionKey: false,
    runValidators: true, // type대로 값을 확인해줌.
    new: true
  }
);


exports.User = mongoose.model("User", UserSchema); // 첫번째 인자가 collections 네임, 두번째 인자가 형식 정해줌
