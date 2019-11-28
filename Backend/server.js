//Mongoosastic will auto index when document.save/Model.findOneAndUpdate/Model.insertMany/document.remove/Model.findOneAndRemove, but not include Model.remove/Model.update.
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");
const Schema = mongoose.Schema;


const app = express();

const PAGESIZE = 10;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));



mongoose.connect("mongodb://localhost:27017/gaminghard", {useNewUrlParser: true});



const ProductSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type:String, es_indexed:true },
    category: { type:String, es_indexed:false },
    brand: { type:String, es_indexed:false },
    model: { type:String, es_indexed:true },
    desc: { type:String, es_indexed:true },
    price: { type:Number, es_indexed:false },
    stock: { type:Number, es_indexed:false },
    weight: { type:Number, es_indexed:false },
    img: { type:String, es_indexed:false },
    quantityToBuy: { type:Number, es_indexed:false }
},
{
    collection: 'Products'
});

ProductSchema.plugin(mongoosastic, {
    host: "localhost",
    port: 9200,

});

const Product = mongoose.model("Product", ProductSchema);

Product.createMapping(function(err, mapping){
    if(err){
        console.log("error creating mapping (you can safely ignore this)");
        console.log("err");
    }else{
        console.log("Mapping successfully created");
        console.log(mapping);
    }
});

const FeaturedProductSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    img: String
},
{
    collection: 'FeaturedProducts'
});




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


app.get("/search/:searchTerm/:pageNumber", function(req, res){
    const searchTerm = req.params.searchTerm;
    const pageNumber = parseInt(req.params.pageNumber);
    Product.search({
        query_string: { query: searchTerm },}
        , {
            from: (pageNumber-1)*PAGESIZE,
            size: PAGESIZE,
            hydrate: true
          }
        , function(err, searchResults) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(searchResults);
      });
});


app.listen(3000, function(){
    console.log("Server started listening on port 3000");
});


