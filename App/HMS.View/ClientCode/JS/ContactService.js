HmsApp.factory('ContactService', ['$http', function ($http) {
    var ContactService = {};
    ContactService.GetContacts = function () {
        return $http.get('/Contact/GetContacts');
    };
    ContactService.SaveContact = function (contact) {
        //return $http.post('/Contact/UpdateContact', contact);
        return $http({
            url: "/Contact/UploadImage",
            method: "POST",
            headers: { "Content-Type": undefined },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("Image", data.Photo);
                formData.append("Id", data.Id);
                return formData;
            },
            data: contact,
            progress: function (evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }
        })
        .success(function (response) {
            console.log('Upload finished');
            $http.post('/Contact/UpdateContact?filePath=' + response.FileName, contact);
        });
    };
    ContactService.GetContact = function (id) {
        return $http.get('/Contact/GetContactById?id=' + id);
    };
    return ContactService;
}]);
