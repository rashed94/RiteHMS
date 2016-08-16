'use strict';
HmsApp.controller("ConfigurationController", function ($scope, $routeParams, $window, $filter, $modal, $route, ItemService, ConfigurationService, IniService) {

    $scope.medicalTypeID ;
    $scope.HospitalAdmissionId;


    function init() {

        var tabClass = ".copayer";
        if ($routeParams.tab != null) {
            tabClass = "." + $routeParams.tab;
        }
        $('.tabs li').removeClass('active');
        $(tabClass).addClass('active').removeClass('hide');



        $scope.getServiceprovider = function () {
            ConfigurationService.GetServiceProviderTypes()
            .success(function (serviceProviderTypes) {
                $scope.ServiceProviderTypes = serviceProviderTypes;
              //  $scope.SelectedServiceProviderType = $scope.ServiceProviderTypes[0];
                $scope.SelectedServiceProviderType.Id = $scope.ServiceProviderTypes[0].Id;
                $scope.GetServiceProviders();

                console.log($scope.ServiceProviderTypes);
            })
            .error(function (error) {
                $scope.status = 'Unable to load ServiceProviderTypes data: ' + error.message;
                console.log($scope.status);
            });
        }
        if ($routeParams.tab == "serviceprovider") {
            $scope.SelectedServiceProviderType = {};
            $scope.Departments = [];

            $scope.getServiceprovider();

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
            return ConfigurationService.SaveServiceProvider($scope, file);
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

                //$scope.ServiceProvider.DepartmentId = $scope.ServiceProvider.Department.Id;
                //$scope.ServiceProvider.Department = null;
                //$scope.ServiceProvider.ServiceProviderTypeId = $scope.ServiceProvider.ServiceProviderType.Id;
                //$scope.ServiceProvider.ServiceProviderType = null;
                $scope.SaveServiceProvider(result.File).data.then(function (result) {
                    $scope.GetServiceProviders();
                });

            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };




        $scope.DeleteServiceProvider = function (serviceProvider) {
            var reallyDelete = confirm('Really delete this provider?');
            if (reallyDelete) {
                ConfigurationService.DeleteServiceProvider(serviceProvider.Id)
                .success(function (serviceProvider) {
                    // TODO: Remove from collection
                    $scope.GetServiceProviders();
                })
                .error(function (error) {
                    $scope.status = 'Unable to load ServiceProviderTypes data: ' + error.message;
                    console.log($scope.status);
                });
            }
        };



        $scope.OtherServicesModal = function (size, item) {

            if (item == "") item = { Id: null };

            var modalInstance = $modal.open({
                templateUrl: '/ClientCode/Template/EditOtherServices.html',
                size: size,
                controller: 'OtherServicesModalController',
                scope: $scope,
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });
            modalInstance.result.then(function (result) {

                console.log('Modal ok at: ' + new Date());
                $scope.loadItems();
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        $scope.TreatmentModal = function (size, item) {

            if (item == "") item = { Id: null };

            var modalInstance = $modal.open({
                templateUrl: '/ClientCode/Template/EditTreatment.html',
                size: size,
                controller: 'TreatmentModalController',
                scope: $scope,
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });
            modalInstance.result.then(function (result) {

                console.log('Modal ok at: ' + new Date());
                $scope.LoadTreatmentItems();
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        };



        function prepareOtherServiceDataModel() {
            angular.forEach($scope.Items, function (obj) {

                obj.IsHospitalItem = false;
                angular.forEach(obj.InitialSetupItems, function (initialsetupobj) {

                    if (obj.MedicalTypeId == initialsetupobj.MedicalTypeId) {
                        obj.IsHospitalItem = true;

                        obj.InitialSetupItem = {};

                        obj.InitialSetupItem.Id = initialsetupobj.Id;
                        obj.InitialSetupItem.InitialSetupId = initialsetupobj.InitialSetupId;
                        obj.InitialSetupItem.ItemId = initialsetupobj.ItemId;
                        obj.InitialSetupItem.MedicalTypeId = initialsetupobj.MedicalTypeId;
                    }

                });



            });
        }

        $scope.GetOtherServices = function (medicalType) {
            ItemService.GetOtherServices(medicalType)
                .success(function (pt) {
                    $scope.Items = pt;
                    // preparelabtestDataModel();
                    prepareOtherServiceDataModel();
                    console.log(pt);



                })
                .error(function (error) {
                    $scope.status = 'Unable to load  item data: ' + error.message;
                    console.log($scope.status);
                });
        }

        $scope.loadItems = function () {

            $scope.GetOtherServices($scope.medicalTypeID);

        }

        $scope.LoadTreatmentItems = function () {

            ItemService.LoadTreatmentItems($scope.medicalTypeIDTreatment)
                .success(function (pt) {
                    $scope.TreatmentItems = pt;
                    // preparelabtestDataModel();
                    //prepareOtherServiceDataModel();
                    console.log(pt);



                })
                .error(function (error) {
                    $scope.status = 'Unable to load  item data: ' + error.message;
                    console.log($scope.status);
                });

        }



        $scope.HospitalAdmissionDefault = function (item) {
            var initialSetupItem = {

                InitialSetupId: $scope.HospitalAdmissionId,
                ItemId: item.Id,
                MedicalTypeID: item.MedicalTypeId
            }

            ItemService.SaveInititalSetupItem(initialSetupItem)
            .success(function (data) {

                //$scope.loadItembyId(data);
                $scope.saveSuccess = 1;
                $scope.GetOtherServices($scope.medicalTypeID);
                console.log("Save successfull");
                $modalInstance.close();

            })
            .error(function (error) {
                $scope.status = 'Unable to save category data: ' + error.message;

            });


        }

        $scope.HospitalAdmissionDefaultRemove = function (item) {

            ItemService.SaveInititalSetupItem(item.InitialSetupItem)
            .success(function (data) {

                //$scope.loadItembyId(data);
                $scope.saveSuccess = 1;
                $scope.GetOtherServices($scope.medicalTypeID);
                console.log("Save successfull");
                $modalInstance.close();

            })
            .error(function (error) {
                $scope.status = 'Unable to save category data: ' + error.message;

            });


        }
        $scope.DeleteTreatment=function(itemId)
        {

            ItemService.deleteItem(itemId)
            .success(function (data) {


                $scope.LoadTreatmentItems();
                console.log("delete successfull");
                // $modalInstance.close();

            })
            .error(function (error) {
                $scope.status = 'Unable to delete item data: ' + error.message;

            });
        }
        $scope.deleteService = function (item) {

            ItemService.DeleteOtherService(item, item.InitialSetupItem)
            .success(function (data) {


                $scope.GetOtherServices($scope.medicalTypeID);
                console.log("delete successfull");
               // $modalInstance.close();

            })
            .error(function (error) {
                $scope.status = 'Unable to delete item data: ' + error.message;

            });


        }


        if ($routeParams.tab == "OtherServices") {
            $scope.loadItems();

        }
        if ($routeParams.tab == "treatment") {
            $scope.LoadTreatmentItems();

        }
    }



    /*------------------------- configuration begin -------------------------*/

    $scope.GetConfiguration = function () {

        IniService.GetConfiguration()
            .success(function (data) {

                $scope.Configuration = data;


                $scope.medicalTypeID = $scope.Configuration.Configuration.MedicalTypeOther.toString();
                $scope.medicalTypeIDTreatment = $scope.Configuration.Configuration.MedicalTypeTreatment.toString();
                $scope.NonRegisterPatientId = $scope.Configuration.Configuration.NonRegisterPatientId;
                $scope.HospitalAdmissionId = $scope.Configuration.Configuration.InititalSetupHospitalAdmission;
                init();

            }).error(function (error) {

                $scope.status = 'Unable to Discharge Admission: ' + error.message;
                console.log($scope.status);

            });

    }

    $scope.GetConfiguration();

    /*------------------------- configuration end -------------------------*/


});