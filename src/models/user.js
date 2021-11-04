const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
  password: {
    type: String,

    validate(value) {
      if (!validator.isStrongPassword) {
        throw new Error(
          "missing: minlenth of password is 8 in which atleast minLowercase 1 minuppercase 1 minstymbol 1"
        );
      }
    },
  },
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
