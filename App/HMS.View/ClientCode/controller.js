'use strict';

function ContactController($scope, $routeParams, ContactService) {
    GetContacts();
    function GetContacts() {
        ContactService.GetContacts()
            .success(function (cts) {
                $scope.Contacts = cts;
                console.log($scope.Contacts);
            })
            .error(function (error) {
                $scope.status = 'Unable to load contact data: ' + error.message;
                console.log($scope.status);
            });
    }

    function GetContact(id) {
        ContactService.GetContact()
            .success(function (ct) {
                $scope.Contact = ct;
                console.log($scope.Contact);
            })
            .error(function (error) {
                $scope.status = 'Unable to load contact data: ' + error.message;
                console.log($scope.status);
            });
    }

    function SaveContact(ctc) {
        ContactService.SaveContact(ctc)
            .success(function (data) {
                console.log(data);
            })
            .error(function (error) {
                $scope.status = 'Unable to save contact data: ' + error.message;
                console.log($scope.status);
            });
    }
}
