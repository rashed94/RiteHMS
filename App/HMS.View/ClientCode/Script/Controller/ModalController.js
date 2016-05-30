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

HmsApp.controller("InvoiceModalController", function ($scope, $modalInstance,$filter, billingItems, BillingService) {

    $scope.PatientServiceItem = [];
    $scope.Invoice = {
        Id: null,
        InvoiceDate: $filter('date')(new Date(), 'MM/dd/yy'),
        DueDate: $filter('date')(new Date(), 'MM/dd/yy'),
        PatientId: $scope.Patient.Id,
        TotalAmount: 0.0,
        //PaidAmount: 0.0,
        //PaymentAmount: 0.0,
        //PaymentMethod: 'Cash',
        //CoPayerAmount: 0.0,
        //ReconcileAmount: 0.0,
        TotalDiscount: 0.0,
        InvoiceStatusId: 1,
        ItemDiscount: "",
        UserId:null
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

    function parseJsonDate(jsonDateString) {
        return new Date(parseInt(jsonDateString.replace('/Date(', '')));
    }

    $scope.GenerateServiceItem = function (item) {
        $scope.serviceItem = {};

        /*   var serviceItem = {
                PatientID: $scope.Patient.Id,
                ItemID: obj.Id,
                InvoiceID: '',
                ServiceListPrice: obj.Amount,
                ServiceActualPrice: obj.SalePrice,
                ServiceQuantity: obj.Quantity,
                ServiceDate: Date.now(),
                UserId: '',
                Discount: '',
                Refund: '',
                Billed: '',
                ReferralFee: obj.ReferralFee,
                DeliveryDate: obj.Date,
                DeliverTime:obj.ReportDeliveryTime
            };*/
        $scope.serviceItem.Id = item.Id;
        $scope.serviceItem.PatientId = item.PatientID;
        $scope.serviceItem.ItemID = item.ItemID;
        $scope.serviceItem.InvoiceID = '';
        $scope.serviceItem.ServiceListPrice = item.ServiceListPriceAfterDiscount;
        $scope.serviceItem.ServiceActualPrice = item.ServiceActualPrice;
        $scope.serviceItem.ServiceQuantity = item.ServiceQuantity;
        $scope.serviceItem.ServiceDate = parseJsonDate(item.ServiceDate);
        $scope.serviceItem.UserId = '';
        $scope.serviceItem.Discount = item.Discount;
        $scope.serviceItem.Refund = '';
        $scope.serviceItem.Billed = '';
        $scope.serviceItem.ReferralFee = item.ReferralAfterDiscount;
        $scope.serviceItem.DeliveryDate = parseJsonDate(item.DeliveryDate);
        $scope.serviceItem.DeliveryTime = item.DeliveryTime;

        $scope.PatientServiceItem.push($scope.serviceItem);
    }


    angular.forEach(billingItems, function (item, key) {
        $scope.Invoice.TotalAmount += item.ServiceListPriceAfterDiscount * item.ServiceQuantity;
        $scope.Invoice.TotalDiscount += item.Discount * item.ServiceQuantity;
        $scope.GenerateServiceItem(item);

    });

  

    BillingService.SaveInvoice($scope.Invoice, $scope.PatientServiceItem)
     .success(function (data) {

                console.log(data);
                $scope.Invoice.push(data);

            })
        .error(function (error) {
            $scope.status = 'Unable to save PatientServiceItem data: ' + error.message;
            console.log($scope.status);
        });



    $scope.ok = function () {
        $modalInstance.close({ Invoice: $scope.Invoice,  });
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});