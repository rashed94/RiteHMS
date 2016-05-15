HmsApp.factory('PatientService', ['$http', function ($http) {
    var PatientService = {};
    PatientService.GetPatients = function () {
        return $http.get('/Patient/GetPatients');
    };
    PatientService.SavePatient = function (patient) {
        return $http.post('/Patient/UpdatePatient', patient);
    };
    PatientService.GetPatientById = function (id) {
        return $http.get('/Patient/GetPatientById?id=' + id);
    };
    PatientService.GetPatientByPhone = function (phone) {
        return $http.get('/Patient/GetPatientByPhone?phone=' + phone);
    };
    PatientService.GetPatientsByName = function (name) {
        return $http.get('/Patient/GetPatientsByName?name=' + name);
    };
    return PatientService;
}]);
