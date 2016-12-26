'use strict';

app.factory("Category", function(){
    var Category = function (){
        this.init = function(){
            this.id = "",
            this.name = "",
            this.description = "",
            this.createdBy = "",
            this.isDeleted = false
        };

        this.parse = function(c){
            this.id = c.id;
            this.name = c.name;
            this.description = c.description;
            this.createdBy = c.createdBy;
            this.isDeleted = false;
        }

        this.init();
    }

    return (Category);
});
