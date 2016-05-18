'use strict';

HmsApp.controller("PatientController", function ($scope, $routeParams, $modal, $http, PatientService) {
    //$scope.calculateAge = function (birthday) { // birthday is a date
    //    var ageDifMs = Date.now() - birthday.getTime();
    //    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    //    return Math.abs(ageDate.getUTCFullYear() - 1970);
    //}

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
                    $scope.Patient.DOB = ToJavaScriptDate($scope.Patient.DOB);
                    $scope.Patient.Age = calculateAge($scope.Patient.DOB);
                }
                $scope.$broadcast('update_child_controller', $scope.Patient);
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

    var _selected;
    $scope.selected = undefined;
    $scope.getLocation = function (val) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false
            }
        }).then(function (response) {
            return response.data.results.map(function (item) {
                return item.formatted_address;
            });
        });
    };

    $scope.SearchPatientsByPartialName = function (name) {
        PatientService.SearchPatientsByPartialName(name)
            .success(function (pt) {
                $scope.Patients = pt;
                console.log($scope.Patients);
            })
            .error(function (error) {
                $scope.status = 'Unable to load Patient data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.SavePatient = function () {
        PatientService.SavePatient($scope.Patient)
            .success(function (data) {
                $scope.Patient = data;
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
            resolve: {
                patient: function () {
                    return patient;
                }
            }
        });
        modalInstance.result.then(function (patient) {
            alert(patient);
            $scope.Patient = patient;
            $scope.SavePatient();
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
        $scope.Patient = {
        };
    }
});