const express = require("express");
const productRoutes = express.Router();

let Product = require("../models/Product.model");

productRoutes.route("/create").post(function (req, res) {
  let product = new Product(req.body);
  product
    .save()
    .then((product) => {
      res.status(200).json({ product: "product in added successfully" });
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

productRoutes.route("/").get(function (req, res) {
  Product.find(function (err, products) {
    if (err) {
      console.log(err);
    } else {
      res.json(products);
    }
  });
});

// Defined edit route
productRoutes.route("/edit/:id").get(function (req, res) {
  let id = req.params.id;
  Product.findById(id, function (err, business) {
    res.json(business);
  });
});

//  Defined update route
productRoutes.route("/update/:id").post(function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    if (!product) res.status(404).send("data is not found");
    else {
      console.log(product);
      product.name = req.body.name;
      product.price = req.body.price;
      product.img = req.body.img;

      product
        .save()
        .then((business) => {
          res.json("Update complete");
        })
        .catch((err) => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

module.exports = productRoutes;
