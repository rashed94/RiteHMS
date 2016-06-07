'use strict';

HmsApp.controller("LabTestController", function ($scope, $routeParams, $window, $filter, $modal, LabTestService) {

    $scope.$on('patientchange', function (event, args) {
        // console.log("patient changes");
        if ($routeParams.tab == "addlabtest") {

        }

        if ($routeParams.tab == "summary") {

            if (!$scope.LabTestStatus) $scope.LabTestStatus = 0;
            $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.LabTestStatus, 62);

        }
    });

    $scope.GetInvoicesByMedicalType = function (patientId, labStatus,medicalType) {
        LabTestService.GetInvoicesByMedicalType(patientId, labStatus, medicalType)
            .success(function (pt) {
                $scope.labTestItems = pt;
                //prepareInvoiceDataModel();
                console.log(pt);
            })
            .error(function (error) {
                $scope.status = 'Unable to load invoices data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.loadLabTest=function()
    {
        if ($scope.Patient) {
            if ($scope.Patient.Id != null) {
                if (!$scope.LabTestStatus) $scope.LabTestStatus = 0;

                if ($scope.patientSelection == 0) {
                    $scope.GetInvoicesByMedicalType(0, $scope.LabTestStatus, 62);

                } else {
                    $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.LabTestStatus, 62);

                }
            }
        }

        
    }

    $scope.reloadlabtest = function () {
       // if (!$scope.LabTestStatus) $scope.LabTestStatus = 0;
        if ($scope.Patient) {
            if ($scope.Patient.Id != null) {
                if ($scope.patientSelection == 0) {
                    $scope.GetInvoicesByMedicalType(0, $scope.LabTestStatus, 62);

                } else {
                    $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.LabTestStatus, 62);

                }
            }
        }


    }




    var tabClass = ".summary";
    if ($routeParams.tab != null) {
        tabClass = "." + $routeParams.tab;
    }
    $('.tabs li').removeClass('active');
    $(tabClass).addClass('active');
    $(tabClass).removeClass('hide');


});