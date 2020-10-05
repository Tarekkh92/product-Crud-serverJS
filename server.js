var express = require("express");
var bodyParser= require("body-parser");
var mongoose= require("mongoose");
var  cors = require('cors')
var app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;
var router = express.Router();
app.use(cors());
app.use('/api', router);
app.listen(port);
console.log('REST API is runnning at ' + port);

mongoose.connect("mongodb://localhost:27017/openLegacy2020",function(err,database){

if(err)
console.log("Error"+err);
else{
    console.log("we are connected to database: "+database.name);
}

});

var Product= mongoose.model("Product",{

    productName:String,
    productDescription:String,
    productCount:String,
    

});

app.post("/products",function(request,response){

    var product= new Product(request.body);
    //product.publishedDate=new Date().toLocaleDateString()+" at: "+new Date().toLocaleTimeString();
    product.save(function(err,product){

        if(err)
        {
            console.log("Error: "+err);
            response.status(500);
            response.send(err);
        }
        else {
            response.status(201);
            response.send(product);
        }
        


    });

});



app.get("/products",function(request,response){
Product.find({},function(err,products){

if(err)
{
    console.log("Error: "+err);
    response.status(500);
    response.send(err);
}
else{
 response.send(products);

}


});


});

app.get("/products/:_id",function(request,response){

Product.findOne({_id:request.params._id},function(err,product){

    if(err){
console.log("Error: "+err);
response.status(500);
response.send(err);
    }

    else{
      
        response.send(product);

    }

})


});

app.delete("/products/:_id",function(request,response){

    Product.remove({_id:request.params._id},function(err,product){
    
        if(err){
    console.log("Error: "+err);
    response.status(500);
    response.send(err);
        }
    
        else{
          
            response.send(product);
    
        }
    
    })
    
    
    });

app.put("/products/:_id",function(request,response){

    var product= new Product(request.body);
    product._id=request.params._id;

    Product.updateOne({_id:request.params._id},product,function(err,product){
    
        if(err){
    console.log("Error: "+err);
    response.status(500);
    response.send(err);
        }
    
        else{
          
            response.send(product);
    
        }
    
    })
    
    
    });