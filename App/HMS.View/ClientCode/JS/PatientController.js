'use strict';

function PatientController($scope, $routeParams, $modal, PatientService) {
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

    $scope.SavePatient = function () {
        PatientService.SaveContact($scope.Patient)
            .success(function (data) {
                console.log(data);
            })
            .error(function (error) {
                $scope.status = 'Unable to save Patient data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.open = function () {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: ModalInstanceCtrl,
            resolve: {
                Patient: function () {
                    return $scope.Patient;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
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
}

var ModalInstanceCtrl = function ($scope, $modalInstance, patient) {
    $scope.Patient = patient;
    $scope.ok = function () {
        $modalInstance.close($scope.Patient);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};