HmsApp.factory('LabTestService', ['$http', function ($http) {

    var LabTestService = {};
    LabTestService.GetInvoicesByMedicalType = function (patientId, labStatus, medicalType,invoiceDateStart, invoiceDateEnd, invoiceId) {
        //return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + "&statusid=1" );
        return $http.get('/Item/GetPatientInvoicebyMedicalType?id=' + patientId + '&statusid=' + labStatus + "&medicalTypeID=" + medicalType + '&DateStart=' + invoiceDateStart + '&DateEnd=' + invoiceDateEnd + '&invoiceId=' + invoiceId);
    };

    

    LabTestService.LoadLabReport = function (labReportId) {

        return $http.get('/Item/LoadLabReport?labReportId=' + labReportId);
    };


    LabTestService.getDoctorWithReferrel = function (itemID) {

        return $http.get('/Item/getDoctorWithReferrel?itemID=' + itemID);
    };

    LabTestService.GetLabItemsByMedicalType = function (medicalType,ItemCategoryId) {
        //return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + "&statusid=1" );
        if (ItemCategoryId == 0) ItemCategoryId = null;
        return $http.get('/Item/GetLabItemsByMedicalType?medicalTypeID=' + medicalType + '&categoryId=' + ItemCategoryId);
    };

    LabTestService.loadItembyId = function (itemID) {
       
        return $http.get('/Item/loadItembyId?itemID=' + itemID);
    };

    LabTestService.loadLabTestCategories = function (medicalTypeID) {

        return $http.get('/Item/loadLabTestCategories?medicalTypeID=' + medicalTypeID);
    };

    LabTestService.loadMeasureMentUnits = function () {

        return $http.get('/Item/loadMeasureMentUnits');
    };

    LabTestService.loadLabTestGroups = function () {

        return $http.get('/Item/loadLabTestGroups');
    };

    LabTestService.LoadLabReportbyId = function (itemId) {

        return $http.get('/Item/LoadLabReportbyId?itemId=' + itemId);
    };

    
    
    LabTestService.CreateCategory = function (categoryName, medicalTypeID) {

      //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/CreateCategory', { categoryName: categoryName, medicalTypeId: medicalTypeID });

    };

    LabTestService.deleteCommission = function (referralId) {

        return $http.post('/Item/deleteCommission', { referralId: referralId });
    };
    //Add by zaber
    LabTestService.deleteLabTest = function (itemId) {

        return $http.post('/Item/deleteLabTest', { ItemId: itemId });
    };
    
    //zaber ended the code
   
    LabTestService.CreateReportGroup = function (reportGroupName) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/CreateReportGroup', { reportGroupName: reportGroupName });

    };

    LabTestService.CreateMeasurementUnit = function (measurementUnitName) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/CreateMeasurementUnit', { measurementUnitName: measurementUnitName });

    };

    

    LabTestService.UpdateLabItem = function (labtestInvoice) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/UpdateLabItem', { pinvoice: labtestInvoice });



    };
    LabTestService.UpdateLabStatus = function (PatientServiceItem, InvoiceStatusUpdate,InvoiceID) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/UpdateLabStatus', { PatientServiceItem: PatientServiceItem, InvoiceStatusUpdate: InvoiceStatusUpdate, InvoiceID: InvoiceID });

    };



    LabTestService.SaveItem = function (Item) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/SaveItem', Item);

    };


    LabTestService.saveDoctorsCommission = function (Referral) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/saveDoctorsCommission', Referral);

    };

    LabTestService.SaveLabReportTemplate = function (templateData) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/SaveLabReportTemplate', templateData);

    };

    LabTestService.DeleteReportFormat = function (labReportId) {

       
        return $http.post('/Item/DeleteReportFormat', { labReportId: labReportId });
    };
    


    return LabTestService;

}]);