'use strict';

HmsApp.controller("ModalController", function ($scope, $modalInstance, patient) {
    $scope.Patient = patient;
    $scope.ok = function () {
        $modalInstance.close($scope.Patient);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.Files = [];
    $scope.LoadFileData = function (files) {
        console.log(files[0].type);
       $scope.Patient.Photo = files[0].name;
    };
});