var express = require('express')
var path = require('path')
var compression = require('compression')

var app = express()

app.use(compression())

// serve our static stuff like index.css
app.use('/', express.static(path.join(__dirname, '../client')))

app.get('/', function (req, res) {
    console.log("Main page!");
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
