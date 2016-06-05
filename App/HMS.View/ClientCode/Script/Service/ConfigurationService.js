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

    ConfigurationService.SaveServiceProvider = function ($scope, file) {
        var apiUrl = "/Configuration/SaveServiceProvider";

        if (!file) {
            file = null;
        }

        file.upload = Upload.upload({
            url: apiUrl,
            data: { serviceProvider: $scope.ServiceProvider, file: file },
        }).then(function (response) {
            $scope.ServiceProvider = response.data;
            $scope.ServiceProviders.push($scope.ServiceProvider);
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
    };

    return ConfigurationService;
}]);