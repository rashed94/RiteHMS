HmsApp.factory('BillingService', ['$http', function ($http) {
    var BillingService = {};

    BillingService.GetBillingItemByPatientId = function (patientid) {
        return $http.get('/Billing/GetBillingIemByPatientId?id=' + patientid);
    };

    BillingService.SaveInvoice = function (invoice) {
        return $http.post('/Billing/CreateInvoice', patientInvoice);
    }

    return BillingService;
}]);
