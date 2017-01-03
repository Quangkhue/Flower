var express = require('express');
var router = express.Router();
var APIResHandler = require('./apiResponseHandler');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

router.post('/upload', function(req, res, next) {
    var form = new formidable.IncomingForm();
    //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./files";       //set upload directory
    form.keepExtensions = true;     //keep file extension

    form.parse(req, function(err, fields, files) {
        //Formidable changes the name of the uploaded file
        //Rename the file to its original name
        var newPath = './files/'+files.file.name;
        fs.rename(files.file.path, newPath, function(err) {
            if (err)
                throw err;
              APIResHandler.successHandler(res, newPath.replace(".", ""));
        });
    });
});

module.exports = router;
