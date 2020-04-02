const router = require("express").Router();
const _ = require("lodash");
const User = require("../model/User");
const UserProduct = require("../model/UserProduct");
const {
  registerValidation,
  loginValidation,
  userProductValidation
} = require("../validation");

// 1. Create user which takes 2 parameters email and password. Enforce strong password rule and add validation for email format

router.post("/create", async (req, res) => {
  //Validate the user before we create a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user is already in the database

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  const user = new User({
    email: req.body.email,
    password: req.body.password
    // product: req.body.product
  });
  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login Authentication

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // check for the user-email exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (!emailExist) return res.status(400).send("Email doesnot exists");
  res.send("Logged in");
});

// 2. Create a product for the user which takes 2 parameter productName and productPrice
router.post("/:email/product", async (req, res) => {
  const email = req.params.email;
  const data = { email, ...req.body };
  const { error } = userProductValidation(data);
  if (
    error &&
    error.details &&
    _.get(error, "details[0].message") == '"email" must be a valid email'
  ) {
    return res.status(401).send("Invalid User Email: Please Enter Valid Email");
  }
  if (
    error &&
    error.details &&
    _.get(error, "details[0].message") == '"product.productPrice" is required'
  ) {
    return res.status(400).send("Please provide valid price");
  }
  if (
    error &&
    error.details &&
    _.get(error, "details[0].message") == '"product.productName" is required'
  ) {
    return res.status(400).send("Please provide valid Product Name");
  }
  if (error) return res.status(400).send(error.details[0].message);

  const product = new UserProduct({
    email: req.params.email,
    product: req.body.product
  });
  try {
    const savedProduct = await product.save();
    res.status(200).send(savedProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

// 3. Update the product by taking productName and productPrice as input
router.put("/:email/product/:productId", async(req, res, next) => {
  const email = req.params.email;
  const productId = req.params.productId;
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;

  const emailExist = await UserProduct.findOne({ email: email });
  if (!emailExist) return res.status(400).send("Email doesnot exists");

  const productExist = await UserProduct.findOne({ "product._id": productId });
  if (!productExist) return res.status(400).send("No such product id exists");


  UserProduct.updateOne(
    { email: email, "product._id": productId },
    {
      $set: {
        "product.productName": productName,
        "product.productPrice": productPrice
      },
      $currentDate: { lastModified: true }
    }
  )
    .exec()
    .then(docs => {
      console.log(docs)
      res.status(204).send("Updated");
    })
    .catch(err => {
      console.log(err);
      res.status(401).json({
        error: err
      });
    });
});

//4. Delete the product by taking id as input

router.delete("/:email/product/:productId", async (req, res) => {
  const email = req.params.email;
  console.log(email);
  const productId = req.params.productId;
  console.log(UserProduct);

  const emailExist = await UserProduct.findOne({ email: email });
  if (!emailExist) return res.status(400).send("No such email exists");

  const productExist = await UserProduct.findOne({ "product._id": productId });
  if (!productExist) return res.status(400).send("No such product id exists");

  // Remove UserProduct
  UserProduct.remove({ "product._id": productId })
    .exec()
    .then(result => {
      res.status(204).send("Deleted Successfully");
    })
    .catch(err => {
      res.status(401).send(err);
    });
});

// 5. Get all the product in JSON format

router.get("/:email/product", (req, res, next) => {
  UserProduct.find({ email: req.params.email })
    .exec()
    .then(docs => {
      if (docs.length >= 1) {
        const data = [];
        _.forEach(docs, function(value) {
          data.push(value.product);
        });
        console.data;
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "No entries found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(401).json({
        error: err
      });
    });
});

module.exports = router;
