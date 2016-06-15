HmsApp.factory('AppointmentService', ['$http', function ($http) {
    var AppointmentService = {};

    AppointmentService.GetAppointments = function () {
        return $http.get('/Appointment/GetAppointments');
    };    

    return AppointmentService;
}]);