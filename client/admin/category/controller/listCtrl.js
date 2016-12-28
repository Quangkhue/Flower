'use strict';

app.controller("CategoryListCtrl", function($scope, $rootScope, CategorySvc, $uibModal, AlertSvc){
    console.log("Category list ctrl");

    $scope.init = function(){
        CategorySvc.getCategories().then(function(result){
            $scope.categories = angular.copy(result);
            console.log("Categories: ", $scope.categories);
        });
    }

    $scope.edit = function(cat){
        cat.isEditing = true;
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
            controller: function($scope, $rootScope, $uibModalInstance, Category, CategorySvc, cat){
                $scope.init = function(){
                    $scope.cat = cat ? cat : new Category();
                }

                $scope.save = function(){
                    console.log("Save category: ", $scope.cat);
                    if(!$scope.cat){
                        console.log("no name");
                        return;
                    }
                    CategorySvc.create($scope.cat).then(function(newCat){
                        $uibModalInstance.close(newCat);
                    });
                }

                $scope.cancel = function(){
                    $uibModalInstance.dismiss('cancel');
                }
            },
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
