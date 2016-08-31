'use strict';
angular.module('HMS').directive('requsitionStatus', function () {
    return {
        templateUrl: "ClientCode/Template/RequsitionStatus.html",
        restrict: "E",
        scope: {
            storeId: '@',
            storeList: '='
        },

        controller: function ($scope, $http,InventoryService) {


           
            $scope.$watch('storeId', function () {
                console.log($scope.storeId + "--requsition-");

            });

        }
    }


});