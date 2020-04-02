const Joi = require("@hapi/joi");

const registerValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email()
  });
  return schema.validate(data);
};

const userProductValidation = data => {
  console.log("data", data);
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    product: Joi.object({
      productName: Joi.string()
        .min(3)
        .required(),
      productPrice: Joi.number().required()
    })
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.userProductValidation = userProductValidation;
