HmsApp.factory('ConfigurationService', ['$http', function ($http) {
    var ConfigurationService = {};
    ConfigurationService.GetServiceProviderTypes = function () {
        return $http.get('/Configuration/GetServiceProviderTypes');
    };
    ConfigurationService.GetServiceProvidersByType = function (type) {
        return $http.get('/Configuration/GetServiceProviderByType?type=' + type);
    }

    return ConfigurationService;
}]);