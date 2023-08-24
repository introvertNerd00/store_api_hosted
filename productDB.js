require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/products");

const Products_json = require("./product.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Product.deleteMany();
    await Product.create(Products_json);
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
}

start();