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

    InventoryService.GetStores = function (storeType) {

        return $http.get('/Inventory/GetStores?storeType='+ storeType );
    };
    InventoryService.GetStoreById = function (storeId) {

        return $http.get('/Inventory/GetStoreById?storeId=' + storeId);
    };

    InventoryService.GetParentStore = function (StoreTypeId) {

        return $http.get('/Inventory/GetParentStore?StoreTypeId=' + StoreTypeId);
    };

    InventoryService.GetInventoryByItem = function (itemId, storeId) {

        return $http.get('/Inventory/GetInventoryByItem?itemId=' + itemId + '&storeId=' + storeId);
    };

    InventoryService.GetInventories = function (storeId) {

        return $http.get('/Inventory/GetInventories?storeId=' + storeId);
    };

    InventoryService.GetShelf = function (storeId) {

        return $http.get('/Inventory/GetShelf?storeId=' + storeId);
    };

    InventoryService.GetBin = function (shelfId) {

        return $http.get('/Inventory/GetBin?shelfId=' + shelfId);
    };

    InventoryService.CreateSelf = function (shelf) {

        return $http.post('/Inventory/CreateSelf', shelf);
    };
    InventoryService.CreateBin = function (bin) {

        return $http.post('/Inventory/CreateBin', bin);
    };
    InventoryService.CreateInventory = function (inventory) {

        return $http.post('/Inventory/CreateInventory', inventory);
    };
    InventoryService.CreateInventoryItem = function (inventoryItem) {

        return $http.post('/Inventory/CreateInventoryItem', inventoryItem);
    };

    InventoryService.GetInventoryItems = function (inventoryId) {

        return $http.get('/Inventory/GetInventoryItems?inventoryId=' + inventoryId);
    };
    
    InventoryService.GetReorderInventories = function (storeId) {

        return $http.get('/Inventory/GetReorderInventories?storeId=' + storeId);
    };
    
     
    return InventoryService;

}]);