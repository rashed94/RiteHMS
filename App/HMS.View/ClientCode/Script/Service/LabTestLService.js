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

    return LabTestService;

}]);