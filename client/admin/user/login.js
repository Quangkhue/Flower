'use strict';

app.controller('LoginCtrl', function($rootScope, $scope, $cookies, $state, $http){
    $scope.init = function(){
        $scope.user = {};
    }

    $scope.login = function(){
        $http.post('/v1/users/login', $scope.user).then(function(res){
            if(!res.data.token){
                alert(res.data);
            } else {
                var token = res.data.token;
                $cookies.put('token', token);
                $state.go('app.product');
            }
        }, function(error){
            alert(error.data);
        })
    }
})
