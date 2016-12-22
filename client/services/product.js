'use strict';

app.service("ProductSvc", function($rootScope, Product, ConnectionSvc){
    this.getProducts = function(){
        return ConnectionSvc.get(API_URL.PRODUCT.LIST);
    }
});
