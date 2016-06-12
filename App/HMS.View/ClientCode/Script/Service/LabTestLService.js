HmsApp.factory('LabTestService', ['$http', function ($http) {

    var LabTestService = {};
    LabTestService.GetInvoicesByMedicalType = function (patientId, labStatus, medicalType) {
        //return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + "&statusid=1" );
        return $http.get('/LabTest/GetPatientInvoicebyMedicalType?id=' + patientId + '&statusid=' + labStatus + "&medicalTypeID=" + medicalType);
    };


    LabTestService.GetLabItemsByMedicalType = function (medicalType) {
        //return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + "&statusid=1" );
        return $http.get('/LabTest/GetLabItemsByMedicalType?medicalTypeID=' + medicalType);
    };

    LabTestService.loadItembyId = function (itemID) {
       
        return $http.get('/LabTest/loadItembyId?itemID=' + itemID);
    };

    LabTestService.loadLabTestCategories = function (medicalTypeID) {

        return $http.get('/LabTest/loadLabTestCategories?medicalTypeID=' +medicalTypeID);
    };

    LabTestService.loadMeasureMentUnits = function () {

        return $http.get('/LabTest/loadMeasureMentUnits');
    };

    LabTestService.loadLabTestGroups = function () {

        return $http.get('/LabTest/loadLabTestGroups');
    };

    



    return LabTestService;

}]);