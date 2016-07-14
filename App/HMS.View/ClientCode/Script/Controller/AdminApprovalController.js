'use strict';


HmsApp.controller("AdminApprovalController", function ($scope, $routeParams, $window, $filter, $modal, AdminApprovalService, ItemService) {


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



    if ($routeParams.tab == "refund") {

        $scope.GetRefundedItem();
    }

    var tabClass = ".refund";
    if ($routeParams.tab != null) {
        tabClass = "." + $routeParams.tab;
    }
    $('.tabs li').removeClass('active');
    $(tabClass).addClass('active');
    $(tabClass).removeClass('hide');
});