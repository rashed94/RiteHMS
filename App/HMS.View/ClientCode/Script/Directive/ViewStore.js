'use strict';
angular.module('HMS').directive('viewStore', function () {
    return {
        templateUrl: "ClientCode/Template/ViewStore.html",
        restrict: "E",
        scope: {
            editUrl: '@'
        },
        controller: function ($scope, $routeParams, $http, InventoryService) {

            $scope.StoreList = [];

           var storeType = 0;

           $scope.GetStores = function () {

               InventoryService.GetStores(storeType)
                .success(function (pt) {
                    $scope.StoreList = pt;
                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load  Store data: ' + error.message;
                    console.log($scope.status);
                });
            }

            $scope.DeleteStore = function () {

            }

            $scope.GetStores();


        }
    }
});