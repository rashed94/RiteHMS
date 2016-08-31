'use strict';
angular.module('HMS').directive('reorderAlert', function () {
    return {
        templateUrl: "ClientCode/Template/ReorderAlert.html",
        restrict: "E",
        scope: {
            storeId: '@',
            isParentStoreExist:'@parent',
            storeList: '=',

        },

        controller: function ($scope, $http, InventoryService, IniService) {

            $scope.Inventories = [];
            $scope.Inventory = {};
            $scope.ItemRequisitionList = [];
            $scope.RequisitionStoreList = [];
            
            $scope.filterCondition = {
                StoreId:""
            }
            $scope.ItemRequisition = {

                ItemId: "",
                RequisitionId: null,
                ApprovedBy: null,
                ApprovalDate: null,
                Quantity: null,
                MeasurementUnitId: null,
                RequisitionStatusId: "",
                
            };

            $scope.Requisition = {

                RequisitionDate: "",
                RequisitionBy: 0,
                Purpose: "",
                ToStoreId: "",
                FromStoreId: "",
                IsSubStoreRequisition:"",
                Note: "",
                IsOpen:true
            };      

            $scope.$watch('storeId', function () {

                console.log($scope.storeId + "---" + $scope.isParentStoreExist);
                $scope.GetReorderInventories();
                $scope.PrepareRequisitionStoreList();

            });

            var prepareInventoryDataModel = function () {
                angular.forEach($scope.Inventories, function (obj) {

                    obj.ActivePosition = false;
                    obj.InventoryItems = [];
                    obj.LastModifiedDate = ToJavaScriptDate(obj.LastModifiedDate);


                });
            }

            $scope.PrepareRequisitionStoreList=function()
            {
                var index = 0;
                $scope.RequisitionStoreList = [];

                angular.forEach($scope.storeList, function (obj) {

                    if (obj.Id != $scope.storeId)
                    {
                        $scope.RequisitionStoreList.push(obj);
                    } else
                   
                    index++;

                });
                if ($scope.isParentStoreExist=="true")
                {
                    var obj = {
                        Id: 0,
                        Name:"Admin Request"
                    }
                    $scope.RequisitionStoreList.push(obj);
                }
                $scope.filterCondition.StoreId = $scope.RequisitionStoreList[0].Id.toString();

            }

            $scope.GetReorderInventories = function () {

                InventoryService.GetReorderInventories($scope.storeId)
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

            $scope.AddToRequsition = function ()
            {
                
                $scope.ItemRequisitionList.push(angular.copy($scope.ItemRequisition));
                $scope.Inventory.IsAdded = true;
                
                console.log("AddToRequsition requsition");
                $scope.PopUpRequsitionClose();

            }
            $scope.SubmitRequsition=function()
            {
                console.log("submit requsition");
            }



            

            //---------------------------ini data call ----------------------

            $scope.GetConfiguration = function () {

                IniService.GetConfiguration()
                    .success(function (data) {

                        $scope.Configuration = data;
                        $scope.ItemRequisition.RequisitionStatusId = $scope.Configuration.Configuration.RequsitionStatusOpened;

                    }).error(function (error) {

                        $scope.status = 'Unable to Discharge Admission: ' + error.message;
                        console.log($scope.status);

                    });

            }

            $scope.GetConfiguration();

    
        },
        link:function($scope,el,attrs)
        {




            $scope.popUpQuantity=function(inventory,event)
            {
                    
                    $('#popupQuantity').css("visibility", "visible");
                    $('#popupQuantity').css("opacity", 1);
                    $(".popup").css({ position: "absolute", top: event.pageY - 260, left: event.pageX - 70, width: "200px" });
                    
                    $scope.ItemRequisition.ItemId = inventory.Item.Id;
                    $scope.ItemRequisition.MeasurementUnitId = inventory.Item.MeasurementUnitId;
                    $scope.Inventory = inventory;
            }

            $scope.PopUpRequsition=function(event)
            {
                $('#popupRequsition').css("visibility", "visible");
                $('#popupRequsition').css("opacity", 1);
                $(".popup").css({ position: "absolute", top: event.pageY - 360, left: event.pageX - 70, width: "600px" });
            }


           
            $scope.PopUpRequsitionClose = function () {
                $('#popupQuantity').css("visibility", "hidden");
                $('#popupQuantity').css("opacity", 0);
                $scope.ItemRequisition.Quantity = 0;
            }
            

            $("#popupRequsition .close").click(function () {

                $('#popupRequsition').css("visibility", "hidden");
                $('#popupRequsition').css("opacity", 0);
            });
    
        }
    }


});