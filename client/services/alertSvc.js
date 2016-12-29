'use strict';

app.service('AlertSvc', function($rootScope){
    $rootScope.alertMsgs = [];

    this.showSuccessAlert = function(title, msg){
        swal(title, msg || "Success", "success");
    }

    this.showErrorAlert = function(title,  msg){
        swal(title, msg || "Error", "error");
    }

    this.showConfirm = function(title, msg, cb){
        swal({
          title: title || "Are you sure?",
          text: msg || "You will not be able to recover this file!",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn-danger",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: true,
          closeOnCancel: true
        },cb);
    }
})
