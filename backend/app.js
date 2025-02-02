const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product");

// * connect to Mongo DB
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.xfykdza.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use(express.json());

// we want calhost:3000 and localhost:4200 to communicate with each other, so we add headers
// This will allow requests from all origins to access your API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//* get all products
app.get("/api/products", (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json({ products: products });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

// * save new objs from POST into db
app.post("/api/products", (req, res, next) => {
  const product = new Product({
    description: req.body.description,
    inStock: req.body.inStock,
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then(() => {
      res.status(201).json({ product: product });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

app.get("/api/products/:id", (req, res, next) => {
  Product.findOne({
    _id: req.params.id,
  })
    .then((product) => {
      res.status(200).json({ product: product });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
});

app.put("/api/products/:id", (req, res, next) => {
  const product = new Product({
    _id: req.params.id,
    description: req.body.description,
    name: req.body.name,
    price: req.body.price,
    inStock: req.body.inStock,
  });
  Product.updateOne({ _id: req.params.id }, product)
    .then(() => {
      res.status(201).json({ message: "Modified!" });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

app.delete("/api/products/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

// very important
module.exports = app;
