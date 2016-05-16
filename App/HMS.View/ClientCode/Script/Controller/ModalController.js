'use strict';

var ModalController = function ($scope, $modalInstance, patient) {
    $scope.Patient = patient;
    $scope.ok = function () {
        $modalInstance.close($scope.Patient);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};