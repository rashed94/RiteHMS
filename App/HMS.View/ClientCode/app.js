'use strict';

// App Module: the name HMS matches the ng-app attribute in the main <html> tag
// the route provides parses the URL and injects the appropriate partial page
var HmsApp = angular.module('HMS', []).
  config(['$routeProvider', function ($routeProvider) {
      $routeProvider.
          //when('/store', {
          //    templateUrl: '/ClientCode/html/store.htm',
          //    controller: storeController
          //}).
          when('/contact/:id', {
              templateUrl: '/ClientCode/html/editContact.html',
              controller: ContactController
          }).
          //when('/cart', {
          //    templateUrl: '/ClientCode/html/shoppingCart.htm',
          //    controller: storeController
          //}).
          when('/contact', {
              templateUrl: '/ClientCode/html/contact.htm',
              controller: ContactController
          }).
          otherwise({
              redirectTo: '/contact'
          });
  }]);

HmsApp.factory('ContactService', ['$http', function ($http) {
    var ContactService = {};
    ContactService.GetContacts = function () {
        return $http.get('/Contact/GetContacts');
    };
    ContactService.SaveContact = function (contact) {
        return $http.get('/Contact/SaveContact');
    };
    ContactService.GetContact = function (id) {
        return $http.get('/Contact/GetContactById?id=' + id);
    };
    return ContactService;
}]);
