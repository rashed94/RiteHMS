'use strict';


HmsApp.controller("ReportTransactionMenuController", function ($scope, $routeParams, $location) {




    $scope.UpdateSubMenu = function (url) {
        if (url.indexOf("transaction") > -1) {
            $('.site_navigation_secondary li a').removeClass('active');
            $('.site_navigation_secondary li.transaction a').addClass('active');
            // $location.path = $location.path(link);
            //  $window.location.href = '#/patient';
        }
        //else if (url.indexOf("patientsummaryreport") > -1) {
        //    $('.site_navigation_secondary li a').removeClass('active');
        //    $('.site_navigation_secondary li.summary_report a').addClass('active');

        //    //  $window.location.href = '#/billing';
        //}
    }



    if ($location.path() != null) {

        $scope.UpdateSubMenu($location.path());
    }



});