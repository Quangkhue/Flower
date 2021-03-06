'use strict';

app.service("ProductSvc", function($rootScope, Product, $q, ConnectionSvc, AlertSvc){
    this.getProducts = function(params){
        var result = [];
        var dfd = $q.defer();
        ConnectionSvc.get(API_URL.PRODUCT.LIST, params).then(function(res){
            angular.forEach(res, function(prod){
                var p = new Product();
                p.parse(prod);
                result.push(p);
            })

            dfd.resolve(result);
        }, function(error){
            dfd.reject(error);
        })

        return dfd.promise;
    };

    this.getProductByCats = function(catIds, page){
        var result = [];
        var dfd = $q.defer();
        ConnectionSvc.post(API_URL.PRODUCT.LIST_BY_CAT, {catIds: catIds, page: page}).then(function(res){
            angular.forEach(res, function(prod){
                var p = new Product();
                p.parse(prod);
                result.push(p);
            })

            dfd.resolve(result);
        }, function(error){
            dfd.reject(error);
        })

        return dfd.promise;
    }

    this.create = function(prod){
        return ConnectionSvc.post(API_URL.PRODUCT.NEW, prod);
    };

    this.update = function(prod){
        return ConnectionSvc.put(API_URL.PRODUCT.UPDATE + prod.id, prod);
    };

    this.getById = function(id){
        var dfd = $q.defer();
        ConnectionSvc.get(API_URL.PRODUCT.DETAIL + id).then(function(prod){
            var p = new Product();
            p.parse(prod);
            dfd.resolve(prod);
        }, function(error){
            AlertSvc.showErrorMsg("Error", "Get product error: " + error.toString());
            dfd.reject(error);
        })
        return dfd.promise;
    };

    this.delete = function(id){
        return ConnectionSvc.delete(API_URL.PRODUCT.DELETE + id);
    };

    this.count = function(){
        var dfd = $q.defer();
        ConnectionSvc.get(API_URL.PRODUCT.COUNT).then(function(result){
            dfd.resolve(result);
        }, function(error){
            console.log("This is error: ", error);
            dfd.reject(error);
        });

        return dfd.promise;
    }

    this.getTopProds = function(){
        var dfd = $q.defer();
        ConnectionSvc.get(API_URL.PRODUCT.TOP_PRODUCTS).then(function(res){
            var result = [];
            angular.forEach(res, function(prod){
                var p = new Product();
                p.parse(prod);
                result.push(p);
            })
            dfd.resolve(result);
        }, function(error){
            dfd.reject(error);
        })

        return dfd.promise;
    }
});
