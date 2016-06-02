'use strict';
HmsApp.controller("ConfigurationController", function ($scope, $routeParams, $window, $filter, $modal, ConfigurationService) {

    var tabClass = ".copayer";
    if ($routeParams.tab != null) {
        tabClass = "." + $routeParams.tab;
    }
    $('.tabs li').removeClass('active');
    $(tabClass).addClass('active').removeClass('hide');


    if ($routeParams.tab == "serviceprovider") {

        $scope.SelectedServiceProviderType = {};
        ConfigurationService.GetServiceProviderTypes()
            .success(function (serviceProviderTypes) {
                $scope.ServiceProviderTypes = serviceProviderTypes;
                $scope.SelectedServiceProviderType = $scope.ServiceProviderTypes[0];

                $scope.GetServiceProviders();

                console.log($scope.ServiceProviderTypes);
            })
            .error(function (error) {
                $scope.status = 'Unable to load ServiceProviderTypes data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.GetServiceProviders = function () {
        ConfigurationService.GetServiceProvidersByType($scope.SelectedServiceProviderType.Id)
        .success(function (serviceProviders) {
            $scope.ServiceProviders = serviceProviders;
            console.log($scope.ServiceProviders);
        })
        .error(function (error) {
            $scope.status = 'Unable to load ServiceProviderTypes data: ' + error.message;
            console.log($scope.status);
        });
    }

});