'use strict';

HmsApp.controller("BillingController", function ($scope, $routeParams, $window, $filter, $modal, BillingService) {

    $scope.TotalDiscount = 0;
    $scope.TotalAmount = 0;
    $scope.TotalAmountAfterDiscount = 0
    $scope.TotalReferralFee = 0;
    $scope.paymentType = false;//first payment
    $scope.invoiceStatus = 0;

    $scope.Invoice = {
        Id: null,
        InvoiceDate: "",
        DueDate: "",
        PatientID: null,
        TotalAmount: 0.0,
        //PaidAmount: 0.0,
        //PaymentAmount: 0.0,
        //PaymentMethod: 'Cash',
        //CoPayerAmount: 0.0,
        //ReconcileAmount: 0.0,
        TotalDiscount: 0.0,
        InvoiceStatusId: 1,
        ItemDiscount: "",
        UserId: null
    };

    $scope.CalculateTotalDiscount = function () {
        $scope.TotalAmount = 0;
        $scope.TotalDiscount = 0;
        $scope.TotalAmountAfterDiscount = 0;
        $scope.TotalReferralFee = 0;

        angular.forEach($scope.BillingItem, function (obj) {

            $scope.TotalAmount = $scope.TotalAmount + obj.ServiceListPrice;
            $scope.TotalAmountAfterDiscount = $scope.TotalAmountAfterDiscount + obj.ServiceListPriceAfterDiscount;
            $scope.TotalDiscount = $scope.TotalDiscount + (obj.ServiceListPrice - obj.ServiceListPriceAfterDiscount);
            $scope.TotalReferralFee = $scope.TotalReferralFee + obj.ReferralAfterDiscount;
        });

    }


    $scope.GetBillingItemByPatientId = function (patientId) {
        if ($scope.Patient) {
            if ($scope.Patient.Id != null) {
                BillingService.GetBillingItemByPatientId(patientId)
                    .success(function (pt) {
                        $scope.BillingItem = pt;

                        $scope.adjustBillingData();
                        $scope.CalculateTotalDiscount();

                        console.log($scope.BillingItem);
                    })
                    .error(function (error) {
                        $scope.status = 'Unable to load Billing data: ' + error.message;
                        console.log($scope.status);
                    });
            }
        }
    }

    $scope.adjustAfterDiscount = function (billingitem) {

        // if amount is selected
        if (billingitem.LabStatusId == 1) {

            if (billingitem.DisCountTypeID == 0) {
                if (billingitem.Discount != "") {
                    var discount = billingitem.Discount / 2;


                    billingitem.ReferralAfterDiscount = billingitem.ReferralFee - discount;


                    billingitem.ServiceListPriceAfterDiscount = billingitem.ServiceListPrice - billingitem.Discount;


                }
                else {
                    billingitem.ServiceListPriceAfterDiscount = billingitem.ServiceListPrice;
                    billingitem.ReferralAfterDiscount = billingitem.ReferralFee;
                }

            }
            else if (billingitem.DisCountTypeID == 1) {

                if (billingitem.Discount != "") {
                    var discount = billingitem.Discount / 2;
                    billingitem.ServiceListPriceAfterDiscount = billingitem.ServiceListPrice - (billingitem.Discount * billingitem.ServiceListPrice) / 100;
                    billingitem.ReferralAfterDiscount = billingitem.ReferralFee - (discount * billingitem.ServiceListPrice) / 100;
                }
                else {
                    billingitem.ServiceListPriceAfterDiscount = billingitem.ServiceListPrice;
                    billingitem.ReferralAfterDiscount = billingitem.ReferralFee;
                }


            }
        }
        else
        {
            billingitem.ServiceListPriceAfterDiscount = billingitem.ServiceListPrice - billingitem.Discount;

        }
        billingitem.ServiceListPriceAfterDiscountSingleQuantity = billingitem.ServiceListPriceAfterDiscount / billingitem.ServiceQuantity;

       // billingitem.ServiceListPriceAfterDiscountWithQuantity = billingitem.ServiceListPriceAfterDiscount * billingitem.ServiceQuantity

        $scope.CalculateTotalDiscount();



    }

    $scope.adjustBillingData=function ()
    {


        angular.forEach($scope.BillingItem, function (obj) {
            obj.ServiceListPriceAfterDiscount = obj.ServiceListPrice;
            obj.ReferralAfterDiscount = obj.ReferralFee;
            obj.DisCountTypeID = '0';
            obj.DiscountTypes = [
            { id: '0', name: 'By Amount' },
            { id: '1', name: 'By Percentage' },
            ];
            obj.OriginalAmountSingleQuantity = obj.ServiceListPrice / obj.ServiceQuantity;
            obj.ServiceListPriceAfterDiscountSingleQuantity = obj.ServiceListPriceAfterDiscount / obj.ServiceQuantity;

        });
    }
    //$scope.discuntCondition = {
    //DisCountType: '0'
    //}


    $scope.checkAll = function () {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.BillingItem, function (item) {
            item.Selected = $scope.selectedAll;
        });

    };

    //$scope.SaveInvoice = function () {
    //    BillingService.SaveInvoice($scope.Invoice);
    //};

    $scope.InvoiceModal = function (size,isEdit, singleinvoice) {
        var billingItems = [];
        var singleInvoice = {};

        if (singleinvoice.Id == null) {
            angular.forEach($scope.BillingItem, function (item) {
                if (item.Selected) {
                    billingItems.push(item);
                }
            });
        } else
        {
            singleInvoice = singleinvoice;
        }
        //var billingItems = [
        //    {
        //        ItemId: 112,
        //        Amount: 400
        //    },
        //    {
        //        ItemId: 114,
        //        Amount: 120
        //    }
        //];
        var modalInstance = $modal.open({
            templateUrl: '/ClientCode/Template/Invoice.html',
            size: size,
            controller: 'InvoiceModalController',
            scope: $scope,
            resolve: {
                billingItems: function () {
                    return billingItems;
                },
                // billingItems:billingItems
                singleInvoice: function () {
                    return singleInvoice;
                }
                
          
            }
        });
        modalInstance.result.then(function (result) {
           // $scope.Invoice = result.Invoice;
           // $scope.SaveInvoice();
        }, function () {
            $scope.GetInvoices($scope.Patient.Id, $scope.invoiceStatus);
            console.log('Modal dismissed at: ' + new Date());
            
        });
    };



    $scope.toggleDetail = function (item) {
        //$scope.isVisible = $scope.isVisible == 0 ? true : false;
        var postion= !item.activePosition ;
        if (postion)
        {
           // $(event.target).addClass('fa fa-arrow-down fa-2x');
            item.selectedIcon = false;
            item.activePosition = true;
        } else {

            // $(event.target).addClass('fa fa-arrow-circle-right fa-2x');
            item.selectedIcon = true;
            item.activePosition = false;

        }
    };

    //$scope.GetBillingItemByPatientId($scope.Patiend.Id);
    var tabClass = ".summary";
    if ($routeParams.tab != null) {
        tabClass = "." + $routeParams.tab;
    }
    $scope.updateQuantityChange=function(item)
    {
        item.ServiceListPriceAfterDiscount = item.ServiceListPriceAfterDiscountSingleQuantity * item.ServiceQuantity;
        item.ServiceListPrice = item.OriginalAmountSingleQuantity * item.ServiceQuantity;
    }

    function prepareInvoiceDataModel()
    {
        angular.forEach($scope.invocieslist, function (item) {

            item.Paid = 0;
            item.InvoiceDate = ToJavaScriptDate(item.InvoiceDate);

            item.ServiceListPriceAfterDiscount = item.ServiceListPrice;



            if (item.InvoiceStatusId == 1)
            {
                item.Staus = "Open";
            } else if (item.InvoiceStatusId == 2)
            {
                item.Staus = "Closed";
            } else if (item.InvoiceStatusId == 3)
            {
                item.Staus = "Refunded";
            }
           
            angular.forEach(item.InvoicePayments, function (paymentitem) {

                item.Paid = paymentitem.Amount + item.Paid;
                item.selectedIcon = true;
                item.activePosition = false;

            });
        });
        console.log($scope.invocieslist);
    }

    $scope.GetTotalDebitCredit=function()

    {

        if ($scope.Patient) {
            if ($scope.Patient.Id != null) {
                BillingService.GetTotalDebit($scope.Patient.Id)
                    .success(function (pt) {

                        $scope.debitcredit = pt;
                        $scope.Debit = $scope.debitcredit[0];
                        $scope.Credit = $scope.debitcredit[1];
                        $scope.Balance = $scope.Debit - $scope.Credit;

                    })
                    .error(function (error) {
                        $scope.status = 'Unable to load invoices data: ' + error.message;
                        console.log($scope.status);
                    });
            }
        }
    }

    $scope.reloadInvoice=function()
    {
        //console.log($scope.patientSelection);
        if($scope.patientSelection==0)
        {
            $scope.GetInvoices(0, $scope.invoiceStatus);
        }else
        {
            $scope.GetInvoices($scope.Patient.Id, $scope.invoiceStatus);
        }
    }
    $scope.GetInvoices = function (patientId,invoicestatus) {
        BillingService.GetInvoicesByPatientId(patientId, invoicestatus)
            .success(function (pt) {
                $scope.invocieslist = pt;
                prepareInvoiceDataModel();
                console.log(pt);
            })
            .error(function (error) {
                $scope.status = 'Unable to load invoices data: ' + error.message;
                console.log($scope.status);
            });
    }

    if ($routeParams.tab == "invoices") {

        if ($scope.Patient.Id != null) {
            $scope.GetInvoices($scope.Patient.Id, $scope.invoiceStatus);
        }

       
    }


    //$scope.$watch($scope.Patient, function () {

    //    if ($routeParams.tab == "invoices") {

    //        $scope.GetInvoices($scope.Patient.Id);


    //    }
        
    //});
    $scope.$on('patientchange', function (event, args) {
        // console.log("patient changes");
            if ($routeParams.tab == "invoices") {

                $scope.GetInvoices($scope.Patient.Id, $scope.invoiceStatus);
                $scope.patientSelection = 1;

            }

            //if ($routeParams.tab == "summary") {

            $scope.GetBillingItemByPatientId($scope.Patient.Id);
            $scope.GetTotalDebitCredit();

            //}
    });
    $scope.GetTotalDebitCredit();
    if ($routeParams.tab == "invoices") {

        $scope.GetInvoices($scope.Patient.Id, $scope.invoiceStatus);
        $scope.patientSelection = 1;

    }

    $('.tabs li').removeClass('active');
    $(tabClass).addClass('active');
    $(tabClass).removeClass('hide');
});
