HmsApp.factory('UserService', ['$http', function ($http) {
    var UserService = {};
    UserService.GetLoggedinUser = function () {
        return $http.get('/Login/GetLoggedinUser');
    };
    return UserService;
}]);
