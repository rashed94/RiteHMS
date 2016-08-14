HmsApp.factory('ItemService', ['$http', function ($http) {

    var ItemService = {};
    ItemService.GetInvoicesByMedicalType = function (patientId, labStatus, medicalType) {
        //return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + "&statusid=1" );
        return $http.get('/Item/GetPatientInvoicebyMedicalType?id=' + patientId + '&statusid=' + labStatus + "&medicalTypeID=" + medicalType);
    };



    ItemService.LoadLabReport = function (labReportId) {

        return $http.get('/Item/LoadLabReport?labReportId=' + labReportId);
    };


    ItemService.getDoctorWithReferrel = function (itemID) {

        return $http.get('/Item/getDoctorWithReferrel?itemID=' + itemID);
    };

    ItemService.GetItemsByMedicalType = function (medicalType, ItemCategoryId) {
        //return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + "&statusid=1" );
        if (ItemCategoryId == 0) ItemCategoryId = null;
        return $http.get('/Item/GetLabItemsByMedicalType?medicalTypeID=' +medicalType+ '&categoryId=' + ItemCategoryId);
    };

    ItemService.GetOtherServices = function (medicalType) {
        //return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + "&statusid=1" );
       
        return $http.get('/Item/GetOtherServices?medicalTypeID=' + medicalType);
    };


    ItemService.LoadTreatmentItems = function (medicalType) {
        //return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + "&statusid=1" );

        return $http.get('/Item/LoadTreatmentItems?medicalTypeID=' + medicalType);
    };


    ItemService.loadItembyId = function (itemID) {

        return $http.get('/Item/loadItembyId?itemID=' + itemID);
    };

    ItemService.loadTestCategories = function (medicalTypeID) {

        return $http.get('/Item/loadTestCategories?medicalTypeID=' + medicalTypeID);
    };

    ItemService.loadMeasureMentUnits = function () {

        return $http.get('/Item/loadMeasureMentUnits');
    };

    ItemService.loadTestGroups = function () {

        return $http.get('/Item/loadLabTestGroups');
    };

    ItemService.LoadReportbyId = function (itemId) {

        return $http.get('/Item/LoadReportbyId?itemId=' + itemId);
    };


    ItemService.GetRefundedItem = function () {

        return $http.get('/Item/GetRefundedItem');
    };

    ItemService.approveRefund = function (patientservice) {

        return $http.post('/Item/approveRefund', patientservice);
    };




    ItemService.CreateCategory = function (categoryName, medicalTypeID) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/CreateCategory', { categoryName: categoryName, medicalTypeId: medicalTypeID });

    };

    ItemService.deleteCommission = function (referralId) {

        return $http.post('/Item/deleteCommission', { referralId: referralId });
    };
    //Add by zaber
    ItemService.deleteItem = function (itemId) {

        return $http.post('/Item/deleteItem', { ItemId: itemId });
    };

    ItemService.DeleteOtherService = function (item, InitialSetupItem) {

        return $http.post('/Item/DeleteOtherService', { item: item,iniItem:InitialSetupItem});
    };

    

    //zaber ended the code

    ItemService.CreateReportGroup = function (reportGroupName) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/CreateReportGroup', { reportGroupName: reportGroupName });

    };

    ItemService.CreateMeasurementUnit = function (measurementUnitName) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/CreateMeasurementUnit', { measurementUnitName: measurementUnitName });

    };


    ItemService.UpdateLabStatus = function (PatientServiceItem, InvoiceStatusUpdate, InvoiceID) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/UpdateLabStatus', { PatientServiceItem: PatientServiceItem, InvoiceStatusUpdate: InvoiceStatusUpdate, InvoiceID: InvoiceID });

    };


    

    ItemService.SaveInititalSetupItem = function (initialSetupItem) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/SaveInititalSetupItem', initialSetupItem);

    };
    



    ItemService.SaveItem = function (Item) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/SaveItem', Item);

    };


    ItemService.saveDoctorsCommission = function (Referral) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/saveDoctorsCommission', Referral);

    };

    ItemService.SaveLabReportTemplate = function (templateData) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/SaveLabReportTemplate', templateData);

    };

    ItemService.DeleteReportFormat = function (labReportId) {


        return $http.post('/Item/DeleteReportFormat', { labReportId: labReportId });
    };

    ItemService.cancelRefund = function (patientService) {


        return $http.post('/Item/cancelRefund', patientService);
    };




    return ItemService;

}]);