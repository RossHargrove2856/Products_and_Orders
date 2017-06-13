var app = angular.module("app",[]);
app.factory("productsFactory",function() {
    var products = [];
    var factory = {};
    factory.index= function(callback) {
        callback(products);
    }
    factory.create = function(newProduct, callback) {
        newProduct.quantity = 50;
        products.push(newProduct);
        callback(products);
    }
    factory.destroy = function(product, callback) {
        var idx = products.indexOf(product);
        products.splice(idx, 1);
        callback();
    }
    factory.buy = function(product, callback){
        if(product.quantity == 0){
            callback();
        } else {
            product.quantity--;
            callback();
        }
    }
    return factory;
});
app.controller("products",["$scope","productsFactory",function($scope, productsFactory) {
    $scope.products = [];
    $scope.index = function() {
        productsFactory.index(function(products) {
            $scope.products = products;
        });
    }
    $scope.create = function(newProduct) {
        productsFactory.create(newProduct, function() {
            $scope.index();
            $scope.newProduct = {};
        });
    }
    $scope.destroy = function(product) {
        productsFactory.destroy(product, function() {
            $scope.index();
        });
    }
}]);
app.controller("orders",["$scope","productsFactory",function($scope, productsFactory) {
    $scope.products = [];
    $scope.index = function() {
        productsFactory.index(function(products) {
            $scope.products = products;
        });
    }
    $scope.buy = function(product) {
        productsFactory.buy(product, function() {
            $scope.index();
        });
    }
    $scope.index();
}]);