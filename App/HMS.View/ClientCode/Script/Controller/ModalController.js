'use strict';

HmsApp.controller("ModalController", function ($scope, $modalInstance, patient, PatientService) {
    $scope.Patient = patient;
    $scope.ok = function (file) {
        $modalInstance.close({Patient: $scope.Patient, File: file});
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

HmsApp.controller("InvoiceModalController", function ($scope, $modalInstance, billingItems, BillingService) {
    $scope.Invoice = {
        Id: null,
        Date: new Date(),
        BillingItems: billingItems,
        TotalAmount: 0.0,
        PaidAmount: 0.0
    };

    angular.forEach($scope.Invoice.BillingItems, function (item, key) {
        $scope.Invoice.TotalAmount += item.Amount;
    });
    $scope.ok = function () {
        $modalInstance.close({ BillingItems: $scope.BillingItems });
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});