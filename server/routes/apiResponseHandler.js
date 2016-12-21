module.exports.errorHandler = function(res, err){
    res.json(err.message);
}

module.exports.successHandler = function(res, result){
    res.json(result);
}
