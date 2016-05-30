'use strict';

HmsApp.controller("BillingController", function ($scope, $routeParams, $filter, $modal, BillingService) {

    $scope.TotalDiscount = 0;
    $scope.TotalAmount = 0;
    $scope.TotalAmountAfterDiscount = 0
    $scope.TotalReferralFee = 0;
   
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

    $scope.adjustAfterDiscount = function (billingitem) {

        // if amount is selected
        if (billingitem.DisCountTypeID == 0)
        {
            if (billingitem.Discount != "") {
                var discount = billingitem.Discount / 2;
                
                billingitem.ReferralAfterDiscount = billingitem.ReferralFee - discount;
                billingitem.ServiceListPriceAfterDiscount = billingitem.ServiceListPrice - billingitem.Discount;
               

            }
            else
            {
                billingitem.ServiceListPriceAfterDiscount = billingitem.ServiceListPrice;
                billingitem.ReferralAfterDiscount = billingitem.ReferralFee;
            }
            
        }
        else if (billingitem.DisCountTypeID == 1)
        {

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

    $scope.InvoiceModal = function (size, isEdit) {
        var billingItems = [];
        angular.forEach($scope.BillingItem, function (item) {
            if (item.Selected) {
                billingItems.push(item);
            }
        });
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
                    return isEdit ? $scope.BillingItems : billingItems;
                }
            }
        });
        modalInstance.result.then(function (result) {
            $scope.Invoice = result.Invoice;
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
