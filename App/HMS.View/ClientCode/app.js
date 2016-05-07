'use strict';

// App Module: the name HMS matches the ng-app attribute in the main <html> tag
// the route provides parses the URL and injects the appropriate partial page
var HmsApp = angular.module('HMS', []).
  config(['$routeProvider', function ($routeProvider) {
      $routeProvider.
          when('/contact/:id', {
              templateUrl: '/ClientCode/html/EditContact.html',
              controller: ContactController
          }).
          when('/contact', {
              templateUrl: '/ClientCode/html/Contact.htm',
              controller: ContactController
          }).
          otherwise({
              redirectTo: '/contact'
          });
  }]);