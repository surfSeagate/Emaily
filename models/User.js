const mongoose = require("mongoose");

//const schema = mongoose.Schema; use destructure below instead
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

mongoose.model("users", userSchema);
