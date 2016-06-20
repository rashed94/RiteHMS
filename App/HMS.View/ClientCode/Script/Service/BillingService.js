HmsApp.factory('BillingService', ['$http', function ($http) {
    var BillingService = {};

    BillingService.GetBillingItemByPatientId = function (patientid) {
        return $http.get('/Billing/GetBillingIemByPatientId?id=' + patientid);
    };

    BillingService.SaveInvoice = function (invoice, patientServices) {
        if (invoice.Id == null) {
            invoice.PatientServices = patientServices;
            invoice.Refunds = null;
            invoice.InvoicePayments = null;
            invoice.Patient = null;
        } else
        {
            invoice.PatientServices = null;
            invoice.Refunds = null;
            invoice.InvoicePayments = null;
            invoice.Patient = null;
        }
        return $http.post('/Billing/CreateInvoice', invoice);

        //$http.post(url, JSON.stringify({ issue: issueDetails, 
        //    lstMembersToNotify: arrMembersToNotifyNew 
        //});
    };

    BillingService.SavePayment = function (payment) {

        return $http.post('/Billing/CreatePayment', payment);

    };
    BillingService.GetInvoicesByPatientId = function (patientid, invoicestatus) {
        //return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + "&statusid=1" );
        return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + '&statusid=' + invoicestatus);
    };

    BillingService.GetTotalDebit = function (patientid) {

        return $http.get('/Billing/GetTotalDebit?patientId=' + patientid);

    };

    //BillingService.GetInvoices = function (patientid) {
       
    //    return $http.get('/Billing/GetInvoicesByPatientID?patientId=' + patientid);

    //}

    //Code Added by Zaber

    BillingService.deleteBillItem = function (billID) {

        return $http.post('/Billing/deleteBillItem', { billId: billID});

    };
    // Code Ended by Zaber

    return BillingService;
}]);
