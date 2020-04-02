const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName : { type: "string" }, productPrice: { type: "number" } 
})

const userProductSchema = new mongoose.Schema({
  email: { type: "string" },
  product: productSchema
});

module.exports = mongoose.model("UserProduct", userProductSchema);
