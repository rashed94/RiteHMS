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
        InvoiceDate: new Date(),
        DueDate: new Date(),
        PatientId: $scope.Patient.Id,
        TotalAmount: 0.0,
        //PaidAmount: 0.0,
        //PaymentAmount: 0.0,
        //PaymentMethod: 'Cash',
        //CoPayerAmount: 0.0,
        //ReconcileAmount: 0.0,
        TotalDiscount: 0.0
    };

    $scope.InvoicePayment = {
        Amount: 0.0,
        Payment: {
            Amount: 0.0,
            DeductionAmount: 0.0,
            PaymentTypeId: null,
            PatientID: null,
            UserId: null,
            Date: new Date()
        }
    };

    angular.forEach(billingItems, function (item, key) {
        $scope.Invoice.TotalAmount += item.ServiceListPriceAfterDiscount * item.ServiceQuantity;
        $scope.Invoice.TotalDiscount += item.Discount * item.ServiceQuantity;
    });

    $scope.ok = function () {
        $modalInstance.close({ Invoice: $scope.Invoice,  });
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});