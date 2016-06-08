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

HmsApp.controller("ServiceProviderModalController", function ($scope, $modalInstance, serviceProvider, ConfigurationService) {
    $scope.ServiceProvider = serviceProvider;
    $scope.ok = function (file) {
        $modalInstance.close({ ServiceProvider: $scope.ServiceProvider, File: file });
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});


HmsApp.controller("InvoiceModalController", function ($scope, $modalInstance, $filter, $window, billingItems, singleInvoice, BillingService) {

    $scope.PatientServiceItem = [];
    $scope.InvoicePayments = [];
    $scope.TotalPaid = 0.00;
    $scope.isLabItem = false;

    $scope.Invoice = {
        Id: null,
        InvoiceDate: $filter('date')(new Date(), 'MM/dd/yy'),
        DueDate: $filter('date')(new Date(), 'MM/dd/yy'),
        PatientID: $scope.Patient.Id,
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
        InvoiceId:0,
        Amount: 0.0,
        PaymentID: null,
        UserId:null


    };
    $scope.Payment = {

        Amount:0.0, 
        DeductionAmount:0.0,
        PaymentTypeId :101,
        PatientID:$scope.Patient.Id, 
        UserId:null,
        Date : $filter('date')(new Date(), 'MM/dd/yy hh:mm:ss')
       

    };

    function ConvertJsonDateString(jsonDate) {  
        var shortDate = null;    
        if (jsonDate) {  
            var regex = /-?\d+/;  
            var matches = regex.exec(jsonDate);  
            var dt = new Date(parseInt(matches[0]));  
            var month = dt.getMonth() + 1;  
            var monthString = month > 9 ? month : '0' + month;  
            var day = dt.getDate();  
            var dayString = day > 9 ? day : '0' + day;  
            var year = dt.getFullYear();  
            shortDate = monthString + '/' + dayString + '/' + year;  
        }  
        return shortDate;  
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
        $scope.serviceItem.InvoiceID = 0;
        $scope.serviceItem.ServiceListPrice = item.ServiceListPriceAfterDiscount;
        $scope.serviceItem.ServiceActualPrice = item.ServiceActualPrice;
        $scope.serviceItem.ServiceQuantity = item.ServiceQuantity;
        $scope.serviceItem.ServiceDate = ToJavaScriptDate(item.ServiceDate);
        $scope.serviceItem.UserId = '';
        $scope.serviceItem.Discount = item.Discount;
        $scope.serviceItem.Refund = '';
        $scope.serviceItem.Billed = '';
        $scope.serviceItem.ReferralFee = item.ReferralAfterDiscount;
        $scope.serviceItem.DeliveryDate = ToJavaScriptDate(item.DeliveryDate);
        $scope.serviceItem.DeliveryTime = item.DeliveryTime;
        $scope.serviceItem.ReferralFeePaid = item.ReferralFeePaid;
        $scope.serviceItem.ServiceProviderId = item.ServiceProviderId;
        $scope.serviceItem.LabStatusId = item.LabStatusId;
        if (item.LabStatusId == 1)
        {
            $scope.isLabItem = true;
        }

        $scope.PatientServiceItem.push($scope.serviceItem);
    }

    $scope.saveInvoice = function () {
        BillingService.SaveInvoice($scope.Invoice, $scope.PatientServiceItem)
         .success(function (data) {

             console.log(data);
             $scope.Invoice = data;
             $scope.Invoice.InvoiceDate = ToJavaScriptDate($scope.Invoice.InvoiceDate);
             

         })
            .error(function (error) {
                $scope.status = 'Unable to save PatientServiceItem data: ' + error.message;
                console.log($scope.status);
            });
    }

    // first payment while invoice is not there
    if (singleInvoice.Id == null && billingItems.length>0) {
        angular.forEach(billingItems, function (item, key) {
            $scope.Invoice.TotalAmount += item.ServiceListPriceAfterDiscount * item.ServiceQuantity;
            $scope.Invoice.TotalDiscount += item.Discount * item.ServiceQuantity;
            $scope.GenerateServiceItem(item);

        });

        if ($scope.isLabItem) {
            $scope.Invoice.LabStatusId = 1;
        }
        else {
            $scope.Invoice.LabStatusId = null;
        }

        $scope.saveInvoice();



    } else // second payment while invoice is there
    {
        // console.log("need to load invoice");
        $scope.Invoice = singleInvoice;
        angular.forEach($scope.Invoice.InvoicePayments, function (item) {
            
            $scope.TotalPaid = $scope.TotalPaid + item.Amount;
            $scope.Invoice.PaymentAmount = parseFloat($scope.Invoice.TotalAmount) - parseFloat($scope.TotalPaid);
            
        });

    }



    $scope.ok = function () {



        if ($scope.Invoice.Id != null) {

            var paymentamount =0;
            var total = parseFloat($scope.TotalPaid);
            var recenpayment=parseFloat( $scope.Invoice.PaymentAmount);


            paymentamount = (total + recenpayment);

            if (paymentamount == $scope.Invoice.TotalAmount)
            {
                $scope.Invoice.InvoiceStatusId = "2";

            } else if (paymentamount > $scope.Invoice.TotalAmount)
            {
                $scope.Invoice.PaymentAmount = parseFloat($scope.Invoice.TotalAmount) - total;
                $scope.Invoice.InvoiceStatusId = "2";
            }



            $scope.Payment.Amount = $scope.Invoice.PaymentAmount;

            $scope.InvoicePayment.PatientInvoiceId = $scope.Invoice.Id;
            $scope.InvoicePayment.Amount = $scope.Invoice.PaymentAmount;
            $scope.InvoicePayments.push($scope.InvoicePayment);
            $scope.Payment.InvoicePayments = $scope.InvoicePayments;

            BillingService.SavePayment($scope.Payment)
            .success(function (data) {

                console.log(data);
                // $scope.Invoice.Id = data;
                // $modalInstance.close({ Invoice: $scope.Invoice, });

                $scope.Invoice.DueDate = ToJavaScriptDate($scope.Invoice.DueDate);
                $scope.Invoice.InvoiceDate = ToJavaScriptDate($scope.Invoice.InvoiceDate);

                $scope.saveInvoice();
                $modalInstance.dismiss('cancel');
                $window.location.href = '#/billing/invoices';

            })
            .error(function (error) {
                $scope.status = 'Unable to save Payment data: ' + error.message;
                console.log($scope.status);
            });
        }




       
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});