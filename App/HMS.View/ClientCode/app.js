'use strict';

// App Module: the name HMS matches the ng-app attribute in the main <html> tag
// the route provides parses the URL and injects the appropriate partial page
var HmsApp = angular.module('HMS', ['ngRoute', 'ui.bootstrap']).
  config(['$routeProvider', function ($routeProvider) {
      $routeProvider.
        when('/patient', {
            templateUrl: '/ClientCode/Template/PatientInfo.html',
            controller: PatientController
        }).
        when('/patientResistration', {
            templateUrl: '/ClientCode/Template/EditPatient.html',
            controller: PatientController
        }).
        when('/patientResistration/:id', {
            templateUrl: '/ClientCode/Template/EditPatient.html',
            controller: PatientController
        }).
        when('/billing', {
            templateUrl: '/ClientCode/Template/Billing.html',
            controller: BillingController
        }).
        when('/billing/:tab', {
            templateUrl: '/ClientCode/Template/Billing.html',
            controller: BillingController
        }).
        when('/contact/:id', {
            templateUrl: '/ClientCode/Template/EditContact.html',
            controller: ContactController
        }).
        when('/contact', {
            templateUrl: '/ClientCode/Template/Contact.html',
            controller: ContactController
        }).
        otherwise({
            redirectTo: '/patient'
        });
  }]);