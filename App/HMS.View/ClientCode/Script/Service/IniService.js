HmsApp.factory('IniService', ['$http', function ($http) {

    var IniService = {};

    IniService.GetConfiguration = function () {
        return $http.get('Configuration.json');
    };
    return IniService;
}]);
