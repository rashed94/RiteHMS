HmsApp.factory('PatientService', ['$http', function ($http) {
    var PatientService = {};
    PatientService.GetPatients = function () {
        return $http.get('/Patient/GetPatients');
    };
    PatientService.SavePatient = function (patient) {
        //return $http.post('/Patient/CreatePatient', patient);
        return $http({
            url: "/Contact/UploadImage",
            method: "POST",
            headers: { "Content-Type": undefined },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("Image", data.Photo);
                formData.append("Id", data.Id);
                return formData;
            },
            data: patient,
            progress: function (evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }
        })
        .success(function (response) {
            console.log('Upload finished');
            $http.post('/Patient/CreatePatient?filePath=' + response.FileName, contact);
        });
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
