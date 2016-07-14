'use strict';


HmsApp.controller("PatientSummaryReportController", function ($scope, $routeParams, $window, $filter, $modal, PatientSummaryReportService) {



    if ($routeParams.tab == "summary") {

    }

    var tabClass = ".summary";
    if ($routeParams.tab != null) {
        tabClass = "." + $routeParams.tab;
    }
    $('.tabs li').removeClass('active');
    $(tabClass).addClass('active');
    $(tabClass).removeClass('hide');
});