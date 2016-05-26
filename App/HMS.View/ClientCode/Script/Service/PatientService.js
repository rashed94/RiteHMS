HmsApp.factory('PatientService', ['$http', 'Upload', '$timeout', function ($http, Upload, $timeout) {
    var PatientService = {};
    PatientService.GetPatients = function () {
        return $http.get('/Patient/GetPatients');
    };
    PatientService.SavePatient = function ($scope, file) {
        var apiUrl = "/Patient/CreatePatient";
        if ($scope.Patient && $scope.Patient.Id) {
            apiUrl = "/Patient/UpdatePatient";
        }

        file.upload = Upload.upload({
            url: apiUrl,
            data: { patient: $scope.Patient, file: file },
        }).then(function (response) {
            $scope.Patient = response.data;
            if ($scope.Patient.DOB != null) {
                $scope.AgeCalculate();
            }
            console.log('Error status: ' + resp.status);
            if (response.status > 0) {
                $scope.errorMsg = response.status + ': ' + response.data;
            }
            else {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }
        }, function (response) {

        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });

        //return $http.post('/Patient/CreatePatient', patient);
    };
    PatientService.UploadPhoto = function (patient) {
        return $http({
            url: "/Patient/UploadImage",
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
           // $http.post('/Patient/CreatePatient?filePath=' + response.FileName, patient);
        });
    }
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
