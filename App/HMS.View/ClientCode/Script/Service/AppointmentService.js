HmsApp.factory('AppointmentService', ['$http', function ($http) {
    var AppointmentService = {};

    AppointmentService.GetAppointments = function () {
        return $http.get('/Appointment/GetAppointments');
    };

    AppointmentService.SaveAppointment = function (doctorAppointment) {
        return $http.post('/Appointment/SaveDoctorAppointment', doctorAppointment);
    };

    return AppointmentService;
}]);