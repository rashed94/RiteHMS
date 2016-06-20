'use strict';
HmsApp.controller("AppointmentController", function ($scope, $routeParams, $window, $filter, $modal, AppointmentService, ConfigurationService) {

    $scope.Appointments = [];
    $scope.SelectedAppointment = {};
    $scope.Doctor = {};

    var todayDate=$filter('date')(new Date(), 'MM/dd/yyyy');

    $scope.DoctorAppointment = {
        ServiceProviderId: 0,
        AppointmentDate: todayDate
    };

    ConfigurationService.GetDepartments()
        .success(function (departments) {
            $scope.Departments = departments;
            $scope.SelectedDepartment = $scope.Departments[0];
            $scope.SelectedAppointment = {};
        })
        .error(function (error) {
            $scope.status = 'Unable to load Departments data: ' + error.message;
            console.log($scope.status);
        });

    $scope.GetDoctors = function (departmentId) {
        ConfigurationService.GetDoctorsByDepartment(departmentId)
        .success(function (doctors) {
            $scope.Doctors = doctors;
            $scope.SelectedAppointment = {};
        })
        .error(function (error) {
            $scope.status = 'Unable to load DoctorsByDepartment data: ' + error.message;
            console.log($scope.status);
        });
    };

    $scope.GetAppointments = function () {
        var doctorId = $scope.Doctor.Id;
        var oDate = new Date(Date.parse($scope.DoctorAppointment.AppointmentDate));
        var date = oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDate();

        $scope.SelectedAppointment = {};

        AppointmentService.GetAppointments(doctorId, date)
            .success(function (data) {
                $scope.Appointments = data.AppointmentSlots;
                $scope.DoctorAppointments = data.DoctorAppointments;
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
        $scope.SelectedAppointment = appointment;
    };

    $scope.ConfirmAppointment = function () {
        $scope.DoctorAppointment.AppointmentId = $scope.SelectedAppointment.Id;
        $scope.DoctorAppointment.PatientId = $scope.Patient.Id;
        $scope.DoctorAppointment.ServiceProviderId = $scope.Doctor.Id;
        console.log($scope.DoctorAppointment.AppointmentDate);
        AppointmentService.SaveAppointment($scope.DoctorAppointment)
            .success(function (doctorAppointment) {
                $scope.DoctorAppointment = doctorAppointment;
                $scope.DoctorAppointment.AppointmentDate = ToJavaScriptDate($scope.DoctorAppointment.AppointmentDate);
                $window.location.href = "#/patient";
            })
            .error(function (error) {
                $scope.status = 'Unable to load DoctorAppointment data: ' + error.message;
                console.log($scope.status);
            });
    };

    function Init() {
        if (!$scope.Departments) {
            ConfigurationService.GetDepartments();
        }
    }

    Init();
});