'use strict';
HmsApp.controller("BedSetupController", function ($scope, $routeParams, $window, $filter, $modal, BillingService) {

    var tabClass = ".summary";
    if ($routeParams.tab != null) {
        tabClass = "." + $routeParams.tab;
    }
    $('.tabs li').removeClass('active');
    $(tabClass).addClass('active');
    $(tabClass).removeClass('hide');


});