HmsApp.factory('ContactService', ['$http', function ($http) {
    var ContactService = {};
    ContactService.GetContacts = function () {
        return $http.get('/Contact/GetContacts');
    };
    ContactService.SaveContact = function (contact) {
        return $http.post('/Contact/UpdateContact', contact);
    };
    ContactService.GetContact = function (id) {
        return $http.get('/Contact/GetContactById?id=' + id);
    };
    return ContactService;
}]);
