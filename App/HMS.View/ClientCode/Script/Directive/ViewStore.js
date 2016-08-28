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

            $scope.GetStores = function () {

                InventoryService.GetStores()
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