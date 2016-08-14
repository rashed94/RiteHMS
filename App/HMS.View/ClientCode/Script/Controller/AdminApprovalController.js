'use strict';


HmsApp.controller("AdminApprovalController", function ($scope, $routeParams, $window, $filter, $modal, AdminApprovalService,PatientService, ItemService) {


    $scope.PatientServices = {};

    $scope.GetRefundedItem = function () {
       
        ItemService.GetRefundedItem()
                    .success(function (pt) {
                        $scope.PatientServices = pt;

                        
                        // $scope.CalculateTotalDiscount();

                        console.log($scope.PatientServices);
                    })
                    .error(function (error) {
                        $scope.status = 'Unable to load refunded item data: ' + error.message;
                        console.log($scope.status);
                    });

    }
    $scope.cancelRefund = function (patientservice) {

        patientservice.DeliveryDate = ToJavaScriptDate(patientservice.DeliveryDate);
        patientservice.ServiceDate = ToJavaScriptDate(patientservice.ServiceDate);
        patientservice.RefundNote = null;



        ItemService.cancelRefund(patientservice)

                    .success(function (pt) {

                        $scope.GetRefundedItem();


                        // $scope.CalculateTotalDiscount();

                        console.log("refund canel successful");
                    })
                    .error(function (error) {
                        $window.alert("Something is wrong ..Refund cancel not working..Please try again");
                        $scope.status = 'Unable to cancel refund: ' + error.message;
                        console.log($scope.status);
                    });

    }

    $scope.approveRefund = function (patientservice)
    {

        patientservice.DeliveryDate = ToJavaScriptDate(patientservice.DeliveryDate);
        patientservice.ServiceDate = ToJavaScriptDate(patientservice.ServiceDate);
        patientservice.Refund = 1;


        ItemService.approveRefund(patientservice)

                    .success(function (pt) {

                        $scope.GetRefundedItem();


                        // $scope.CalculateTotalDiscount();

                        console.log("Approved successful");
                    })
                    .error(function (error) {
                        $window.alert("Something is wrong ..Refund Not Approved..Please try again");
                        $scope.status = 'Unable to Approved: ' + error.message;
                        console.log($scope.status);
                    });
    }

    $scope.GetPatientAdmissionForApproval=function()
    {
        PatientService.GetPatientAdmissionForApproval()
                .success(function (data) {

                    $scope.AllPatientAdmission = data;
                    console.log("Get Admission Data successfully");

                })
                .error(function (error) {

                    $scope.status = 'Unable to get Admission data: ' + error.message;
                    console.log($scope.status);

                });
    }


    $scope.approveDischarge = function (patientAdmission) {
      
     
        patientAdmission.AdmissionDate = ToJavaScriptDate(patientAdmission.AdmissionDate);
        patientAdmission.DischargeApprovalStatusId = 102;
        PatientService.DischagePatient(patientAdmission,true)
                .success(function (data) {

                    console.log("approveDischarge successful");
                    $scope.GetPatientAdmissionForApproval();

                })
                .error(function (error) {

                    $scope.status = 'Unable to approveDischarge Admission: ' + error.message;
                    console.log($scope.status);

                });


    }


    $scope.cancelDischarge = function (patientAdmission) {


        patientAdmission.AdmissionDate = ToJavaScriptDate(patientAdmission.AdmissionDate);
        patientAdmission.DischargeApprovalStatusId = null;
        patientAdmission.DischargeNote = "Discharge without payement Request Cancel by Admin";
        PatientService.DischagePatient(patientAdmission,true)
                .success(function (data) {

                    console.log("cancelDischarge successful");

                    $scope.GetPatientAdmissionForApproval();

                    

                })
                .error(function (error) {

                    $scope.status = 'Unable to cancelDischarge Admission: ' + error.message;
                    console.log($scope.status);

                });


    }


    if ($routeParams.tab == "refund") {

        $scope.GetRefundedItem();
    }

    if ($routeParams.tab == "discharge") {

        $scope.GetPatientAdmissionForApproval();
    }

    var tabClass = ".refund";
    if ($routeParams.tab != null) {
        tabClass = "." + $routeParams.tab;
    }
    $('.tabs li').removeClass('active');
    $(tabClass).addClass('active');
    $(tabClass).removeClass('hide');
});