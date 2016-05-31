HmsApp.factory('BillingService', ['$http', function ($http) {
    var BillingService = {};

    BillingService.GetBillingItemByPatientId = function (patientid) {
        return $http.get('/Billing/GetBillingIemByPatientId?id=' + patientid);
    };

    BillingService.SaveInvoice = function (invoice, patientServices) {
        invoice.PatientServices = patientServices;
        return $http.post('/Billing/CreateInvoice', invoice);

        //$http.post(url, JSON.stringify({ issue: issueDetails, 
        //    lstMembersToNotify: arrMembersToNotifyNew 
        //});
    };

    BillingService.SavePayment = function (payment) {

        return $http.post('/Billing/CreatePayment', payment);

    };
    BillingService.GetInvoicesByPatientId = function (patientid) {
        return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid);
    };

    //BillingService.GetInvoices = function (patientid) {
       
    //    return $http.get('/Billing/GetInvoicesByPatientID?patientId=' + patientid);

    //}    

    return BillingService;
}]);
