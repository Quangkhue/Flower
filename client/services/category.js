'use strict';

app.service("CategorySvc", function($rootScope, Category, ConnectionSvc){
    this.getCategories = function(){
        return ConnectionSvc.get(API_URL.CATEGORY.LIST);
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
});
