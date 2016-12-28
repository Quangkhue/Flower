'use strict';
var app = angular.module("FlowerAdmin", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.router', 'ui.select']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
            abstract: true,
            views: {
                root: {
                    templateUrl: "/admin/layout/layout.html",
                    controller: "MainCtrl"
                }
            }
        })
        .state('app.category', {
            templateUrl: "/admin/category/views/list.html",
            controller: "CategoryListCtrl",
            url: "/category"
        })
        .state('app.category-detail', {
            templateUrl: "/admin/category/views/detail.html",
            url: "/category/:id",
            resolve: {
                cat: function($stateParams, CategorySvc){
                    return {};
                }
            }
        })
        .state('app.product', {
            templateUrl: "/admin/product/views/list.html",
            controller: "ProductListCtrl",
            url: "/product"
        })
        .state('app.product-detail', {
            templateUrl: "/admin/product/views/detail.html",
            url: "/product/:id",
            controller: "ProductDetailCtrl",
            resolve: {
                prod: function($stateParams, ProductSvc){
                    return $stateParams.id ? ProductSvc.getById($stateParams.id) : {};
                }
            }
        })

    $urlRouterProvider.otherwise('/product');
});
