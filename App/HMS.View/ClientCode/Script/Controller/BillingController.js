'use strict';

HmsApp.controller("BillingController", function ($scope, $routeParams, $modal, BillingService) {
    $scope.GetBillingItemByPatientId = function (patientId) {
        BillingService.GetBillingItemByPatientId(patientId)
            .success(function (pt) {
                $scope.BillingItem = pt;
                console.log($scope.BillingItem);
            })
            .error(function (error) {
                $scope.status = 'Unable to load Billing data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.InvoiceModal = function (size, isEdit) {
        var billingItems = [
            {
                ItemId: 112,
                Amount: 400
            },
            {
                ItemId: 114,
                Amount: 120
            }
        ];
        var modalInstance = $modal.open({
            templateUrl: '/ClientCode/Template/Invoice.html',
            size: size,
            controller: 'InvoiceModalController',
            scope: $scope,
            resolve: {
                billingItems: function () {
                    return isEdit ? $scope.BillingItems : billingItems;
                }
            }
        });
        modalInstance.result.then(function (result) {
            $scope.BillingItem = result.BillingItem;
            $scope.SaveInvoice();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };


    //$scope.GetBillingItemByPatientId($scope.Patiend.Id);
    var tabClass = ".summary";
    if ($routeParams.tab != null) {
        tabClass = "." + $routeParams.tab;
    }
    $('.tabs li').removeClass('active');
    $(tabClass).addClass('active');
    $(tabClass).removeClass('hide');
});
