'use strict';

HmsApp.controller("LabTestController", function ($scope, $routeParams, $window, $filter, $modal, LabTestService) {

    $scope.$on('patientchange', function (event, args) {
        // console.log("patient changes");
        if ($routeParams.tab == "addlabtest") {

        }

        if ($routeParams.tab == "listlabtest") {

            $scope.GetLabItems(62);
        }


        if ($routeParams.tab == "summary") {

            if (!$scope.LabTestStatus) $scope.LabTestStatus = 0;
            $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.LabTestStatus, 62);

        }
    });


    function preparelabtestDataModel() {
        angular.forEach($scope.labTestItems, function (item) {

            item.Paid = 0;
            item.InvoiceDate = ToJavaScriptDate(item.InvoiceDate);

            //item.ServiceListPriceAfterDiscount = item.ServiceListPrice;





            angular.forEach(item.InvoicePayments, function (paymentitem) {

                item.Paid = paymentitem.Amount + item.Paid;
                item.selectedIcon = true;
                item.activePosition = false;

            });


            angular.forEach(item.PatientServices, function (PatientService) {

                if (PatientService.LabStatusId == 1) {
                    PatientService.Staus = "Pending";
                } else if (PatientService.LabStatusId == 2) {
                    PatientService.Staus = "Completed";
                } else if (PatientService.LabStatusId == 3) {
                    PatientService.Staus = "Refunded";
                }

            });



            if (item.LabStatusId == 1) {
                item.Staus = "Pending";
            } else if (item.LabStatusId == 2) {
                item.Staus = "Completed";
            } else if (item.LabStatusId == 3) {
                item.Staus = "Refunded";
            }

            if (item.TotalAmount != item.Paid) {
                item.Staus = item.Staus+("(Due)");
            }

        });
        console.log($scope.invocieslist);
    }

    $scope.toggleDetail = function (item) {
        //$scope.isVisible = $scope.isVisible == 0 ? true : false;
        var postion = !item.activePosition;
        if (postion) {
            // $(event.target).addClass('fa fa-arrow-down fa-2x');
            item.selectedIcon = false;
            item.activePosition = true;
        } else {

            // $(event.target).addClass('fa fa-arrow-circle-right fa-2x');
            item.selectedIcon = true;
            item.activePosition = false;

        }
    };

    $scope.GetInvoicesByMedicalType = function (patientId, labStatus,medicalType) {
        LabTestService.GetInvoicesByMedicalType(patientId, labStatus, medicalType)
            .success(function (pt) {
                $scope.labTestItems = pt;
                preparelabtestDataModel();
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