const express = require('express')
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3000

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.get('/', (req, res) => {
  res.send('Hello Nortal !')
})


//Get 
app.get('/students', (req, res) => {
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("uni");
        dbo.collection("students").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.status(200).send(result)
        });
    });
  })

//Add
app.post('/students', (req, res) => {

    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("uni");
      var myobj = req.body
      console.log(myobj)
      dbo.collection("students").insertOne(myobj, function(err, result) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
        res.status(200).send(myobj)
      });
    });
  })

  //Get one
  app.get('/students/:id', (req, res) =>{
      var params = req.params;
      console.log(params)
      var studentNumber = parseInt(params.id)
      console.log(studentNumber)
        MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
          if (err) throw err;
          var dbo = db.db("uni");
          dbo.collection("students").find({"student_number": studentNumber}).toArray(function(err, result) {
              if (err) throw err;
              console.log(result);
              db.close();
              res.status(200).send(result)
          });
      });
  })

  //Delete
  app.delete('/students/:id', (req, res) =>{
      var params = req.params;
      console.log(params)
      var studentNumber = parseInt(params.id)
      console.log(studentNumber)
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("uni");
          var myquery = { "student_number": studentNumber };
          dbo.collection("students").deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
          });
      });
  })

  //Update
  app.put('/students/:id', (req, res) =>{
    var params = req.params;
    var studentNumber = parseInt(params.id)
    var newStudent = req.body
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("uni");
      var myquery = { "student_number": studentNumber };
      var newvalues = { $set: newStudent };
      dbo.collection("students").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
          console.log("1 document updated");
          db.close();
          res.status(200).send(result)
        });  
      });
    })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

