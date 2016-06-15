HmsApp.factory('LabTestService', ['$http', function ($http) {

    var LabTestService = {};
    LabTestService.GetInvoicesByMedicalType = function (patientId, labStatus, medicalType) {
        //return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + "&statusid=1" );
        return $http.get('/Item/GetPatientInvoicebyMedicalType?id=' + patientId + '&statusid=' + labStatus + "&medicalTypeID=" + medicalType);
    };


    LabTestService.getDoctorWithReferrel = function (itemID) {

        return $http.get('/Item/getDoctorWithReferrel?itemID=' + itemID);
    };

    LabTestService.GetLabItemsByMedicalType = function (medicalType) {
        //return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + "&statusid=1" );
        return $http.get('/Item/GetLabItemsByMedicalType?medicalTypeID=' + medicalType);
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

    
    LabTestService.CreateCategory = function (categoryName, medicalTypeID) {

      //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/CreateCategory', { categoryName: categoryName, medicalTypeId: medicalTypeID });

    };

    LabTestService.deleteCommission = function (referralId) {

        return $http.post('/Item/deleteCommission', { referralId: referralId });
    };
   
    LabTestService.CreateReportGroup = function (reportGroupName) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/CreateReportGroup', { reportGroupName: reportGroupName });

    };

    LabTestService.CreateMeasurementUnit = function (measurementUnitName) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/CreateMeasurementUnit', { measurementUnitName: measurementUnitName });

    };

    LabTestService.SaveItem = function (Item) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/SaveItem', Item);

    };


    LabTestService.saveDoctorsCommission = function (Referral) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/saveDoctorsCommission', Referral);

    };




    return LabTestService;

}]);