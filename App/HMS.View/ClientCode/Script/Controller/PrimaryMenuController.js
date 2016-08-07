'use strict';


HmsApp.controller("PrimaryMenuController", function ($scope, $routeParams, $location) {




    $scope.UpdateTopLink = function (link) {

        if (link) {

            if (link.indexOf("patient") > -1) {
                $('.site_navigation li a').removeClass('selected');
                $('.site_navigation li.patientinfo a').addClass('selected');
                // $location.path = $location.path(link);
                //  $window.location.href = '#/patient';
            }
            else if (link.indexOf("billing") > -1) {
                $('.site_navigation li a').removeClass('selected');
                $('.site_navigation li.billing a').addClass('selected');

                //  $window.location.href = '#/billing';
            }
            else if (link.indexOf("labtest") > -1) {
                $('.site_navigation li a').removeClass('selected');
                $('.site_navigation li.labtest a').addClass('selected');

                //  $window.location.href = '#/billing';
            }
            else if (link.indexOf("appointment") > -1) {
                $('.site_navigation li a').removeClass('selected');
                $('.site_navigation li.appointment a').addClass('selected');

                //  $window.location.href = '#/billing';
            }
            else if (link.indexOf("configuration") > -1) {
                $('.site_navigation li a').removeClass('selected');
                $('.site_navigation li.configuration a').addClass('selected');

                //  $window.location.href = '#/billing';
            }
            else if (link.indexOf("pharmacy") > -1) {
                $('.site_navigation li a').removeClass('selected');
                $('.site_navigation li.pharmacy a').addClass('selected');

                //  $window.location.href = '#/billing';
            }

            else if (link.indexOf("bedsetup") > -1) {
                $('.site_navigation li a').removeClass('selected');
                $('.site_navigation li.bedsetup a').addClass('selected');

                //  $window.location.href = '#/billing';
            }

            else if (link.indexOf("surgery") > -1) {
                $('.site_navigation li a').removeClass('selected');
                $('.site_navigation li.surgery a').addClass('selected');

                //  $window.location.href = '#/billing';
            }


            else if (link.indexOf("expense") > -1) {
                $('.site_navigation li a').removeClass('selected');
                $('.site_navigation li.expense a').addClass('selected');

                //  $window.location.href = '#/billing';
            }

            else if (link.indexOf("admin") > -1) {
                $('.site_navigation li a').removeClass('selected');
                $('.site_navigation li.admin a').addClass('selected');

                //  $window.location.href = '#/billing';
            }

            else {
                $('.site_navigation li a').removeClass('selected');
                $('.site_navigation li.patientinfo a').addClass('selected');

            }
        }

    }
    
    $scope.ChangePath=function()
    {

        if ($location.path() != null) {


            var url = $location.path().split('/');



            $scope.UpdateTopLink(url[1]);
        }
    }
    
    $scope.$on('$locationChangeSuccess', function(event)
    {
        $scope.ChangePath();
        

    });

    $scope.ChangePath();

});