HmsApp.factory('AddItemService', ['$http', function ($http) {
    var AddItemService = {};
   
    AddItemService.GetMedicalType = function () {
        return $http.get('/Patient/GetMedicalType');
    };
    return AddItemService;
}]);