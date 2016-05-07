'use strict';

function ContactController($scope, $routeParams, ContactService) {
    $scope.GetContacts = function() {
        ContactService.GetContacts()
            .success(function (cts) {
                $scope.Contacts = cts;
                //console.log($scope.Contacts);
            })
            .error(function (error) {
                $scope.status = 'Unable to load contact data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.GetContact = function(id) {
        ContactService.GetContact(id)
            .success(function (ct) {
                $scope.Contact = ct;
                console.log($scope.Contact);
            })
            .error(function (error) {
                $scope.status = 'Unable to load contact data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.SaveContact = function() {
        ContactService.SaveContact($scope.Contact)
            .success(function (data) {
                console.log(data);
            })
            .error(function (error) {
                $scope.status = 'Unable to save contact data: ' + error.message;
                console.log($scope.status);
            });
    }

    if ($routeParams.id != null) {
        $scope.GetContact($routeParams.id);
    }
    else {
        $scope.GetContacts();
    }
}
