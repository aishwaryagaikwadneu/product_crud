const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: { type: "string" }, value: { type: "number" } 
// })

const userSchema = new mongoose.Schema({
  email: { type: "string" },
  password: { type: "string" },
  // product: productSchema
});

module.exports = mongoose.model("User", userSchema);
