var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var compression = require('compression')
var mongoose = require('mongoose')
var productRoute = require('./routes/product')
var categoryRoute = require('./routes/category')
var fileRoute = require('./routes/file')

// Use native Node promises
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Flower')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var app = express()

app.use(compression())
app.use(bodyParser())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// serve our static stuff like index.css
app.use('/', express.static(path.join(__dirname, '../client')))
app.use('/files', express.static(path.join(__dirname, '/files')))

// routes
app.use('/v1/products', productRoute)
app.use('/v1/categories', categoryRoute)
app.use('/v1/files', fileRoute)

// route for client
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'))
});

// route for admin
app.get('/admin', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/admin.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
