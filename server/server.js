var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var compression = require('compression')
var mongoose = require('mongoose')
var productCtrl = require('./routes/product')
var categoryCtrl = require('./routes/category')

// Use native Node promises
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Flower')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var app = express()

app.use(compression())

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// serve our static stuff like index.css
app.use('/', express.static(path.join(__dirname, '../client')))

// routes
app.use('/v1/products', productCtrl)
app.use('/v1/categories', categoryCtrl)

app.get('/', function (req, res) {
    console.log("Main page!");
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
