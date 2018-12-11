const mongoose = require("mongoose");

//const schema = mongoose.Schema; use destructure below instead
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0
  }
});

mongoose.model("users", userSchema);
