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
        $scope.Departments = [];

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

        ConfigurationService.GetDepartments()
            .success(function (departments) {
                $scope.Departments = departments;
                $scope.SelectedDepartment = $scope.Departments[0];
            })
            .error(function (error) {
                $scope.status = 'Unable to load Departments data: ' + error.message;
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

    $scope.SaveServiceProvider = function (file) {
        ConfigurationService.SaveServiceProvider($scope, file);
    };

    $scope.ServiceProviderModal = function (size, serviceProvider) {
        if (!serviceProvider) {
            serviceProvider = {
                Contact: {},
                DepartmentId: 0,
                ServiceProviderTypeId: 0
            };
        }
        var modalInstance = $modal.open({
            templateUrl: '/ClientCode/Template/EditServiceProvider.html',
            size: size,
            controller: 'ServiceProviderModalController',
            scope: $scope,
            resolve: {
                serviceProvider: function () {
                    return serviceProvider;
                }
            }
        });
        modalInstance.result.then(function (result) {
            $scope.ServiceProvider = result.ServiceProvider;
            $scope.ServiceProvider.DepartmentId = $scope.ServiceProvider.Department.Id;
            $scope.ServiceProvider.Department = null;
            $scope.ServiceProvider.ServiceProviderTypeId = $scope.ServiceProvider.ServiceProviderType.Id;
            $scope.ServiceProvider.ServiceProviderType = null;
            $scope.SaveServiceProvider(result.File);
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.SaveServiceProviders = function () {
        ConfigurationService.SaveServiceProvider()
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