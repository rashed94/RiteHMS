'use strict';
HmsApp.controller("AddItemController", function ($scope, $http, AddItemService) {

    $scope.MedicalTypes = {};
    $scope.GetMedicalType = function () {

        AddItemService.GetMedicalType()
            .success(function (mdtype) {
                $scope.MedicalTypes = mdtype;

            })
            .error(function (error) {
            $scope.status = 'Unable to load ItemCategory data: ' + error.message;
            console.log($scope.status);
            });
    }

    $scope.filterCondition = {
        MedicalType: '62'
    }
     $scope.GetMedicalType();

     $scope.GetItembyMedicalPartialName = function (name) {
         return $http.get('/Patient/GetItembyMedicalPartialName?id=' + $scope.filterCondition.MedicalType + '&name=' + name).then(function (response) {
             return response.data;
         });
     }
     //var test = $scope.GetItembyMedicalPartialName('usg');

    //$scope.operators = [
    //    { ID: 'eq', Name: 'equals' },
    //    { ID: 'neq', Name: 'not equal' }
    //]

});