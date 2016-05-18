'use strict';

// App Module: the name HMS matches the ng-app attribute in the main <html> tag
// the route provides parses the URL and injects the appropriate partial page
var HmsApp = angular.module('HMS', ['ngRoute', 'ui.bootstrap']).
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
        when('/billing', {
            templateUrl: '/ClientCode/Template/Billing.html',
            controller: 'BillingController'
        }).
        when('/billing/:tab', {
            templateUrl: '/ClientCode/Template/Billing.html',
            controller: 'BillingController'
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