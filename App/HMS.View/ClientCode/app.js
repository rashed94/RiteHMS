'use strict';

// App Module: the name HMS matches the ng-app attribute in the main <html> tag
// the route provides parses the URL and injects the appropriate partial page
var HmsApp = angular.module('HMS', ['ngRoute', 'ui.bootstrap', 'ngFileUpload']).
  config(['$routeProvider', function ($routeProvider) {
      $routeProvider.
        when('/patient', {
            templateUrl: '/ClientCode/Template/PatientInfo.html',
        }).
        when('/patientResistration', {
            templateUrl: '/ClientCode/Template/EditPatient.html',
        }).
        when('/patientResistration/:id', {
            templateUrl: '/ClientCode/Template/EditPatient.html',
        }).
        when('/bedsetup', {
            templateUrl: '/ClientCode/Template/BedSetup.html',

                  }).
        when('/bedsetup/:tab', {
            templateUrl: '/ClientCode/Template/BedSetup.html',

        }).

        when('/pharmacy', {
            templateUrl: '/ClientCode/Template/Pharmacy.html',

        }).
        when('/pharmacy/:tab', {
            templateUrl: '/ClientCode/Template/Pharmacy.html',

        }).

        when('/billing', {
            templateUrl: '/ClientCode/Template/Billing.html',

        }).
        when('/billing/:tab', {
            templateUrl: '/ClientCode/Template/Billing.html',

        }).
        when('/appointment', {
            templateUrl: '/ClientCode/Template/Appointment.html',

        }).
        when('/labtest', {
            templateUrl: '/ClientCode/Template/LabTest.html',

        }).
        when('/labtest/:tab', {
            templateUrl: '/ClientCode/Template/LabTest.html',

        }).

        when('/configuration', {
            templateUrl: '/ClientCode/Template/Configuration.html',

        }).
        when('/configuration/:tab', {
            templateUrl: '/ClientCode/Template/Configuration.html',

        }).
        when('/contact/:id', {
            templateUrl: '/ClientCode/Template/EditContact.html',
            controller: 'ContactController'
        }).
        when('/contact', {
            templateUrl: '/ClientCode/Template/Contact.html',
            controller: 'ContactController'
        }).
        otherwise({
            redirectTo: '/patient'
        });
  }]);

HmsApp.factory("States", function () {
    var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

    return states;

});

// setup controller and pass data source
HmsApp.controller("TypeaheadCtrl", function ($scope, States) {

    $scope.selected = undefined;

    $scope.states = States;

});

HmsApp.run(['$route', function ($route) {
    $route.reload();
}]);