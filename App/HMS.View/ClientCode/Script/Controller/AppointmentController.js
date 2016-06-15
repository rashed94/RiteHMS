'use strict';
HmsApp.controller("AppointmentController", function ($scope, $routeParams, $window, $filter, $modal, AppointmentService, ConfigurationService) {
    var today = new Date();

    $scope.Appointments = [];
    $scope.SelectedAppointment = [];

    $scope.DoctorAppointment = {
        ServiceProviderId: 0,
        Date: today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
    };

    ConfigurationService.GetDepartments()
        .success(function (departments) {
            $scope.Departments = departments;
            $scope.SelectedDepartment = $scope.Departments[0];
        })
        .error(function (error) {
            $scope.status = 'Unable to load Departments data: ' + error.message;
            console.log($scope.status);
        });

    $scope.GetDoctors = function (departmentId) {
        ConfigurationService.GetDoctorsByDepartment(departmentId)
        .success(function (doctors) {
            $scope.Doctors = doctors;
        })
        .error(function (error) {
            $scope.status = 'Unable to load DoctorsByDepartment data: ' + error.message;
            console.log($scope.status);
        });
    };

    $scope.GetAppointments = function () {
        AppointmentService.GetAppointments()
            .success(function (appointments) {
                $scope.Appointments = appointments;
            })
            .error(function (error) {
                $scope.status = 'Unable to load Appointment data: ' + error.message;
                console.log($scope.status);
            });
    };

    $scope.SelectAppointment = function (appointment) {
        for (var i = 0; i < $scope.Appointments.length; i++) {
            $scope.Appointments[i].Selected = false;
        }
        appointment.Selected = !appointment.Selected;
    };

    function Init() {
        if (!$scope.Departments) {
            ConfigurationService.GetDepartments();
        }
    }

    Init();
});