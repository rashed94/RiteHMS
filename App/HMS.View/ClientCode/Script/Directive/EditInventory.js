'use strict';
angular.module('HMS').directive('inventory', function () {
    return {
        templateUrl: "ClientCode/Template/EditInventory.html",
        restrict: "E",
        scope: {
            storeType: '@'
        },

        controller: function ($scope, $routeParams, $http, $route, $modal, InventoryService, IniService) {

            $scope.StoreList = [];
            $scope.filterCondition = {
                StoreId: ""
            }

            $scope.Inventories = [];
            $scope.SelectedInventoryItem = {};
            $scope.SelectedInventory = {};
            $scope.inventoryItemIndex = "";


           var prepareInventoryDataModel= function()
            {
               angular.forEach($scope.Inventories, function (obj) {

                   obj.ActivePosition = false;
                   obj.InventoryItems = [];
                   obj.LastModifiedDate = ToJavaScriptDate(obj.LastModifiedDate);
              

                });
           }

           var prepareInventoryDataModelForInventoryItem = function (inventoryItems) {
               angular.forEach(inventoryItems, function (obj) {

                   obj.ExpiryDate = ToJavaScriptDate(obj.ExpiryDate);
                   obj.ModifiedDate = ToJavaScriptDate(obj.ModifiedDate);


               });
           }


           $scope.StockModal = function (size, isEdit, singleItem) {

               var storeId = $scope.filterCondition.StoreId;
               var storeType = $scope.StoreType;
               var modalInstance = $modal.open({
                   templateUrl: '/ClientCode/Template/AddStock.html',
                   size: size,
                   controller: 'StockModelController',
                   scope: $scope,
                   resolve:
                             {
                                 singleItem: function () {
                                     return singleItem;
                                 },
                                 storeId: function () {

                                     return storeId;
                                 },
                                 storeType: function () {
                                     return storeType
                                 }
                             }
               });
               modalInstance.result.then(function (result) {

               }, function () {

                   console.log('Modal dismissed at: ' + new Date());
                   $scope.GetInventories();

               });


           };

           $scope.dateInit=function()
           {
               
                   $('.expireDate').datepicker({
                       format: "yyyy-mm-dd",
                       startView: "day",
                       minViewMode: "day"
                   }).on('changeDate', function (ev) {
                       $(this).blur();
                       $(this).datepicker('hide');
                   });
               
           }

           $scope.GetTemplate = function (inventoryItem)
           {
              
               if (inventoryItem.Id === $scope.SelectedInventoryItem.Id) return 'edit';
               else return 'display';
           }
           $scope.EditInventoryItem = function (inventory,inventoryItem,index)
           {
               if ($scope.SelectedInventoryItem.Id != null)
               {
                   inventory.InventoryItems[$scope.inventoryItemIndex].Quantity = $scope.SelectedInventoryItem.Quantity;
                   inventory.InventoryItems[$scope.inventoryItemIndex].BuyPrice = $scope.SelectedInventoryItem.BuyPrice;
                   inventory.InventoryItems[$scope.inventoryItemIndex].ExpiryDate = $scope.SelectedInventoryItem.ExpiryDate;
               }

               $scope.SelectedInventoryItem = angular.copy(inventoryItem);
               $scope.SelectedInventory = angular.copy(inventory);
               $scope.inventoryItemIndex = index;
           }

           $scope.Reset = function (inventory,inventoryItem)
           {
               inventoryItem.Quantity = $scope.SelectedInventoryItem.Quantity;
               inventoryItem.BuyPrice = $scope.SelectedInventoryItem.BuyPrice;
               inventoryItem.ExpiryDate = $scope.SelectedInventoryItem.ExpiryDate;

               //inventory = $scope.SelectedInventory;

               $scope.SelectedInventoryItem = {};
               $scope.SelectedInventory = {};
               $scope.inventoryItemIndex = "";
           }

           $scope.ToggleDetail = function (singleInventory)
           {
               if (!singleInventory.ActivePosition) {

                   InventoryService.GetInventoryItems(singleInventory.Id)
                            .success(function (pt) {

                                if (pt.length > 0) {

                                    singleInventory.InventoryItems = pt;
                                    prepareInventoryDataModelForInventoryItem(singleInventory.InventoryItems);

                                }
                                console.log("Successfully retrieve Inventory Data ");
                                console.log(pt);
                            })
                             .error(function (error) {
                                 $scope.status = 'Unable to load  Inventory data: ' + error.message;
                                 console.log($scope.status);
                             });
               }

               singleInventory.ActivePosition = !singleInventory.ActivePosition;
           }
            $scope.GetInventories=function()
            {

                InventoryService.GetInventories($scope.filterCondition.StoreId)
                .success(function (pt) {

                    if (pt.length > 0) {

                        $scope.Inventories = pt;
                        prepareInventoryDataModel();
                    }
                    console.log("Successfully retrieve Inventory Data ");
                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load  Inventory data: ' + error.message;
                    console.log($scope.status);
                });

            }

            $scope.GetStores = function () {

                InventoryService.GetStores($scope.storeType)
                .success(function (pt) {

                    if (pt.length > 0) {
                        $scope.StoreList = pt;
                        $scope.filterCondition.StoreId = pt[0].Id.toString();
                        $scope.GetInventories();
                        
                    }

                    


                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load  Store data: ' + error.message;
                    console.log($scope.status);
                });
            }

            $scope.GetStores();


            $scope.GetConfiguration = function () {

                IniService.GetConfiguration()
                    .success(function (data) {

                        $scope.Configuration = data;
                        $scope.StoreType = $scope.Configuration.Configuration.StoreTypePharmacy.toString();

                    }).error(function (error) {

                        $scope.status = 'Unable to Discharge Admission: ' + error.message;
                        console.log($scope.status);

                    });

            }

            $scope.GetConfiguration();


        }


    }


});