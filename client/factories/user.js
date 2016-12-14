'use strict';

app.factory("User", function(){
    var User = {
        id: "",
        username: "",
        email: ""
    };

    User.parse = function(u){
        return {
            id: u.id,
            username: u.username,
            email: u.email
        }
    }

    return User;
});
