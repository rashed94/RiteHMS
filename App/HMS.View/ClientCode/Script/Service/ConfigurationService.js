HmsApp.factory('ConfigurationService', ['$http', 'Upload', function ($http, Upload) {
    var ConfigurationService = {};
    ConfigurationService.GetServiceProviderTypes = function () {
        return $http.get('/Configuration/GetServiceProviderTypes');
    };
    ConfigurationService.GetServiceProvidersByType = function (type) {
        return $http.get('/Configuration/GetServiceProviderByType?type=' + type);
    };
    ConfigurationService.GetDepartments = function () {
        return $http.get('/Configuration/GetDepartments');
    };

    ConfigurationService.DeleteServiceProvider = function (id) {
        return $http.get('/Configuration/DeleteServiceProvider?id=' + id);
    };

    ConfigurationService.SaveServiceProvider = function ($scope, file) {
        var apiUrl = "/Configuration/SaveServiceProvider";

        if (!file) {
            file = {};
        }

        if ($scope.ServiceProvider.Contact.Id)
            $scope.ServiceProvider.ContactId = $scope.ServiceProvider.Contact.Id;
        if ($scope.ServiceProvider.Department.Id)
            $scope.ServiceProvider.DepartmentId = $scope.ServiceProvider.Department.Id;
        if ($scope.ServiceProvider.ServiceProviderType.Id)
            $scope.ServiceProvider.ServiceProviderTypeId = $scope.ServiceProvider.ServiceProviderType.Id;

     

   

           

            file.upload = Upload.upload({
                url: apiUrl,
                data: { serviceProvider: $scope.ServiceProvider, file: file },
            }).then(function (response) {
                $scope.ServiceProvider = response.data;
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
                else {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                   

                }
                return response.data;
            }, function (response) {

            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });

            



            return {data:file.upload}

        

        
    };

    ConfigurationService.GetDoctorsByDepartment = function (departmentId,serviceProviderType) {
        return $http.get('/Configuration/GetDoctorsByDepartment?departmentId=' + departmentId + "&serviceProviderType=" + serviceProviderType);
    };

    return ConfigurationService;
}]);