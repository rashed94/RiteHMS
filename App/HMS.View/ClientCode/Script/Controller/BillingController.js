'use strict';

HmsApp.controller("BillingController", function ($scope, $routeParams, $window, $filter, $modal, BillingService) {

    $scope.TotalDiscount = 0;
    $scope.TotalAmount = 0;
    $scope.TotalAmountAfterDiscount = 0
    $scope.TotalReferralFee = 0;
    $scope.paymentType = false;//first payment
    $scope.invoiceStatus = 0;
    $scope.FullDiscount = false;
    $scope.discountStatus = "0";
    $scope.showDiscountAmount = false;
    $scope.totalDiscountAmount = {Amount:0};
    //var vm = this;
    //vm.totalDiscountAmount = "";
    $scope.perItemDiscount = 0;
    $scope.DiscountTypeTotal = "1";

    //$scope.regions = [
    //    {
    //        name: "By Percentage",
    //        code: "AL"},
    //{
    //    name: "By Amount",
    //    code: "AK"},
    //];

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

    $scope.itemWiseDiscount = function (Amount,cost)
    {
            $scope.perItemDiscount=(Amount * cost) / $scope.TotalAmount;

            return $scope.perItemDiscount;
    }

    $scope.findPercentageAmount = function (Amount, percentage) {
        $scope.totalDiscountByPercentage = (Amount * percentage) / 100;

        return $scope.totalDiscountByPercentage;
    }

    $scope.referralFullDiscount = function () {          

        $scope.disableAmount = false;
        if ($scope.FullDiscount) {
            angular.forEach($scope.BillingItem, function (billingitem) {
                if (billingitem.LabStatusId == 1) {
                    billingitem.Discount = billingitem.ReferralFee;
                    billingitem.ReferralAfterDiscount = 0;
                    billingitem.ServiceListPriceAfterDiscount = billingitem.ServiceListPrice - billingitem.Discount;
                    billingitem.referralfull = true;
                    $scope.disableAmount = true;
                }
            });
        }
        else {
            angular.forEach($scope.BillingItem, function (obj) {
                if (obj.LabStatusId == 1) {
                    obj.ServiceListPriceAfterDiscount = obj.ServiceListPrice;
                    obj.ReferralAfterDiscount = obj.ReferralFee;
                    obj.DisCountTypeID = '0';
                    obj.DiscountTypes = [
                    { id: '0', name: 'By Amount' },
                    { id: '1', name: 'By Percentage' },
                    ];
                    obj.OriginalAmountSingleQuantity = obj.ServiceListPrice / obj.ServiceQuantity;
                    obj.ServiceListPriceAfterDiscountSingleQuantity = obj.ServiceListPriceAfterDiscount / obj.ServiceQuantity;
                    obj.Discount = 0;
                    obj.referralfull = false;
                }
                else
                    obj.Discount = 0;
                $scope.totalDiscountAmount.Amount = 0;

            });

        }
        $scope.CalculateTotalDiscount();
    }

    $scope.calcDiscount=function()
    {
        $scope.TotalDiscount = 0;
        if ($scope.discountStatus == 1)
        {
            if ($scope.DiscountTypeTotal == 1) {
                $scope.showDiscountAmount = true;
                $scope.totalDiscountAmount.Amount = $scope.totalDiscountAmount.Amount;
                $scope.TotalAmountAfterDiscount = 0;

                angular.forEach($scope.BillingItem, function (billingitem) {
                    
                    billingitem.Discount = Math.ceil($scope.itemWiseDiscount($scope.totalDiscountAmount.Amount, billingitem.ServiceListPrice));
                    billingitem.ReferralAfterDiscount = 0;
                    billingitem.ServiceListPriceAfterDiscount = Math.ceil(billingitem.ServiceListPrice - billingitem.Discount);
                    billingitem.referralfull = true;
                    $scope.TotalDiscount = billingitem.Discount + $scope.TotalDiscount;
                    $scope.TotalAmountAfterDiscount = Math.ceil($scope.TotalAmount - $scope.totalDiscountAmount.Amount);
                    
                });
            }
            if ($scope.DiscountTypeTotal == 0) {
                if ($scope.totalDiscountAmount.Amount > 100) {
                    alert('Highest 100% is allowed');
                    $scope.totalDiscountAmount.Amount = 100;
                }
                else {
                    $scope.TotalDiscountByPercentage = $scope.findPercentageAmount($scope.TotalAmount, $scope.totalDiscountAmount.Amount);

                    $scope.showDiscountAmount = true;
                    $scope.totalDiscountAmount.Amount = $scope.totalDiscountAmount.Amount;
                    $scope.TotalAmountAfterDiscount = 0;

                    angular.forEach($scope.BillingItem, function (billingitem) {

                        billingitem.Discount = Math.ceil($scope.itemWiseDiscount($scope.TotalDiscountByPercentage, billingitem.ServiceListPrice));
                        billingitem.ReferralAfterDiscount = 0;
                        billingitem.ServiceListPriceAfterDiscount = Math.ceil(billingitem.ServiceListPrice - billingitem.Discount);
                        billingitem.referralfull = true;
                        $scope.TotalDiscount = billingitem.Discount + $scope.TotalDiscount;
                        $scope.TotalAmountAfterDiscount = Math.ceil($scope.TotalAmount - $scope.totalDiscountAmount.Amount);
                    });
                }
            }
        }
            else {
                $scope.showDiscountAmount = false;
                $scope.TotalAmountAfterDiscount = 0;
                $scope.TotalDiscount = 0;

                angular.forEach($scope.BillingItem, function (billingitem) {
                    billingitem.referralfull = false;
                    billingitem.Discount = 0;
                    billingitem.ServiceListPriceAfterDiscount = billingitem.ServiceListPrice;

                }
                    );
            }
        
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

    $scope.checkAmount=function(billingitem)
    {
        if(billingitem.DisCountTypeID == 1)
        {
            if( billingitem.Discount>100)
            {
                $window.alert("Discount should be equal or less then 100");
                billingitem.Discount = 100;

            }
        } else if (billingitem.DisCountTypeID==0)
        {
            if(billingitem.Discount>billingitem.ServiceListPrice)
            {
                $window.alert("Discount should be equal or less then Total price");
                billingitem.Discount = billingitem.ServiceListPrice;
            }
        }
    }
    $scope.adjustAfterDiscount = function (billingitem) {

        $scope.checkAmount(billingitem);
        if (billingitem.LabStatusId == 1) {

            if (billingitem.DisCountTypeID == 0) {
                if (billingitem.Discount != "") {
                    var discount = billingitem.Discount / 2;


                    billingitem.ReferralAfterDiscount = billingitem.ReferralFee - discount;


                    billingitem.ServiceListPriceAfterDiscount = Math.ceil(billingitem.ServiceListPrice - billingitem.Discount);



                }
                else {
                    billingitem.ServiceListPriceAfterDiscount = Math.ceil(billingitem.ServiceListPrice);
                    billingitem.ReferralAfterDiscount = billingitem.ReferralFee;
                }

            }
            else if (billingitem.DisCountTypeID == 1) {

                if (billingitem.Discount != "") {
                    var discount = billingitem.Discount / 2;
                    billingitem.ServiceListPriceAfterDiscount =Math.ceil( billingitem.ServiceListPrice - (billingitem.Discount * billingitem.ServiceListPrice) / 100);

                    billingitem.ReferralAfterDiscount = Math.ceil(billingitem.ReferralFee - (discount * billingitem.ServiceListPrice) / 100);
                }
                else {
                    billingitem.ServiceListPriceAfterDiscount = billingitem.ServiceListPrice;
                    billingitem.ReferralAfterDiscount = billingitem.ReferralFee;
                }


            }
        }
        else {
            if (billingitem.DisCountTypeID == 0) {

                billingitem.ServiceListPriceAfterDiscount = Math.ceil(billingitem.ServiceListPrice - billingitem.Discount);

            } else if (billingitem.DisCountTypeID == 1) {
                billingitem.ServiceListPriceAfterDiscount = Math.ceil(billingitem.ServiceListPrice - (billingitem.Discount * billingitem.ServiceListPrice) / 100);


            }

        }
        billingitem.ServiceListPriceAfterDiscountSingleQuantity = Math.ceil(billingitem.ServiceListPriceAfterDiscount / billingitem.ServiceQuantity);

        // billingitem.ServiceListPriceAfterDiscountWithQuantity = billingitem.ServiceListPriceAfterDiscount * billingitem.ServiceQuantity

        $scope.CalculateTotalDiscount();



    }

    $scope.adjustBillingData = function () {


        angular.forEach($scope.BillingItem, function (obj) {
            obj.ServiceListPriceAfterDiscount = obj.ServiceListPrice;
            obj.ReferralAfterDiscount = obj.ReferralFee;
            obj.DisCountTypeID = '0';
            obj.DiscountTypes = [
            { id: '0', name: 'By Amount' },
            { id: '1', name: 'By Percentage' },
            ];
            obj.OriginalAmountSingleQuantity = obj.ServiceListPrice / obj.ServiceQuantity;
            obj.ServiceListPriceAfterDiscountSingleQuantity = Math.ceil(obj.ServiceListPriceAfterDiscount / obj.ServiceQuantity);

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



    //*************************************************  moadl    ***************************************************


    $scope.InvoicePrintModal = function (size, isEdit, singleinvoice) {

        var modalInstance = $modal.open({
            templateUrl: '/ClientCode/Template/PrintInvoice.html',
            size: size,
            controller: 'PrintInvoiceModalController',
            scope: $scope,
            resolve: {
                // billingItems:billingItems
                singleInvoice: function () {
                    return singleinvoice;
                }


            }
        });

        modalInstance.result.then(function (result) {

        }, function () {


            console.log('Modal dismissed at: ' + new Date());

        });


    };

    $scope.InvoiceModal = function (size, isEdit, singleinvoice) {
        var billingItems = [];
        var singleInvoice = {};

        if (singleinvoice.Id == null) {
            angular.forEach($scope.BillingItem, function (item) {
                if (item.Selected) {
                    billingItems.push(item);
                }
            });
        } else {
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
            //  $scope.GetInvoices($scope.Patient.Id, $scope.invoiceStatus);
            // prepareInvoiceDataModel();
            if ($routeParams.tab != "invoices") {
                $window.location.href = '#/billing/invoices';
            } else {
                $scope.GetInvoices($scope.Patient.Id, $scope.invoiceStatus);
            }

            console.log('Modal dismissed at: ' + new Date());

        });
    };

    // *********************************************** modal end *****************************************************


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

    //$scope.GetBillingItemByPatientId($scope.Patiend.Id);
    var tabClass = ".summary";
    if ($routeParams.tab != null) {
        tabClass = "." + $routeParams.tab;
    }
    $scope.updateQuantityChange = function (item) {

        // item.ServiceListPriceAfterDiscount = Math.ceil(item.ServiceListPriceAfterDiscountSingleQuantity * item.ServiceQuantity);

       // item.ServiceListPriceAfterDiscount = Math.ceil(item.ServiceListPriceAfterDiscountSingleQuantity * item.ServiceQuantity);

        item.ServiceListPrice = Math.ceil(item.OriginalAmountSingleQuantity * item.ServiceQuantity);
        $scope.adjustAfterDiscount(item);

        $scope.CalculateTotalDiscount();
    }

    function prepareInvoiceDataModel() {
        angular.forEach($scope.invocieslist, function (item) {

            item.Paid = 0;
            item.TotalPrice = 0;

            item.InvoiceDate = ToJavaScriptDate(item.InvoiceDate);

            item.ServiceListPriceAfterDiscount = item.ServiceListPrice;

            angular.forEach(item.PatientServices, function (pservice) {

                item.TotalPrice = pservice.ServiceActualPrice * pservice.ServiceQuantity + item.TotalPrice;
            });


            if (item.InvoiceStatusId == 1) {
                item.Staus = "Open";
            } else if (item.InvoiceStatusId == 2) {
                item.Staus = "Closed";
            } else if (item.InvoiceStatusId == 3) {
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

    $scope.GetTotalDebitCredit = function () {

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

    $scope.reloadInvoice = function () {
        //console.log($scope.patientSelection);
        if ($scope.patientSelection == 0) {
            $scope.GetInvoices(0, $scope.invoiceStatus);
        } else {
            $scope.GetInvoices($scope.Patient.Id, $scope.invoiceStatus);
        }
    }
    $scope.GetInvoices = function (patientId, invoicestatus) {
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
        if ($scope.Patient) {
            if ($scope.Patient.Id != null) {
                $scope.GetInvoices($scope.Patient.Id, $scope.invoiceStatus);

            }
        }


    }

    if ($routeParams.tab == "summary") {

        $scope.GetBillingItemByPatientId($scope.Patient.Id);
        $scope.GetTotalDebitCredit();

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


        }

       if ($routeParams.tab == "summary") {

        $scope.GetBillingItemByPatientId($scope.Patient.Id);
        $scope.GetTotalDebitCredit();

       }
    });
    $scope.GetTotalDebitCredit();

    $('.tabs li').removeClass('active');
    $(tabClass).addClass('active');
    $(tabClass).removeClass('hide');

    // zaber
    $scope.deleteBillItem = function (itemId, index) {

        BillingService.deleteBillItem(itemId)
       .success(function (data) {

           $scope.GetBillingItemByPatientId($scope.Patient.Id);
           $scope.status = 'Delete Successful';
           //$window.alert("Delete Successful!");
           //return;

       })
       .error(function (error) {
           $scope.status = 'Unable to delete billing item : ' + error.message;
           console.log($scope.status);
       });

    }
    //zaber



    /*------------------- inline editing code begin -------------------*/

    $scope.selected={ };

    $scope.getTemplate = function (patientService) {
        if (patientService.Id === $scope.selected.Id) return 'edit';
        else return 'display';
    };

    $scope.editPatientService = function (singleinvoice,patientService) {
        $scope.selected = angular.copy(patientService);
        $scope.selectedSingleInvoice = angular.copy(singleinvoice);
    };

    $scope.savePatientServiceAndInvoice = function (singleinvoice, patientservice) {

        // $scope.reset(patientService);
        var totalPrice = 0;
        var totalDiscount = 0;
        angular.forEach(singleinvoice.PatientServices, function (obj) {

            totalPrice = obj.ServiceListPrice + totalPrice;
            totalDiscount = Math.ceil(obj.Discount) + totalDiscount;
           

        });

        if (totalPrice < singleinvoice.Paid) {
            $window.alert("Total amount shouldn't be smaller than the paid amount");
            $scope.reset(singleinvoice,patientservice);
        }else
        {
            singleinvoice.TotalAmount = totalPrice
            singleinvoice.TotalDiscount = totalDiscount;
            $scope.selected = {};
            $scope.selectedSingleInvoice = {};

        }

    };

    $scope.reset = function (singleinvoice,patientService) {
        
        patientService.ServiceListPrice = $scope.selected.ServiceListPrice;
        patientService.Discount = $scope.selected.Discount;

        singleinvoice = $scope.selectedSingleInvoice;

        $scope.selected = {};
        $scope.selectedSingleInvoice = {};
        $scope.savePatientServiceAndInvoice(singleinvoice, patientService);
    };


 
    $scope.UpdatePatientServiceDiscount = function (singleinvoice, patientService)
    {
        var actualprice = patientService.ServiceActualPrice * patientService.ServiceQuantity;
        if (patientService.Discount > actualprice)
        {
            patientService.Discount = actualprice;
        }
        patientService.ServiceListPrice = (patientService.ServiceActualPrice * patientService.ServiceQuantity) - patientService.Discount;

        



        //patientService.ServiceListPrice=patientService.ServiceActualPrice - patientService.Discount;
    }

    /*---------------------- inline editing code end --------------------*/

});
