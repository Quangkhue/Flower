'use strict';

app.factory("Comment", function(){
    var Comment = {
        id: "",
        content: "",
        createdBy: "",
        productId: "",
        product: null
    };

    Comment.parse = function(c){
        return {
            id: c.id,
            content: c.content,
            createdBy: c.createdBy,
            productId: c.productId,
            product: c.product
        }
    }

    return Comment;
});
