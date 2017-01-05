'use strict';

app.controller("CategoryListCtrl", function($scope, $rootScope, CategorySvc, $uibModal, AlertSvc, FileUploadSvc){
    console.log("Category list ctrl");

    var detailCtrl = function($scope, $rootScope, $uibModalInstance, Category, CategorySvc, cat, FileUploadSvc){
        $scope.init = function(){
            $scope.cat = cat ? cat : new Category();
            var uploaders = ['imageUploader'];
            FileUploadSvc.initUploader($scope, uploaders);
        }
        $scope.displayImgName = function(path){
            var temp = path.split("/");
            return temp[temp.length - 1];
        }
        $scope.save = function(){
            if(!$scope.cat){
                console.log("no name");
                return;
            }

            if($scope.imageUploader.queue.length){
                FileUploadSvc.uploadAll(function(){
                    doSave();
                }, function(fileItem, response, status, headers){
                    $scope.cat.imgUrl = response;
                }, $scope.imageUploader)
            } else {
                doSave();
            }

        };

        function doSave(){
            if($scope.cat.id){
                // update prod
                console.log("update product");
                CategorySvc.update($scope.cat).then(function(result){
                    $uibModalInstance.close(result);
                });
            } else {
                // create prod
                console.log("create product");
                CategorySvc.create($scope.cat).then(function(newCat){
                    $uibModalInstance.close(newCat);
                });
            }
        }

        $scope.removeAttachedFile = function(index){
            $scope.cat.imgUrl.splice(index, 1);
        };

        $scope.cancel = function(){
            $uibModalInstance.dismiss('cancel');
        }
    }

    $scope.init = function(){
        CategorySvc.getCategories().then(function(result){
            $scope.categories = angular.copy(result);
        });
    }

    $scope.edit = function(cat, index){
        // cat.isEditing = true;
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/admin/category/views/newCategory.html',
            controller: detailCtrl,
            size: "md",
            resolve: {
                cat: function() {
                    return cat;
                }
            }
        });

        modalInstance.result.then(function(newCat) {
            $scope.categories[index] = angular.copy(newCat);
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    }

    $scope.delete = function(catId, index){
        AlertSvc.showConfirm("", "", function(){
            CategorySvc.delete(catId).then(function(){
                $scope.categories.splice(index, 1);
                AlertSvc.showSuccessAlert("Success", "Delete success");
            });
        })
    }

    $scope.save = function(cat){
        console.log("Category: ", cat);
        delete cat.isEditing;
        CategorySvc.update(cat);
    }

    $scope.addNew = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/admin/category/views/newCategory.html',
            controller: detailCtrl,
            size: "md",
            resolve: {
                cat: function() {
                    return {};
                }
            }
        });

        modalInstance.result.then(function(newCat) {
            $scope.categories.push(newCat);
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    }
})
