HmsApp.factory('BedSetupService', ['$http', function ($http) {
    var BedSetupService = {};
    

    BedSetupService.GetItemsByMedicalType = function (medicalType) {
        //return $http.get('/Billing/GetInvoicesByPatientId?id=' + patientid + "&statusid=1" );
        return $http.get('/Item/GetItemsByMedicalType?medicalTypeID=' + medicalType);
    };
    BedSetupService.GetItemsByMedicalType = function (medicalTypeID, categoryId) {

        return $http.get('/Item/GetLabItemsByMedicalTypeAndCategory?medicalTypeID=' + medicalTypeID + "&categoryId=" + categoryId);
    };

    BedSetupService.loadItembyId = function (itemID) {

        return $http.get('/Item/loadItembyId?itemID=' + itemID);
    };

    BedSetupService.loadLabTestCategories = function (medicalTypeID) {

        return $http.get('/Item/loadLabTestCategories?medicalTypeID=' + medicalTypeID);
    };


    BedSetupService.CreateCategory = function (categoryName, medicalTypeID) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/CreateCategory', { categoryName: categoryName, medicalTypeId: medicalTypeID });

    };

    
    //Add by zaber
    BedSetupService.deleteBed = function (beditem) {

        return $http.post('/Item/deleteBed', { beditem: beditem });
    };

    BedSetupService.emptyBed = function (bedOccupancyItem) {

        return $http.post('/Item/emptyBed', { bedOccupancyItem: bedOccupancyItem });
    };

    //zaber ended the code

    
    BedSetupService.SaveItem = function (Item) {

        //  return $http.post('/LabTest/CreateCategory', categoryName, medicalTypeID);

        return $http.post('/Item/SaveItem', Item);

    };


    BedSetupService.SavePatientServiceItem = function (templateData) {


        return $http.post('/Item/CreatePatientService', templateData);
    };

    BedSetupService.SaveBedOccupancy = function (templateData) {


        return $http.post('/Item/CreateBedOccupancy', templateData);
    };

    BedSetupService.loadBedOccupancyByItemId = function (PatientId) {


        return $http.get('/Item/LoadBedOccupancybyId?PatientId=' + PatientId);
    };



    return BedSetupService;

}]);