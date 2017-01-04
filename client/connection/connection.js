'use strict';

app.service("ConnectionSvc", function($q, $http){
    this.get = function(url, params){
        var dfd = $q.defer();
        $http.get(url, {params: params || {}}).then(function(res){
            dfd.resolve(successHandler(res));
        }, function(error){
            dfd.reject(errorHanlder(error));
        })
        return dfd.promise;
    };

    this.post = function(url, data){
        var dfd = $q.defer();
        $http.post(url, data).then(function(res){
            dfd.resolve(successHandler(res));
        }, function(error){
            dfd.reject(errorHanlder(error));
        })
        return dfd.promise;
    };

    this.put = function(url, data){
        var dfd = $q.defer();
        $http.put(url, data).then(function(res){
            dfd.resolve(successHandler(res));
        }, function(error){
            dfd.reject(errorHanlder(error));
        })
        return dfd.promise;
    };

    this.delete = function(url){
        var dfd = $q.defer();
        $http.delete(url).then(function(res){
            dfd.resolve(successHandler(res));
        }, function(error){
            dfd.reject(errorHanlder(error));
        })
        return dfd.promise;
    };

    var errorHanlder = this.errorHandler = function(error){
        console.log(error);
    };

    var successHandler = this.successHandler = function(res){
        return res.data;
    }
});
