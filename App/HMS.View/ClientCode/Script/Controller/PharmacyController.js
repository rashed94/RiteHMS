'use strict';
HmsApp.controller("PharmacyController", function ($scope, $routeParams, $window, $filter, $modal, BillingService) {

    var tabClass = ".summary";
    if ($routeParams.tab != null) {
        tabClass = "." + $routeParams.tab;
    }
    $('.tabs li').removeClass('active');
    $(tabClass).addClass('active');
    $(tabClass).removeClass('hide');


});