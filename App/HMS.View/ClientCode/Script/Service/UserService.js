HmsApp.factory('UserService', ['$http', function ($http) {
    var UserService = {};
    UserService.GetLoggedInUser = function () {
        return $http.get('/Login/GetLoggedinUser');
    };
    return UserService;
}]);
