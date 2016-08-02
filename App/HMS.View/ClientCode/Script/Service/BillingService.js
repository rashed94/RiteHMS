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

    BillingService.UpdateRefundNote = function (PatientService) {

        return $http.post('/Billing/UpdateRefundNote', PatientService);

    };

    BillingService.SaveInvoice = function (invoice, patientServices) {
        if (invoice.Id == null) {
            invoice.PatientServices = patientServices;
            invoice.Refunds = null;
            invoice.InvoicePayments = null;
            invoice.Patient = null;
        } else
        {
            invoice.PatientServices = patientServices;
            invoice.Refunds = null;
            invoice.InvoicePayments = null;
            invoice.Patient = null;
        }
        return $http.post('/Billing/CreateInvoice', invoice);

        //$http.post(url, JSON.stringify({ issue: issueDetails, 
        //    lstMembersToNotify: arrMembersToNotifyNew 
        //});
    };

    BillingService.GetReceiptByPatientId=function(patientId, receiptId)
    {
        return $http.get('/Billing/GetReceiptByPatientId?patientId=' + patientId + "&receiptId=" + receiptId);
    }

    BillingService.SaveRecieptPayment=function(receipt)
    {
        return $http.post('/Billing/SaveRecieptPayment', receipt);
    }

    BillingService.SaveReciept = function (receipt, patientServices) {

        receipt.PatientServices = patientServices;
        return $http.post('/Billing/CreateReceipt', receipt);
    };

    BillingService.SavePayment = function (payment, invoicePaymentList, advancePayment, reconcileAmount) {

        advancePayment.InvoicePayments = null;
        return $http.post('/Billing/CreatePayment', { payment: payment, invoicePaymentList: invoicePaymentList, advancePayment: advancePayment, reconcileAmount: reconcileAmount });

    };

    BillingService.SaveAdvancePayment = function (payment) {

        return $http.post('/Billing/SaveAdvancePayment', payment);

    };
    

    BillingService.GetAdvancePayment = function (patientid) {

        return $http.get('/Billing/GetAdvancePayment?patientId=' + patientid);

    };


    BillingService.GetInvoicesByPatientId = function (patientid, invoicestatus, invoiceDateStart, invoiceDateEnd, invoiceId) {
        //return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + "&statusid=1" );
        return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + '&statusid=' + invoicestatus + '&DateStart=' + invoiceDateStart + '&DateEnd=' + invoiceDateEnd + '&invoiceId=' + invoiceId);
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
