'use strict';
angular.module('HMS').directive('requsitionStatus', function () {
    return {
        templateUrl: "ClientCode/Template/RequsitionStatus.html",
        restrict: "E",
        scope: {
            storeId: '@',
            storeList: '='
        },

        controller: function ($scope, $filter, $http, InventoryService, IniService, requsition,reorder) {

            $scope.RequisitonList = [];
            $scope.State = requsition;
            var AccetAllStatus = false;

            $scope.InventoryItem = {

                id: "",
                ItemId:"" ,
                InventoryId:"" ,
                StoreId:"",
                Quantity: "",
                MeasurementUnitId: "",
                ExpiryDate: "",
                BuyPrice: "",
                ModifiedDate: $filter('date')(new Date(), 'yyyy-MM-dd')

            }
            $scope.Inventory = {};
            $scope.RequsitionItem = {};
            $scope.Requsition = {};


           
            $scope.$watch('storeId', function () {
                
                $scope.GetRequsition();

            });

            var prepareDataModel = function () {

                angular.forEach($scope.State.RequisitonList, function (obj) {

                    obj.RequisitionDate = ToJavaScriptDate(obj.RequisitionDate);
                    obj.ActivePosition = false;

                });
            }

            var prepareDataModelForRequisitionItem = function (ItemRequisitions) {

                AccetAllStatus = false;
                angular.forEach(ItemRequisitions, function (reqItem) {

                    if (reqItem.ApprovalDate != null) {
                        reqItem.ApprovalDate = ToJavaScriptDate(reqItem.ApprovalDate);
                    }
                    if(reqItem.RequisitionStatusId==$scope.RequsitionStatusApproved)
                    {
                        AccetAllStatus = true;
                        reqItem.Status = "Approved";

                    } else if (reqItem.RequisitionStatusId == $scope.RequsitionStatusOpened)
                    {
                        reqItem.Status = "Opened";

                    } else if (reqItem.RequisitionStatusId == $scope.RequsitionStatusReceived) {

                        reqItem.Status = "Received";
                    }

                    reqItem.IsEdit = false;

                  

                });

            }

            $scope.EditItem=function(reqItem)
            {
                reqItem.IsEdit = true;
                $scope.SelectedRequisitionItem = angular.copy(reqItem);
            }

            $scope.Reset=function(reqItem)
            {

                reqItem.IsEdit = false;
                reqItem.Quantity = $scope.SelectedRequisitionItem.Quantity;
                $scope.SelectedRequisitionItem = {};

            }
            $scope.UpdateRequisitionItem = function (reqItem)
            {

                InventoryService.UpdateRequisitionItem(reqItem)
                    .success(function (pt) {

                        console.log("Successfully update Requisition item Data ");
                        console.log(pt);
                        reqItem.IsEdit = false;
                        $scope.SelectedRequisitionItem = {};
                    })
                    .error(function (error) {

                        alert("Something went wrong while saving Item please try again");
                        $scope.Reset(reqItem);
                        $scope.status = 'Unable to update   Requisition Item data: ' + error.message;
                        console.log($scope.status);
                    });

  
            }

            $scope.ToggleDetail = function (singleRequisitionItem) {
                if (!singleRequisitionItem.ActivePosition) {

                    InventoryService.GetRequistionsItems(singleRequisitionItem.Id)
                             .success(function (pt) {

                                 if (pt.length > 0) {

                                     singleRequisitionItem.ItemRequisitions = pt;
                                     prepareDataModelForRequisitionItem(singleRequisitionItem.ItemRequisitions);
                                     if (AccetAllStatus) singleRequisitionItem.AccetAllStatus = true;

                                 }

                                 console.log("Successfully retrieve Requsition item Data ");
                                 console.log(pt);
                             })
                              .error(function (error) {
                                  $scope.status = 'Unable to load   Requsition item data: ' + error.message;
                                  console.log($scope.status);
                              });
                }

                singleRequisitionItem.ActivePosition = !singleRequisitionItem.ActivePosition;
            }
            $scope.GetRequsition=function()
            {
 
                InventoryService.GetRequistionsWithoutItem($scope.storeId)
                .success(function (pt) {

                    if (pt.length > 0) {

                        //requsition.RequisitonList = pt;
                        //$scope.RequisitonList = requsition.RequisitonList;

                        requsition.RequisitonList=pt
                        prepareDataModel();
                    } else
                    {
                        requsition.RequisitonList = [];
                    }
                    console.log("Successfully retrieve Requisition Data ");
                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load  Requisition data: ' + error.message;
                    console.log($scope.status);
                });
      
            }

            $scope.CreateInventoryWithInventoryItem = function () {


                var data = InventoryService.CreateInventory($scope.Inventory)
                 .success(function (pt) {

                     console.log("Successfully Create inventory data");
                     console.log(pt);
                 })
                 .error(function (error) {

                     $scope.status = 'Unable to Create  Inventory data: ' + error.message;
                     console.log($scope.status);
                 });

                return { data: data };
            }

            $scope.CreateInventoryItem = function () {

                InventoryService.CreateInventoryItem($scope.InventoryItem)
                .success(function (pt) {
                 
                    console.log("Successfully Careate Stock data");
                    console.log(pt);

                    $scope.UpdateRequisitionItemStatus($scope.RequsitionItem);


                })
                .error(function (error) {

                    $scope.status = 'Unable to Create  Stock data: ' + error.message;
                    console.log($scope.status);
                });
            }

            $scope.UpdateRequisitionItemStatus= function (reqItem) {

                InventoryService.UpdateRequisitionItem(reqItem)
                    .success(function (pt) {

                        console.log("Successfully update Requisition item Data ");
                        reqItem.Status = "Received";

                        $scope.CheckAndUpdateRequsition();
                        $scope.GetReorderInventories();
                    })
                    .error(function (error) {

                        alert("Something went wrong while saving Item please try again");
                        $scope.status = 'Unable to update   Requisition Item data: ' + error.message;
                        console.log($scope.status);
                    });


            }

            $scope.CheckAndUpdateRequsition=function()
            {
                var updateReq=true;
                angular.forEach($scope.Requsition.ItemRequisitions, function (obj) {

                    if(obj.RequisitionStatusId!=$scope.RequsitionStatusReceived)
                    {
                        updateReq=false
                    }

                });

                if (updateReq) {
                    $scope.Requsition.IsOpen = false;
                    $scope.UpdateRequisition();
                }
            }

            $scope.UpdateRequisition=function()
            {

                InventoryService.UpdateRequisition($scope.Requsition)
                    .success(function (pt) {

                        console.log("Successfully update Requisition  Data ");
                                              
                    })
                    .error(function (error) {

                        $scope.status = 'Unable to update   Requisition  data: ' + error.message;
                        console.log($scope.status);

                    });

            }
            var prepareInventoryDataModel = function (inventories) {
                angular.forEach(inventories, function (obj) {

                    obj.ActivePosition = false;
                    obj.InventoryItems = [];
                    obj.LastModifiedDate = ToJavaScriptDate(obj.LastModifiedDate);


                });
            }

            $scope.GetReorderInventories = function () {

                InventoryService.GetReorderInventories($scope.storeId)
                .success(function (pt) {

                    if (pt.length > 0) {

                        //  $scope.Inventories = pt;
                        reorder.Inventories = pt;
                        prepareInventoryDataModel(reorder.Inventories);
                    } else {
                        reorder.Inventories = [];
                    }
                    console.log("Successfully retrieve Inventory Data ");
                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load  Inventory data: ' + error.message;
                    console.log($scope.status);
                });

            }

            $scope.UpdateInventory=function()
            {
                 $scope.InventoryItem.ExpiryDate = $scope.ExpireDate;
                 $scope.InventoryItem.BuyPrice = $scope.BuyPrice;
                 $scope.InventoryItem.ModifiedDate = $filter('date')(new Date(), 'yyyy-MM-dd');


                InventoryService.ApproveRequisition($scope.Inventory, $scope.InventoryItem, $scope.RequsitionItem, $scope.Requsition)
                .success(function (pt) {

                  //  $scope.CheckAndUpdateRequsition();
                    $scope.GetReorderInventories();

                    console.log("Successfullly approved Requisition");
                })
               .error(function (error) {

                   alert("Something went wrong requisiton approved fail..");
                   console.log("Approved Requisition Fail");
               });
                $scope.PopUpExpireDateClose();

                $scope.RequsitionItem.Status = "Received";
               /* $scope.CreateInventoryWithInventoryItem().data.success(function (pt) {


                  $scope.CreateInventoryItem();

                 })
                    .error(function (error) {

                        alert("Error occurred ...Updating inventory ..please try again");

                    });

                 $scope.PopUpExpireDateClose();*/
            }


            //---------------------------ini data call ----------------------

            $scope.GetConfiguration = function () {

                IniService.GetConfiguration()
                    .success(function (data) {

                        $scope.Configuration = data;
                        $scope.RequsitionStatusOpened = $scope.Configuration.Configuration.RequsitionStatusOpened;
                        $scope.RequsitionStatusApproved = $scope.Configuration.Configuration.RequsitionStatusApproved;
                        $scope.RequsitionStatusReceived = $scope.Configuration.Configuration.RequsitionStatusReceived;

                    }).error(function (error) {

                        $scope.status = 'Unable to Discharge Admission: ' + error.message;
                        console.log($scope.status);

                    });

            }

            $scope.GetConfiguration();


        },
        link: function ($scope, el, attrs) {

            $scope.PopUpExpireDate = function (reqItem,requistion,event) {
                $('#popupExpireDate').css("visibility", "visible");
                $('#popupExpireDate').css("opacity", 1);
                $(".popup").css({ position: "absolute", top: event.pageY - 360, left: event.pageX - 70, width: "300px" });

                $scope.InventoryItem.ItemId = reqItem.ItemId;
                $scope.InventoryItem.InventoryId = reqItem.InventoryId;
                $scope.InventoryItem.StoreId = requistion.FromStoreId;
                $scope.InventoryItem.Quantity = reqItem.Quantity;
                $scope.InventoryItem.MeasurementUnitId = reqItem.MeasurementUnitId;
              //  $scope.InventoryItem.ExpiryDate = $scope.ExpireDate;
               // $scope.InventoryItem.BuyPrice = $scope.BuyPrice;
                

                reqItem.Inventory.Quantity = reqItem.Inventory.Quantity + reqItem.Quantity;
                $scope.Inventory = reqItem.Inventory;
                $scope.Inventory.LastModifiedDate = ToJavaScriptDate($scope.Inventory.LastModifiedDate);
                $scope.Inventory.Bin = null;
                $scope.Inventory.Shelf = null;
                $scope.Inventory.InventoryItems = null;

                $scope.RequsitionItem = reqItem;
                $scope.RequsitionItem.RequisitionStatusId = $scope.RequsitionStatusReceived;

                $scope.Requsition = requistion;


            }

            $scope.PopUpExpireDateClose=function()
            {
                $('#popupExpireDate').css("visibility", "hidden");
                $('#popupExpireDate').css("opacity", 0);
                $scope.ExpireDate = "";
                $scope.BuyPrice = "";
            }

            $('.expireDate').datepicker({
                format: "yyyy-mm-dd",
                startView: "day",
                minViewMode: "day"
            }).on('changeDate', function (ev) {
                $(this).blur();
                $(this).datepicker('hide');
            });

        }
    }



});