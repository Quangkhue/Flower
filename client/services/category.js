'use strict';

app.service("CategorySvc", function($rootScope, Category, ConnectionSvc, $q){
    this.getCategories = function(){
        var result = [];
        var dfd = $q.defer();
        ConnectionSvc.get(API_URL.CATEGORY.LIST).then(function(res){
            angular.forEach(res, function(cat){
                var c = new Category();
                c.parse(cat);
                result.push(c);
            })

            dfd.resolve(result);
        }, function(error){
            dfd.reject(error);
        })

        return dfd.promise;
    };

    this.create = function(cat){
        return ConnectionSvc.post(API_URL.CATEGORY.NEW, cat);
    };

    this.update = function(cat){
        return ConnectionSvc.put(API_URL.CATEGORY.UPDATE + cat.id, cat);
    };

    this.getById = function(id){
        return ConnectionSvc.get(API_URL.CATEGORY.DETAIL + id);
    };

    this.delete = function(id){
        return ConnectionSvc.delete(API_URL.CATEGORY.DELETE + id);
    }
});
