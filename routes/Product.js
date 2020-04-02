var GenerateSchema = require("generate-schema");
const Product = {
  email: "fuckinghard12@gmail.com",
  password: "test123",
  product: {
    name: "test",
    value: 2
  }
};

var schema = GenerateSchema.json("Product", Product);

console.log(JSON.stringify(schema));

const schema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  title: "Product",
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
    product: {
      type: "object",
      properties: { name: { type: "string" }, value: { type: "number" } }
    }
  }
};
