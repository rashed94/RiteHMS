'use strict';


HmsApp.controller("AdminApprovalController", function ($scope, $routeParams, $window, $filter, $modal, AdminApprovalService) {



    if ($routeParams.tab == "refund") {

    }

    var tabClass = ".refund";
    if ($routeParams.tab != null) {
        tabClass = "." + $routeParams.tab;
    }
    $('.tabs li').removeClass('active');
    $(tabClass).addClass('active');
    $(tabClass).removeClass('hide');
});