
angular.module('HMS', ['ngAnimate', 'ui.bootstrap']);
angular.module('HMS').controller('TypeaheadCtrl', function ($scope, $http) {

    var _selected;

    $scope.selected = undefined;

    // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function (val) {
        return $http.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false
            }
        }).then(function (response) {
            return response.data.results.map(function (item) {
                return item.formatted_address;
            });
        });
    };

});