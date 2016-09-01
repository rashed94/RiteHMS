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

        controller: function ($scope, $http, $filter, InventoryService, IniService, requsition) {

            $scope.Inventories = [];
            $scope.Inventory = {};
            $scope.ItemRequisitionList = [];
            $scope.RequisitionStoreList = [];
            $scope.SaveSuccess = false;
           // $scope.State = requsition;
            
            $scope.filterCondition = {
                StoreId:""
            }
            $scope.ItemRequisition = {

                ItemId: "",
                RequisitionId: null,
                InventoryId:null,
                ApprovedBy: null,
                ApprovalDate: null,
                Quantity: null,
                MeasurementUnitId: null,
                RequisitionStatusId: "",
                
            };

            $scope.Requisition = {
                RequisitionDate: $filter('date')(new Date(), 'yyyy-MM-dd'),
                RequisitionBy: 0,
                ToStoreId: "",
                FromStoreId: $scope.storeId,
                IsSubStoreRequisition: true,
                Purpose: "",
                Note: "",
                IsOpen: true
            }

            $scope.$watch('storeId', function () {

                //console.log($scope.storeId + "---" + $scope.isParentStoreExist);
                $scope.GetReorderInventories();
                $scope.PrepareRequisitionStoreList();
                $scope.SaveSuccess = false;

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
                    } else
                    {
                        $scope.Inventories = [];
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
                $scope.PopUpRequsitionItemClose();

            }
            $scope.SubmitRequsition=function()
            {

                $scope.Requisition.ToStoreId = $scope.filterCondition.StoreId;
                $scope.Requisition.FromStoreId = $scope.storeId;

                $scope.Requisition.RequisitionDate = $filter('date')(new Date(), 'yyyy-MM-dd');

                if($scope.filterCondition.StoreId==0)
                {
                    $scope.Requisition.IsSubStoreRequisition = false;
                    $scope.Requisition.ToStoreId = null;
                }

                $scope.Requisition.ItemRequisitions = $scope.ItemRequisitionList;

                
                InventoryService.CreateRequisition($scope.Requisition)

                    .success(function (pt) {
                        
                        console.log("Requsition successfully saved");
                        $scope.SaveSuccess = true;
                        $scope.PopUpRequsitionClose();
                        $scope.GetRequsition();
                    })
                    .error(function (error) {

                        $scope.status = 'Unable to save Requsition data: ' + error.message;
                        console.log($scope.status);
                    });


               
               
            }

            var prepareDataModelForRequsition = function (RequisitonList) {

                angular.forEach(RequisitonList, function (obj) {

                    obj.RequisitionDate = ToJavaScriptDate(obj.RequisitionDate);

                    //angular.forEach(obj.ItemRequisitions, function (reqItem) {

                    //    if (reqItem.ApprovalDate != null) {
                    //        reqItem.ApprovalDate = ToJavaScriptDate(reqItem.ApprovalDate);
                    //    }

                    //});

                });
            }
            $scope.GetRequsition = function () {

                InventoryService.GetRequistionsWithoutItem($scope.storeId)
                .success(function (pt) {


                    if (pt.length > 0) {

                        //requsition.RequisitonList = pt;
                        //$scope.RequisitonList = requsition.RequisitonList;

                        requsition.RequisitonList = pt
                        prepareDataModelForRequsition(requsition.RequisitonList);
                       
                    } else {
                        requsition.RequisitonList = [];
                    }

                         console.log("Successfully retrieve Requisition Data ");
                   
                })
                .error(function (error) {

                    $scope.status = 'Unable to load  Requisition data: ' + error.message;
                    console.log($scope.status);
                });

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
                    $scope.ItemRequisition.InventoryId = inventory.Id;
                    $scope.ItemRequisition.MeasurementUnitId = inventory.Item.MeasurementUnitId;
                    $scope.Inventory = inventory;
            }

            $scope.PopUpRequsition=function(event)
            {
                $('#popupRequsition').css("visibility", "visible");
                $('#popupRequsition').css("opacity", 1);
                $(".popup").css({ position: "absolute", top: event.pageY - 360, left: event.pageX - 70, width: "600px" });
            }


           
            $scope.PopUpRequsitionItemClose = function () {
                $('#popupQuantity').css("visibility", "hidden");
                $('#popupQuantity').css("opacity", 0);
                $scope.ItemRequisition.Quantity = 0;
            }
            

            $scope.PopUpRequsitionClose=function () {

                $('#popupRequsition').css("visibility", "hidden");
                $('#popupRequsition').css("opacity", 0);

                $scope.Requisition.Purpose = "";
                $scope.Requisition.Note = "";
                $scope.ItemRequisitionList = [];
                
            }
    
        }
    }


});