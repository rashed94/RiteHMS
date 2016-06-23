HmsApp.factory('BedSetupService', ['$http', function ($http) {
    var BedSetupService = {};
    BedSetupService.GetInvoicesByMedicalType = function (patientId, labStatus, medicalType) {
        //return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + "&statusid=1" );
        return $http.get('/Item/GetPatientInvoicebyMedicalType?id=' + patientId + '&statusid=' + labStatus + "&medicalTypeID=" + medicalType);
    };



    BedSetupService.LoadLabReport = function (labReportId) {

        return $http.get('/Item/LoadLabReport?labReportId=' + labReportId);
    };


    BedSetupService.getDoctorWithReferrel = function (itemID) {

        return $http.get('/Item/getDoctorWithReferrel?itemID=' + itemID);
    };

    BedSetupService.GetLabItemsByMedicalType = function (medicalType) {
        //return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + "&statusid=1" );
        return $http.get('/Item/GetLabItemsByMedicalType?medicalTypeID=' + medicalType);
    };

    BedSetupService.loadItembyId = function (itemID) {

        return $http.get('/Item/loadItembyId?itemID=' + itemID);
    };

    BedSetupService.loadLabTestCategories = function (medicalTypeID) {

        return $http.get('/Item/loadLabTestCategories?medicalTypeID=' + medicalTypeID);
    };

    BedSetupService.loadMeasureMentUnits = function () {

        return $http.get('/Item/loadMeasureMentUnits');
    };

    BedSetupService.loadLabTestGroups = function () {

        return $http.get('/Item/loadLabTestGroups');
    };

    BedSetupService.LoadLabReportbyId = function (itemId) {

        return $http.get('/Item/LoadLabReportbyId?itemId=' + itemId);
    };



    BedSetupService.CreateCategory = function (categoryName, medicalTypeID) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/CreateCategory', { categoryName: categoryName, medicalTypeId: medicalTypeID });

    };

    BedSetupService.deleteCommission = function (referralId) {

        return $http.post('/Item/deleteCommission', { referralId: referralId });
    };
    //Add by zaber
    BedSetupService.deleteLabTest = function (labitemId) {

        return $http.post('/Item/deleteLabTest', { labitemId: labitemId });
    };

    //zaber ended the code

    BedSetupService.CreateReportGroup = function (reportGroupName) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/CreateReportGroup', { reportGroupName: reportGroupName });

    };

    BedSetupService.CreateMeasurementUnit = function (measurementUnitName) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/CreateMeasurementUnit', { measurementUnitName: measurementUnitName });

    };


    BedSetupService.UpdateLabStatus = function (PatientServiceItem, InvoiceStatusUpdate, InvoiceID) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/UpdateLabStatus', { PatientServiceItem: PatientServiceItem, InvoiceStatusUpdate: InvoiceStatusUpdate, InvoiceID: InvoiceID });

    };



    BedSetupService.SaveItem = function (Item) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/SaveItem', Item);

    };


    BedSetupService.saveDoctorsCommission = function (Referral) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/saveDoctorsCommission', Referral);

    };

    BedSetupService.SaveLabReportTemplate = function (templateData) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/SaveLabReportTemplate', templateData);

    };

    BedSetupService.DeleteReportFormat = function (labReportId) {


        return $http.post('/Item/DeleteReportFormat', { labReportId: labReportId });
    };

    BedSetupService.SavePatientServiceItem = function (templateData) {


        return $http.post('/Item/CreatePatientService', templateData);
    };

    BedSetupService.SaveBedOccupancy = function (templateData) {


        return $http.post('/Item/CreateBedOccupancy', templateData);
    };



    return BedSetupService;

}]);