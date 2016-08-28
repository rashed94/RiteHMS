HmsApp.factory('InventoryService', ['$http', function ($http) {

    var InventoryService = {};



    InventoryService.GetStoreType = function () {

        return $http.get('/Inventory/GetStoreType');
    };

    InventoryService.SaveStore = function (store) {

        return $http.post('/Inventory/SaveStore',store);
    };

    InventoryService.SaveLineManager = function (lineManager) {

        return $http.post('/Inventory/SaveLineManager', lineManager);
    };

    InventoryService.DeleteLineManager = function (lineManager) {

        return $http.post('/Inventory/DeleteLineManager', lineManager);
    };

    InventoryService.GetStores = function () {

        return $http.get('/Inventory/GetStores');
    };
    InventoryService.GetStoreById = function (storeId) {

        return $http.get('/Inventory/GetStoreById?storeId=' + storeId);
    };

    InventoryService.GetParentStore = function (StoreTypeId) {

        return $http.get('/Inventory/GetParentStore?StoreTypeId=' + StoreTypeId);
    };
    
    
    
    return InventoryService;

}]);