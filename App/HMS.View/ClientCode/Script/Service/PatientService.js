HmsApp.factory('PatientService', ['$http', function ($http) {
    var PatientService = {};
    PatientService.GetPatients = function () {
        return $http.get('/Patient/GetPatients');
    };
    PatientService.SavePatient = function (patient) {
        return $http.post('/Patient/CreatePatient', patient);
    };
    PatientService.GetPatientById = function (id) {
        return $http.get('/Patient/GetPatientById?id=' + id);
    };
    PatientService.GetPatientByPhone = function (phone) {
        return $http.get('/Patient/GetPatientByPhone?phoneNumber=' + phone);
    };
    PatientService.GetPatientsByName = function (name) {
        return $http.get('/Patient/GetPatientsByName?name=' + name);
    };
    PatientService.SearchPatientsByPartialName = function (name) {
        return $http.get('/Patient/SearchPatientByPartialName?name=' + name);
    };
    return PatientService;
}]);
