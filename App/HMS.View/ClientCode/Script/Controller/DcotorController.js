'use strict';


HmsApp.controller("DcotorController", function ($scope, $routeParams, $window, $filter, $route, $modal, DcotorService, IniService) {


    function init() {


        var tabClass = ".dashboard";
        if ($routeParams.tab != null) {
            tabClass = "." + $routeParams.tab;
        }
        $('.tabs li').removeClass('active');
        $(tabClass).addClass('active');
        $(tabClass).removeClass('hide');


        $scope.saveGeneralInfo=function()
        {

            $('#popupGeneralInfo').css("visibility", "hidden");
            $('#popupGeneralInfo').css("opacity", 0);
        }

        $scope.savePatientHistory=function()
        {
            $('#popupPatientHistory').css("visibility", "hidden");
            $('#popupPatientHistory').css("opacity", 0);
        }

    }
    /*------------------------- configuration begin -------------------------*/

    $scope.GetConfiguration = function () {

        IniService.GetConfiguration()
            .success(function (data) {

                $scope.Configuration = data;


                $scope.medicalTypeDrugId = $scope.Configuration.Configuration.MedicalTypeDrug.toString();
                // $scope.SingleItem.MedicalTypeId = $scope.Configuration.Configuration.MedicalTypeDrug;
                $scope.NonRegisterPatientId = $scope.Configuration.Configuration.NonRegisterPatientId;
                $scope.ServiceProviderType = $scope.Configuration.Configuration.DoctorTypeId;
                // $scope.SingleItem.ItemTypeId = $scope.Configuration.Configuration.ServiceItem;
                $scope.medicalTypeIdLab = $scope.Configuration.Configuration.MedicalTypeLabTest.toString();

                init();

            }).error(function (error) {

                $scope.status = 'Unable to Discharge Admission: ' + error.message;
                console.log($scope.status);

            });

    }

    $scope.GetConfiguration();

    /*------------------------- configuration end -------------------------*/
});