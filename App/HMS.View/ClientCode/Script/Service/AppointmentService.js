HmsApp.factory('AppointmentService', ['$http', function ($http) {
    var AppointmentService = {};

    AppointmentService.GetAppointments = function (doctorId, date) {
        return $http.get('/Appointment/GetAppointments?doctorId=' + doctorId + '&date=' + date);
    };

    AppointmentService.SaveAppointment = function (doctorAppointment) {
        return $http.post('/Appointment/SaveDoctorAppointment', doctorAppointment);
    };

    return AppointmentService;
}]);