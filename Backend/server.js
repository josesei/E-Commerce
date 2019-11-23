//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));



mongoose.connect("mongodb://localhost:27017/gaminghard", {useNewUrlParser: true});

const ProductSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    category: String,
    desc: String,
    price: Number,
    stock: Number,
    weight: Number,
    img: String,
    quantityToBuy: Number
},
{
    collection: 'Products'
});

const FeaturedProductSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    img: String
},
{
    collection: 'FeaturedProducts'
});


const Product = mongoose.model("Product", ProductSchema);

const FeaturedProduct = mongoose.model("FeaturedProduct", FeaturedProductSchema);

app.get("/product/:id", function (req, res){
    const ID = req.params.id;
    Product.findById(ID, function(err, selectedProduct){
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(selectedProduct);
    });
});

app.get("/featuredproducts", function(req, res) {
    FeaturedProduct.find(function(err, featuredProducts){
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(featuredProducts);
    });
});

app.get("/search/:productName", function(req, res) {
    const searchName = req.params.productName;
    Product.find({"name": { $regex: searchName, $options: "i" } } , function(err, products){
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(products);
    });
});


app.listen(3000, function(){
    console.log("Server started listening on port 3000");
});


