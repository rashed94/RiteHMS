HmsApp.factory('BillingService', ['$http', function ($http) {
    var BillingService = {};

    BillingService.GetBillingItemByPatientId = function (patientid) {
        return $http.get('/Billing/GetBillingIemByPatientId?id=' + patientid);
    };

    BillingService.UpdateInvoice = function (invoice) {

       updateInvoice= angular.copy(invoice);
       
       angular.forEach(updateInvoice.PatientServices, function (obj) {
           obj.DeliveryDate = ToJavaScriptDate(obj.DeliveryDate);
           obj.ServiceDate = ToJavaScriptDate(obj.ServiceDate);
            obj.Item = null;

        });

       updateInvoice.Refunds = null;
       updateInvoice.InvoicePayments = null;
       updateInvoice.Patient = null;
        return $http.post('/Billing/UpdateInvoice', updateInvoice);

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
    BillingService.GetInvoicesByPatientId = function (patientid, invoicestatus, invoiceDateStart, invoiceDateEnd) {
        //return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + "&statusid=1" );
        return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + '&statusid=' + invoicestatus + '&DateStart=' + invoiceDateStart + '&DateEnd=' + invoiceDateEnd);
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
