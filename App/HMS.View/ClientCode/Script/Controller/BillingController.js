'use strict';

HmsApp.controller("BillingController", function ($scope, $routeParams, BillingService) {
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

    $('.site_navigation li a').removeClass('selected');
    $('.site_navigation li.billing a').addClass('selected');

    var tabClass = ".summary";
    if ($routeParams.tab != null) {
        tabClass = "." + $routeParams.tab;
    }
    $('.tabs li').removeClass('active');
    $(tabClass).addClass('active');
    $(tabClass).removeClass('hide');
});
