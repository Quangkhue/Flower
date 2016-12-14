'use strict';

app.factory("Category", function(){
    var Category = {
        id: "",
        name: "",
        description: "",
        createdBy: ""
    };

    Category.parse = function(c){
        return {
            id: c.id,
            name: c.name,
            description: c.description,
            createdBy: c.createdBy
        }
    }

    return Category;
});
