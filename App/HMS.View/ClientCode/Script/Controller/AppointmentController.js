'use strict';


HmsApp.controller("AppointmentController", function ($scope, $routeParams, $window, $filter, $modal, AppointmentService, ConfigurationService, IniService) {

    $scope.Appointments = [];
    $scope.SelectedAppointment = {};
    $scope.Doctor = {};

    var todayDate=$filter('date')(new Date(), 'MM/dd/yyyy');


    function init() {

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
            ConfigurationService.GetDoctorsByDepartment(departmentId, $scope.ServiceProviderType)
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
                    UpdateTopLink('patient');
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

        if ($routeParams.tab == "summary") {

        }

        var tabClass = ".summary";
        if ($routeParams.tab != null) {
            tabClass = "." + $routeParams.tab;
        }
        $('.tabs li').removeClass('active');
        $(tabClass).addClass('active');
        $(tabClass).removeClass('hide');
    }

    /*------------------------- configuration begin -------------------------*/

    $scope.GetConfiguration = function () {

        IniService.GetConfiguration()
            .success(function (data) {

                $scope.Configuration = data;


                $scope.medicalTypeID = $scope.Configuration.Configuration.MedicalTypeLabTest.toString();
                $scope.NonRegisterPatientId = $scope.Configuration.Configuration.NonRegisterPatientId;
                $scope.ServiceProviderType = $scope.Configuration.Configuration.DoctorTypeId;

                init();

            }).error(function (error) {

                $scope.status = 'Unable to Discharge Admission: ' + error.message;
                console.log($scope.status);

            });

    }

    $scope.GetConfiguration();

    /*------------------------- configuration end -------------------------*/
});