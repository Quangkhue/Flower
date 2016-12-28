'use strict';

app.factory("Product", function(){
    var Product = function (){
        this.init = function(){
            this.id = "",
            this.name = "",
            this.shortDes = "",
            this.longDes = "",
            this.createdBy = "",
            this.isDeleted = false,
            this.imgUrls = [],
            this.cats = [],
            this.comments = []
        };

        this.parse = function(p){
            this.id = p.id;
            this.name = p.name;
            this.shortDes = p.shortDes;
            this.longDes = p.longDes;
            this.createdBy = p.createdBy;
            this.isDeleted = p.isDeleted;
            this.cats = p.cats;
            this.comments = p.comments;
            this.imgUrls = p.imgUrls;
        };

        this.init();
    }

    return (Product);
});
