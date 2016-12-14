'use strict';

app.factory("Product", function(){
    var Product = {
        id: "",
        imgUrls: [],
        description: "",
        catIds: [],
        cats: [],
        comments: []
    };

    Product.parse = function(p){
        return {
            id: p.id,
            imgUrls: p.imgUrls,
            description: p.description,
            catIds: p.catIds,
            cats: p.cats,
            comments: p.comments
        }
    }

    return Product;
});
