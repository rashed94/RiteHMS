'use strict';

// App Module: the name HMS matches the ng-app attribute in the main <html> tag
// the route provides parses the URL and injects the appropriate partial page
var HmsApp = angular.module('HMS', ['ngRoute', 'ui.bootstrap']).
  config(['$routeProvider', function ($routeProvider) {
      $routeProvider.
        when('/patient', {
            templateUrl: '/ClientCode/html/PatientInfo.html',
            controller: PatientController
        }).
        when('/patientResistration', {
            templateUrl: '/ClientCode/html/EditPatient.html',
            controller: PatientController
        }).
        when('/patientResistration/:id', {
            templateUrl: '/ClientCode/html/EditPatient.html',
            controller: PatientController
        }).
        when('/billing', {
            templateUrl: '/ClientCode/html/Billing.html',
            controller: BillingController
        }).
        when('/billing/:tab', {
            templateUrl: '/ClientCode/html/Billing.html',
            controller: BillingController
        }).
        when('/contact/:id', {
            templateUrl: '/ClientCode/html/EditContact.html',
            controller: ContactController
        }).
        when('/contact', {
            templateUrl: '/ClientCode/html/Contact.html',
            controller: ContactController
        }).
        otherwise({
            redirectTo: '/patient'
        });
  }]);