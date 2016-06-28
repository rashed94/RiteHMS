'use strict';
HmsApp.controller("AddItemController", function ($scope, $http,$filter, AddItemService) {

    $scope.MedicalTypes = {};
    $scope.medicalTypeID = "62";
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
        MedicalType: $scope.medicalTypeID
    }
    $scope.GetMedicalType();


  
    $scope.OnItemSelect = function ($item) {
        $item.Quantity = 1;
        $item.Amount = $item.SalePrice;
        $item.ReferralFee = $item.DefaultReferrarFee;
        $scope.Item = "";
        
        var found = $filter('filter')($scope.Items, { Id: $item.Id }, true);
        if (!found.length) {
            $scope.Items.push($item);
        }
        //angular.forEach($scope.Items, function(obj){
        //    obj.push($item);
        //});
    }

    $scope.GetServiceProviderPartialName = function (name, itemid) {

        
        //return $http.get('/patient/getserviceproviderpartialname?name=' + name + "&itemid=" + itemid).then(function (response) {
        //    var data = response.data;
        //    return response.data;
        //});

        /*----------------------------  TypeId 56 means doctor --------------------------------------------------*/

        return $http.get('/patient/getdoctorpartialname?name=' + name + "&typeId=" + 56 + "&itemId=" + itemid).then(function (response) {
            var data = response.data;
            return response.data;
        });


    }

     $scope.GetItembyMedicalPartialName = function (name) {
         return $http.get('/Patient/GetItembyMedicalPartialName?id=' + $scope.filterCondition.MedicalType + '&name=' + name).then(function (response) {
             return response.data;
         });
     }
    // $scope.GetServiceProviderPartialName('m');
     //var test = $scope.GetItembyMedicalPartialName('usg');

    //$scope.operators = [
    //    { ID: 'eq', Name: 'equals' },
    //    { ID: 'neq', Name: 'not equal' }
    //]

});