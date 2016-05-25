'use strict';

//HmsApp.directive('datepickerAuto', function () {
//    return {
//        require: ['ngModel'],
//        restrict: 'E',
//        template: '<input class="input form-control" datepicker-popup="MM/dd/yyyy" show-weeks="false"' +
//            ' is-open="autoIsOpen" ng-focus="autoIsOpen = true" ng-click="autoIsOpen = true"'
//            + ' type="text" ng-model="ngModel" ng-model-options="{\'updateOn\': \'blur\'}"/>',
//        link: function (scope) {
//            scope.autoIsOpen = false;
//        },
//        scope: {
//            ngModel: '='
//        }

//    };
//});

HmsApp.controller("PatientController", function ($scope, $routeParams,$timeout, $modal,$filter, $http, PatientService) {
    //$scope.calculateAge = function (birthday) { // birthday is a date
    //    var ageDifMs = Date.now() - birthday.getTime();
    //    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    //    return Math.abs(ageDate.getUTCFullYear() - 1970);
    //}

    $scope.Items = [];

    $scope.initDatePicker=function () {
        $('.reportdeliverydate').datepicker({
            format: "mm/dd/yyyy"
        }).on('changeDate', function (ev) {
            $(this).blur();
            $(this).datepicker('hide');
        });
        
    }
    $scope.AgeCalculate = function () {

        $scope.Patient.DOB = ToJavaScriptDate($scope.Patient.DOB);
        $scope.Patient.Age = calculateAge($scope.Patient.DOB);



    }

    $scope.GetPatients = function () {
        PatientService.GetPatients()
            .success(function (cts) {
                $scope.Patients = cts;
            })
            .error(function (error) {
                $scope.status = 'Unable to load Patient data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.GetPatientById = function (id) {
        PatientService.GetPatientById(id)
            .success(function (pt) {
                $scope.Patient = pt;
                if ($scope.Patient.DOB != null) {
                    $scope.AgeCalculate();
                }
                //$scope.$broadcast('update_child_controller', $scope.Patient);
                console.log($scope.Patient);
            })
            .error(function (error) {
                $scope.status = 'Unable to load Patient data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.GetPatientByPhone = function (phone) {
        PatientService.GetPatientByPhone(phone)
            .success(function (pt) {
                $scope.Patient = pt;
                console.log($scope.Patient);
            })
            .error(function (error) {
                $scope.status = 'Unable to load Patient data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.GetPatientsByName = function (name) {
        PatientService.GetPatientsByName(name)
            .success(function (pt) {
                $scope.Patients = pt;
                console.log($scope.Patients);
            })
            .error(function (error) {
                $scope.status = 'Unable to load Patient data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.updateItem=function($item)
    {
        angular.forEach($scope.Items, function (obj) {
            // obj.push($item);
            if (obj.Id == $item.Id) {

                obj.Amount = obj.SalePrice * $item.Quantity;

            }
        });
    }
  

    //$scope.deleteItem = function ($item) {
    //    angular.forEach($scope.Items, function (obj) {
    //        // obj.push($item);
    //        if (obj.Id == $item.Id) {

    //            $scope.ite

    //        }
    //    });
    //}


    $scope.OnItemSelect=function ($item)
    {
        $item.Quantity = 1;
        $item.Amount = $item.SalePrice;
        var found = $filter('filter')($scope.Items, { Id: $item.Id }, true);
        if (!found.length) {
            $scope.Items.push($item);
        }
        //angular.forEach($scope.Items, function(obj){
        //    obj.push($item);
        //});
    }

    $scope.OnPatientSelect = function ($item, $model, $label) {
        $scope.Patient = $item;
        if ($scope.Patient.DOB != null) {
            $scope.AgeCalculate();
        }
    };

    $scope.SearchPatientsByPartialName = function (name) {
        return $http.get('/Patient/SearchPatientByPartialName?name=' + name).then(function (response) {
            return response.data;
        });
    }

    $scope.FormatInput = function ($model) {
        var inputLabel = '';
        angular.forEach($scope.Patients, function (patient) {
            if ($model === patient.Id) {
                inputLabel = patient.FirstName + " " + patient.LastName;
            }
        });
        return inputLabel;
    }
    $scope.UploadPhoto = function () {

        PatientService.UploadPhoto($scope.Patient)
    }
    $scope.SavePatient = function () {
        PatientService.SavePatient($scope.Patient)
            .success(function (data) {
                $scope.Patient = data;
                if ($scope.Patient.DOB != null) {
                    $scope.AgeCalculate();
                }
                console.log(data);
            })
            .error(function (error) {
                $scope.status = 'Unable to save Patient data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.OpenNew = function (size) {
        var patient = {

        };
        var modalInstance = $modal.open({
            templateUrl: '/ClientCode/Template/EditPatient.html',
            size: size,
            controller: 'ModalController',
            scope: $scope,
            resolve: {
                patient: function () {
                    return $scope.Patient;
                }
            }
        });
        modalInstance.result.then(function (patient) {
            
            $scope.Patient = patient;
           // $scope.Patient.DOB = $scope.Patient.DOB;
            $scope.SavePatient();
           // $scope.UploadPhoto();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $('.site_navigation li a').removeClass('selected');
    $('.site_navigation li.patientinfo a').addClass('selected');

    if ($routeParams.id != null) {
        $scope.GetPatientById($routeParams.id);
    }
    else {
        $scope.Patient;
    }
});