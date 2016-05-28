'use strict';

HmsApp.controller("UserController", function ($scope, $routeParams, UserService) {
    $scope.GetLoggedInUser = function () {
        UserService.GetLoggedInUser()
            .success(function (user) {
                $scope.User = user;
                console.log($scope.User);
            })
            .error(function (error) {
                $scope.status = 'Unable to load User data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.GetLoggedInUser();
});
