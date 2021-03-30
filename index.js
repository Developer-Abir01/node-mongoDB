
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId





const uri = "mongodb+srv://userDocu:yDZXnzRcpwNj9Gqw@cluster0.qatfi.mongodb.net/documentUser?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express()
const port = 5000

const pass = 'yDZXnzRcpwNj9Gqw';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html')
})


client.connect(err => {
  const productCollection = client.db("documentUser").collection("userss");

  app.get('/products', (req, res) => {
    productCollection.find({})
      .toArray((err, document) => {
        res.send(document)
      })
  })

  app.get("/product/:id", (req, res) => {
    productCollection.find({ _id: ObjectId(req.params.id) })
      .toArray((err, document) => {
        res.send(document[0])
      })
  })


  app.patch(`/update/:id`, (req,  res) =>{
    console.log(req.params.id)
    productCollection.updateOne({ _id: ObjectId(req.params.id) },
    
    {
      $set: {price: req.body.price, quantity: req.body.quantity}
    }
    
    )
    
   .then(result =>{
     res.send(result.modifiedCount > 0)
   })

  })

  app.post("/addProduct", (req, res) => {
    const product = req.body;
    productCollection.insertOne(product)
      .then(result => {
        console.log("success")
      })
    res.redirect("/")
  })


  app.delete('/delete/:id', (req, res) => {
    productCollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
         res.send(result.deletedCount > 0)
      })


  
  })

});



app.listen(port)