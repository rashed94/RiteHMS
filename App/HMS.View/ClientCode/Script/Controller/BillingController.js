'use strict';

HmsApp.controller("BillingController", function ($scope, $routeParams, $window, $filter, $modal, $localStorage, BillingService, IniService) {

    $scope.TotalDiscount = 0;
    $scope.TotalAmount = 0;
    $scope.TotalAmountAfterDiscount = 0
    $scope.TotalReferralFee = 0;
    $scope.paymentType = false;//first payment
    $scope.invoiceStatus = 0;
    $scope.FullDiscount = false;
    $scope.discountStatus = "0";
    $scope.showDiscountAmount = false;
    $scope.totalDiscountAmount = { Amount: 0 };
    $scope.refundedInvoice = {};
    $scope.refundedServices = {};
    $scope.invoiceId = null;
    $scope.NonRegisterPatientId;
    $scope.ReceiptMedicalTypeId;
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
        PaymentId:null,
        ReceiptDate: "",
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

    $scope.Receipt = {
        Id: null,
        ReceiptDate: "",
        PatientID: null,
        PaymentId:null,
        TotalAmount: 0.0,
        //PaidAmount: 0.0,
        //PaymentAmount: 0.0,
        //PaymentMethod: 'Cash',
        //CoPayerAmount: 0.0,
        //ReconcileAmount: 0.0,
        TotalDiscount: 0.0,
        IsRefunded:0,
        UserId: null
    };






    function init() {

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

        $scope.itemWiseDiscount = function (Amount, cost) {
            $scope.perItemDiscount = Math.ceil((Amount * cost) / $scope.TotalAmount);
            if (isNaN($scope.perItemDiscount)) {
                $scope.perItemDiscount = 0;
            }
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
                    else {
                        billingitem.Discount = 0;
                        billingitem.ServiceListPriceAfterDiscount = billingitem.ServiceListPrice - billingitem.Discount;
                        billingitem.referralfull = true;
                        $scope.totalDiscountAmount.Amount = 0;
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
                        $scope.TotalDiscount = 0;
                    }
                    else
                        obj.Discount = 0;
                    $scope.totalDiscountAmount.Amount = 0;
                    $scope.TotalDiscount = 0;
                    obj.referralfull = false;

                });

            }
            $scope.CalculateTotalDiscount();
        }
        function updateDiscountTypeDropDown() {
            angular.forEach($scope.BillingItem, function (obj) {

                obj.DisCountTypeID = "0";
            });
        }

        $scope.calcDiscount = function () {
            $scope.TotalDiscount = 0;

            updateDiscountTypeDropDown();

            if ($scope.discountStatus == 1) {
                if ($scope.DiscountTypeTotal == 1) {
                    if ($scope.FullDiscount) {
                        $scope.referralFullDiscount();
                        $scope.showDiscountAmount = true;
                    }
                    else {
                        $scope.showDiscountAmount = true;
                        $scope.totalDiscountAmount.Amount = $scope.totalDiscountAmount.Amount;
                        $scope.TotalAmountAfterDiscount = 0;

                        angular.forEach($scope.BillingItem, function (billingitem) {

                            billingitem.Discount = Math.ceil($scope.itemWiseDiscount($scope.totalDiscountAmount.Amount, billingitem.ServiceListPrice));
                            // billingitem.ReferralAfterDiscount = 0;
                            //    billingitem.ServiceListPriceAfterDiscount = Math.ceil(billingitem.ServiceListPrice - billingitem.Discount);
                            //  billingitem.referralfull = true;
                            // $scope.TotalDiscount = billingitem.Discount + $scope.TotalDiscount;
                            // $scope.TotalAmountAfterDiscount = Math.ceil($scope.TotalAmount - $scope.totalDiscountAmount.Amount);
                            // billingitem.Discount = 0;
                            $scope.adjustAfterDiscount(billingitem);

                        });
                    }

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
                        //  $scope.TotalAmountAfterDiscount = 0;

                        angular.forEach($scope.BillingItem, function (billingitem) {

                            billingitem.Discount = Math.ceil($scope.itemWiseDiscount($scope.TotalDiscountByPercentage, billingitem.ServiceListPrice));
                            // billingitem.ReferralAfterDiscount = 0;
                            // billingitem.ServiceListPriceAfterDiscount = Math.ceil(billingitem.ServiceListPrice - billingitem.Discount);
                            // billingitem.referralfull = true;
                            // $scope.TotalDiscount = billingitem.Discount + $scope.TotalDiscount;
                            // $scope.TotalAmountAfterDiscount = Math.ceil($scope.TotalAmount - $scope.totalDiscountAmount.Amount);
                            $scope.adjustAfterDiscount(billingitem);
                        });
                    }
                }
            }
            else {

                if (!$scope.FullDiscount) {
                    $scope.showDiscountAmount = false;
                    // $scope.TotalAmountAfterDiscount = 0;
                    $scope.TotalDiscount = 0;

                    angular.forEach($scope.BillingItem, function (billingitem) {
                        //billingitem.referralfull = false;
                        //billingitem.Discount = 0;
                        //billingitem.ServiceListPriceAfterDiscount = billingitem.ServiceListPrice;
                        //billingitem.ReferralAfterDiscount = billingitem.ReferralFee;
                        $scope.adjustAfterDiscount(billingitem);

                    });
                } else {
                    $scope.referralFullDiscount();
                }

            }

        }


        $scope.GetBillingItemByPatientId = function (patientId) {
            if ($scope.Patient) {
                if ($scope.Patient.Id != null) {

                    if ($scope.NonRegisterPatientId == $scope.Patient.Id) {

                        $scope.BillingItem = $localStorage.BillingItem;
                        $scope.adjustBillingData();

                    } else {

                        BillingService.GetBillingItemByPatientId(patientId)
                            .success(function (pt) {


                                $scope.BillingItem = pt;

                                $scope.adjustBillingData();
                                // $scope.CalculateTotalDiscount();

                                console.log($scope.BillingItem);
                            })
                            .error(function (error) {
                                $scope.status = 'Unable to load Billing data: ' + error.message;
                                console.log($scope.status);
                            });
                    }
                }
            }
        }

        $scope.checkAmount = function (billingitem) {
            if (billingitem.DisCountTypeID == 1) {
                if (billingitem.Discount > 100) {
                    // $window.alert("Discount should be equal or less then 100");
                    billingitem.Discount = 100;

                }
            } else if (billingitem.DisCountTypeID == 0) {
                if (billingitem.Discount > billingitem.ServiceListPrice) {
                    // $window.alert("Discount should be equal or less then Total price");
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


                        billingitem.ReferralAfterDiscount = Math.ceil(billingitem.ReferralFee - discount);

                        if (billingitem.ReferralAfterDiscount < 0) billingitem.ReferralAfterDiscount = 0;


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
                        billingitem.ServiceListPriceAfterDiscount = Math.ceil(billingitem.ServiceListPrice - (billingitem.Discount * billingitem.ServiceListPrice) / 100);

                        billingitem.ReferralAfterDiscount = Math.ceil(billingitem.ReferralFee - (discount * billingitem.ServiceListPrice) / 100);
                        if (billingitem.ReferralAfterDiscount < 0) billingitem.ReferralAfterDiscount = 0;
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
                obj.Discount = 0.0;
                obj.DisCountTypeID = '0';
                obj.DiscountTypes = [
                { id: '0', name: 'By Amount' },
                { id: '1', name: 'By Percentage' },
                ];
                obj.OriginalAmountSingleQuantity = obj.ServiceListPrice / obj.ServiceQuantity;
                obj.ServiceListPriceAfterDiscountSingleQuantity = Math.ceil(obj.ServiceListPriceAfterDiscount / obj.ServiceQuantity);
                $scope.TotalAmount += obj.ServiceListPrice;
                $scope.TotalReferralFee = $scope.TotalReferralFee + obj.ReferralFee;

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

        $scope.ReceiptPrintModal = function (size, isEdit, receipt) {

            var modalInstance = $modal.open({
                templateUrl: '/ClientCode/Template/PrintReceipt.html',
                size: size,
                controller: 'PrintReceiptModalController',
                scope: $scope,
                resolve: {
                    // billingItems:billingItems
                    receipt: function () {
                        return receipt;
                    }


                }
            });

            modalInstance.result.then(function (result) {

            }, function () {


                console.log('Modal dismissed at: ' + new Date());

            });


        };



        $scope.ReceiptModal = function (size, isEdit, sreceipt) {
            var billingItems = [];
            var receipt = {};
            var isNonDrugItem = false;
            var isDisplayAddress = true;


            if (sreceipt.Id == null) {
                receipt = sreceipt;
                angular.forEach($scope.BillingItem, function (item) {
                    if (item.Selected) {

                        if (item.Item.MedicalTypeId != $scope.ReceiptMedicalTypeId) {
                            isNonDrugItem = true;
                        } else {
                            billingItems.push(item);
                        }

                    }

                });
            } else {
                receipt = sreceipt;
                billingItems = receipt.PatientServices;
            }

            if (isNonDrugItem) {
                alert("You can only build Receipt for  Drug Item....for other item You have to Build Invoice");
            } else {

                if (billingItems.length > 0) {

                    if ($scope.Patient.Id == $scope.NonRegisterPatientId) {
                        isDisplayAddress = false;
                    }


                    var modalInstance = $modal.open({
                        templateUrl: '/ClientCode/Template/Receipt.html?nd=' + Date.now(),
                        size: size,
                        controller: 'ReceiptModalController',
                        scope: $scope,
                        resolve: {
                            billingItems: function () {
                                return billingItems;
                            },
                            // billingItems:billingItems
                            receipt: function () {
                                return receipt;
                            },
                            isDisplayAddress: function () {
                                return isDisplayAddress;
                            },
                            NonRegisterPatientId: function () {
                                return $scope.NonRegisterPatientId;
                            }
                        }
                    });

                    modalInstance.result.then(function (result) {

                        if ($routeParams.tab == "receipt") {
                            $window.location.reload();
                        }

                        if ($scope.Patient.Id == $scope.NonRegisterPatientId) {
                        } else {
                            $scope.GetBillingItemByPatientId($scope.Patient.Id);
                        }


                        console.log("modal ok");


                    }, function () {

                        console.log('Modal dismissed at: ' + new Date());

                        if ($routeParams.tab == "receipt") {
                            $window.location.reload();
                        }


                        if ($scope.Patient.Id == $scope.NonRegisterPatientId) {
                        } else {
                            $scope.GetBillingItemByPatientId($scope.Patient.Id);
                        }


                    });


                }
            }
        }


        $scope.InvoiceModal = function (size, isEdit, singleinvoice) {

            if ($scope.Patient.Id == $scope.NonRegisterPatientId) {

                alert("You can't create Invoice for this Patient");

            } else {
                BillingService.GetAdvancePayment($scope.Patient.Id)
                 .success(function (data) {

                     var advancePayment = data;
                     $scope.InvoiceModalWidthAdvancePayment(size, isEdit, singleinvoice, advancePayment);

                 })
                    .error(function (error) {
                        $scope.status = 'Unable to get Advance payment data data: ' + error.message;
                        console.log($scope.status);
                        return error;
                    });
            }

        }



        $scope.InvoiceModalWidthAdvancePayment = function (size, isEdit, singleinvoice, advancePayment) {
            var billingItems = [];
            var singleInvoice = {};
            var NonRegisterPatientId;

            if (singleinvoice.Id == null) {
                angular.forEach($scope.BillingItem, function (item) {
                    if (item.Selected) {
                        billingItems.push(item);
                    }
                });
            } else {
                singleInvoice = singleinvoice;
                billingItems = singleInvoice.PatientServices;
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

            if (billingItems.length > 0) {

                var modalInstance = $modal.open({
                    templateUrl: '/ClientCode/Template/Invoice.html?nd=' + Date.now(),
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
                        },
                        // billingItems:billingItems
                        advancePayment: function () {
                            return advancePayment;
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
                        $scope.GetInvoices(singleinvoice.PatientID, $scope.invoiceStatus);
                    }

                    console.log('Modal dismissed at: ' + new Date());

                });
            }
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

            if ($scope.discountStatus == 1) {  // if total discount eanable

                $scope.CalculateTotalDiscount();
                $scope.calcDiscount();

            } else { // if line item discount enale and total discount disable

                $scope.adjustAfterDiscount(item);
                // $scope.CalculateTotalDiscount();
            }


        }

        function prepareInvoiceDataModel() {
            angular.forEach($scope.invocieslist, function (item) {

                item.Paid = 0;
                item.TotalPrice = 0;

                item.InvoiceDate = ToJavaScriptDate(item.InvoiceDate);

                item.ServiceListPriceAfterDiscount = item.ServiceListPrice;


                angular.forEach(item.PatientServices, function (pservice) {

                    item.TotalPrice = pservice.ServiceActualPrice * pservice.ServiceQuantity + item.TotalPrice;
                    pservice.ActualReferralFee = pservice.ReferralFee + (pservice.Discount / 2);
                });


                if (item.InvoiceStatusId == 1) {
                    item.Staus = "Open";
                } else if (item.InvoiceStatusId == 2) {
                    item.Staus = "Closed";
                } else if (item.InvoiceStatusId == 3) {
                    item.Staus = "Refunded";
                }
                if (item.IsRefunded) {
                    item.Staus = item.Staus + "  (Reunded)";
                }

                item.selectedIcon = true;

                angular.forEach(item.InvoicePayments, function (paymentitem) {

                    item.Paid = paymentitem.Amount + item.Paid;


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
            BillingService.GetInvoicesByPatientId(patientId, invoicestatus, $scope.invoiceDateStart, $scope.invoiceDateEnd, $scope.invoiceId)
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

        function prepareReceiptDataModel() {

            angular.forEach($scope.ReceiptList, function (item) {

                item.Paid = 0;
                item.TotalPrice = 0;

                item.ReceiptDate = ToJavaScriptDate(item.ReceiptDate);
                item.Paid = item.Payment.Amount;
                item.selectedIcon = true;
                item.activePosition = false;

                if (item.Paid > 0) {
                    item.Staus = "Paid";
                } else {
                    item.Staus = "Not-Paid";
                }

                if (item.IsRefunded) {
                    item.Staus = "Refunded";
                }

            });

        }
        $scope.reloadRceipt = function () {
            $scope.GetReceipt($scope.Patient.Id);
        }
        $scope.GetReceipt = function (patientId) {
            BillingService.GetReceiptByPatientId(patientId, $scope.ReceiptId)
                .success(function (pt) {

                    if (pt.length > 0) {
                        $scope.ReceiptList = pt;
                    } else {
                        $scope.ReceiptList = "";
                    }

                    prepareReceiptDataModel();
                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load Receipt data: ' + error.message;
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

        if ($routeParams.tab == "receipt") {
            if ($scope.Patient) {
                if ($scope.Patient.Id != null) {
                    $scope.GetReceipt($scope.Patient.Id);

                }
            }


        }


        if ($routeParams.tab == "summary") {

            if ($scope.Patient) {


                $scope.GetBillingItemByPatientId($scope.Patient.Id);
                $scope.GetTotalDebitCredit();


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


            }

            if ($routeParams.tab == "summary") {

                $scope.GetBillingItemByPatientId($scope.Patient.Id);
                $scope.GetTotalDebitCredit();

            }
        });
        // $scope.GetTotalDebitCredit();

        $('.tabs li').removeClass('active');
        $(tabClass).addClass('active');
        $(tabClass).removeClass('hide');

        // zaber
        $scope.deleteBillItem = function (itemId, index) {

            BillingService.deleteBillItem(itemId)
           .success(function (data) {

               //$scope.GetBillingItemByPatientId($scope.Patient.Id);

               $scope.status = 'Delete Successful';
               $scope.BillingItem.splice(index, 1);
               if ($scope.NonRegisterPatientId == $scope.Patient.Id) {
                   $localStorage.BillingItem = $scope.BillingItem;
               }
               $scope.calcDiscount();

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

        $scope.selected = {};

        $scope.getTemplate = function (patientService) {
            if (patientService.Id === $scope.selected.Id) return 'edit';
            else return 'display';
        };

        $scope.editPatientService = function (singleinvoice, patientService) {
            $scope.selected = angular.copy(patientService);
            $scope.selectedSingleInvoice = angular.copy(singleinvoice);
        };

        $scope.savePatientServiceAndInvoice = function (singleinvoice, patientservice) {

            // $scope.reset(patientService);
            var totalPrice = 0;
            var totalDiscount = 0;
            angular.forEach(singleinvoice.PatientServices, function (obj) {

                if (!obj.Discount) obj.Discount = 0;

                totalPrice = obj.ServiceListPrice + totalPrice;
                totalDiscount = Math.ceil(obj.Discount + totalDiscount);


            });

            if (totalPrice < singleinvoice.Paid) {
                $window.alert("Total amount shouldn't be smaller than the paid amount");
                $scope.reset(singleinvoice, patientservice);
            } else {
                singleinvoice.TotalAmount = totalPrice
                singleinvoice.TotalDiscount = totalDiscount;

                singleinvoice.InvoiceDate = ToJavaScriptDate(singleinvoice.InvoiceDate);
                singleinvoice.DueDate = ToJavaScriptDate(singleinvoice.DueDate);

                BillingService.UpdateInvoice(singleinvoice)
                      .success(function (data) {

                          console.log(data);
                          //  singleinvoice = data;

                          $scope.selected = {};
                          $scope.selectedSingleInvoice = {};


                      })
                      .error(function (error) {
                          // $scope.status = 'Unable to save PatientServiceItem data: ' + error.message;
                          $window.alert("something went wrong invoice not saved!");
                          // console.log($scope.status);
                          $scope.reset(singleinvoice, patientservice);

                      });



            }

        };

        $scope.reset = function (singleinvoice, patientService) {

            patientService.ServiceListPrice = $scope.selected.ServiceListPrice;
            patientService.Discount = $scope.selected.Discount;
            patientService.ReferralFee = $scope.selected.ReferralFee;

            singleinvoice = $scope.selectedSingleInvoice;

            $scope.selected = {};
            $scope.selectedSingleInvoice = {};
            // $scope.savePatientServiceAndInvoice(singleinvoice, patientService);
        };



        $scope.UpdatePatientServiceDiscount = function (singleinvoice, patientService) {
            var actualprice = patientService.ServiceActualPrice * patientService.ServiceQuantity;
            var refferDiscount = 0;

            if (!patientService.Discount) patientService.Discount = 0;


            if (patientService.Discount > actualprice) {
                patientService.Discount = actualprice;
            }
            patientService.ServiceListPrice = (patientService.ServiceActualPrice * patientService.ServiceQuantity) - patientService.Discount;
            if (patientService.LabStatusId > 0) {

                refferDiscount = patientService.Discount / 2;
                patientService.ReferralFee = patientService.ActualReferralFee - refferDiscount;

            }
            if (patientService.ReferralFee < 0) patientService.ReferralFee = 0;

            patientService.DiscountAfterInvoice = true;



            //patientService.ServiceListPrice=patientService.ServiceActualPrice - patientService.Discount;
        }

        /*---------------------- inline editing code end --------------------*/



        /*------------------------------- refund code begin ---------------------------*/
        $scope.OpenPopUp = function (event, patientservice, Paid) {

            $('#popupRefundApproval').css("display", "block");
            //$('#popupRefundApproval').css("opacity", 1);

            $("#popupRefundApproval").css({ position: "absolute", top: event.pageY - 100, left: event.pageX - 220 });

            $scope.refundedServices = patientservice;
            $scope.Paid = Paid;

        }

        $scope.saveRefundNote = function () {

            if ($scope.Paid < ($scope.refundedServices.ServiceListPrice * $scope.refundedServices.ServiceQuantity)) {
                $window.alert("you can't refund this item");
            } else {

                $scope.refundedServices.RefundNote = $scope.refundNote;
                BillingService.UpdateRefundNote($scope.refundedServices)
              .success(function (data) {





              })
              .error(function (error) {
                  // $scope.status = 'Unable to save PatientServiceItem data: ' + error.message;
                  $window.alert("something went wrong Refund request  not send!");
                  // console.log($scope.status);
                  $scope.reset(singleinvoice, patientservice);

              });
            }

            $('#popupRefundApproval').css("display", "none");
            //$('#popupRefundApproval').css("opacity", 0);

        }

        /*-------------------------------------- refund code end --------------------------*/


        /*------------------------------- open advance payment model ------------------------------*/

        $scope.AdvancePaymentModal = function (size, isEdit) {



            var modalInstance = $modal.open({
                templateUrl: '/ClientCode/Template/AdvancePayment.html',
                size: size,
                controller: 'AdvancePaymentModalController',
                scope: $scope
            });

            modalInstance.result.then(function (result) {

                $scope.GetTotalDebitCredit();

            }, function () {


                //  $scope.GetInvoices($scope.Patient.Id, $scope.invoiceStatus);
                // prepareInvoiceDataModel();


                $scope.GetTotalDebitCredit();

                console.log('Modal dismissed at: ' + new Date());

            });
        };


        /*---------------------------------- end advance payment model ------------------------------*/

    }



    /*------------------------- configuration begin -------------------------*/

    $scope.GetConfiguration = function () {

        IniService.GetConfiguration()
            .success(function (data) {

                $scope.Configuration = data;

              
                $scope.ReceiptMedicalTypeId = $scope.Configuration.Configuration.MedicalTypeDrug;
                $scope.NonRegisterPatientId = $scope.Configuration.Configuration.NonRegisterPatientId;

                init();

            }).error(function (error) {

                $scope.status = 'Unable to Discharge Admission: ' + error.message;
                console.log($scope.status);

            });

    }

    $scope.GetConfiguration();

    /*------------------------- configuration end -------------------------*/

});
