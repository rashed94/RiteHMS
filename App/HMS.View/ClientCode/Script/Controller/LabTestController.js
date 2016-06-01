'use strict';

HmsApp.controller("LabTestController", function ($scope, $routeParams, $window, $filter, $modal, BillingService) {

    var tabClass = ".summary";
    if ($routeParams.tab != null) {
        tabClass = "." + $routeParams.tab;
    }
    $('.tabs li').removeClass('active');
    $(tabClass).addClass('active');
    $(tabClass).removeClass('hide');


});