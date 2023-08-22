const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Is_Admin: {
    type: String,
    required: true,
  },
  forgettoken: {
    type: String,
    default: "",
  },
  Tokens: [
    {
      Token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.pre("save", async function () {
  try {
    if (this.isModified("password")) {
      console.log(this.password);
      this.password = await bcrypt.hash(this.password, 4);
      console.log(this.password);
    }
  } catch (error) {
    console.log(error.message);
  }
});

UserSchema.methods.GenerateToken = async function () {
  try {
    const Token = await jwt.sign({ _id: this._id }, config.SEC_KEY);
    this.Tokens = this.Tokens.concat({ Token });
    await this.save();
    return Token;
  } catch (error) {
    console.log(error);
  }
};

const User = new mongoose.model("User", UserSchema);

module.exports = User;
