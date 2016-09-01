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
    

    InventoryService.CreateRequisition = function (requisition) {

        return $http.post('/Inventory/CreateRequisition', requisition);
    };

    InventoryService.GetRequistionsWithoutItem = function (fromStoreId) {

        return $http.get('/Inventory/GetRequistionsWithoutItem?fromStoreId=' + fromStoreId);
    };

    InventoryService.GetRequistionsItems = function (requisitionId) {

        return $http.get('/Inventory/GetRequistionsItems?requisitionId=' + requisitionId);
    };

    InventoryService.GetRequistionsItemsWithoutInventory = function (requisitionId) {

        return $http.get('/Inventory/GetRequistionsItemsWithoutInventory?requisitionId=' + requisitionId);
    };


    InventoryService.UpdateRequisitionItem = function (requisitionItem) {

        return $http.post('/Inventory/UpdateRequisitionItem', requisitionItem);
    };

    InventoryService.UpdateRequisitionItemFromAdmin = function (requisitionItem) {

        return $http.post('/Inventory/UpdateRequisitionItemFromAdmin', requisitionItem);
    };
    

    InventoryService.GetAdminRequsition = function (toStoreId) {

        return $http.get('/Inventory/GetAdminRequsition?toStoreId=' + toStoreId);
    };


    InventoryService.UpdateRequisition = function (requisition) {

        return $http.post('/Inventory/UpdateRequisition', requisition);
    };
   
    


     
    return InventoryService;

}]);