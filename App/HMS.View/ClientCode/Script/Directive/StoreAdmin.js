'use strict';
angular.module('HMS').directive('storeAdmin', function () {
    return {
        templateUrl: "ClientCode/Template/StoreAdmin.html",
        restrict: "E",
        scope: {
            storeType: '@'
        },
        controller: function ($scope, $http,$filter, InventoryService, IniService) {

            $scope.StoreList = [];
            $scope.filterCondition = {
                StoreId: ""
            }
            $scope.RequisitonList = [];
            $scope.ApproveAllStatus = false;




            var prepareDataModelForRequisitionItem = function (ItemRequisitions) {

                $scope.ApproveAllStatus = false;
                angular.forEach(ItemRequisitions, function (reqItem) {

                    if (reqItem.ApprovalDate != null) {
                        reqItem.ApprovalDate = ToJavaScriptDate(reqItem.ApprovalDate);
                    }
                    if (reqItem.RequisitionStatusId == $scope.RequsitionStatusApproved) {
                        
                        reqItem.Status = "Approved";

                    } else if (reqItem.RequisitionStatusId == $scope.RequsitionStatusOpened) {
                        reqItem.Status = "Opened";
                        $scope.ApproveAllStatus = true;

                    } else if (reqItem.RequisitionStatusId == $scope.RequsitionStatusReceived) {

                        reqItem.Status = "Received";
                    }

                    reqItem.IsEdit = false;



                });

            }

            $scope.ToggleDetail = function (singleRequisitionItem) {
                if (!singleRequisitionItem.ActivePosition) {

                    InventoryService.GetRequistionsItemsWithoutInventory(singleRequisitionItem.Id)
                             .success(function (pt) {

                                 if (pt.length > 0) {

                                     singleRequisitionItem.ItemRequisitions = pt;
                                     prepareDataModelForRequisitionItem(singleRequisitionItem.ItemRequisitions);
                                     if (ApproveAllStatus) singleRequisitionItem.ApproveAllStatus = true;

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


            var prepareDataModelRequisiton = function () {

                angular.forEach($scope.RequisitonList, function (obj) {

                    obj.RequisitionDate = ToJavaScriptDate(obj.RequisitionDate);
                    obj.ActivePosition = false;

                });
            }

            $scope.ApproveRequisition=function(reqItem,reqItems)
            {
                var tempStatusId = reqItem.RequisitionStatusId;

                reqItem.RequisitionStatusId = $scope.RequsitionStatusApproved;
                reqItem.ApprovalDate = $filter('date')(new Date(), 'yyyy-MM-dd');

                InventoryService.UpdateRequisitionItemFromAdmin(reqItem)
                    .success(function (pt) {

                        console.log("Successfully update Requisition item Data ");
                        console.log(pt);
                        reqItem.Status = "Approved";
                        prepareDataModelForRequisitionItem(reqItems);
                      
                    })
                    .error(function (error) {

                        alert("Something went wrong while saving Requsition Status please try again");
                       
                        $scope.status = 'Unable to update  Requisition item data: ' + error.message;
                        reqItem.RequisitionStatusId = tempStatusId;
                        
                    });

            }


            $scope.GetAdminRequsition = function () {

                InventoryService.GetAdminRequsition($scope.filterCondition.StoreId)
                .success(function (pt) {

                    if (pt.length > 0) {

                        //requsition.RequisitonList = pt;
                        //$scope.RequisitonList = requsition.RequisitonList;

                        $scope.RequisitonList = pt
                        prepareDataModelRequisiton();
                    } else {
                        $scope.RequisitonList = [];
                    }
                    console.log("Successfully retrieve Requisition Data ");
                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load  Requisition data: ' + error.message;
                    console.log($scope.status);
                });

            }

            $scope.GetStores = function () {

                InventoryService.GetStores($scope.storeType)
                .success(function (pt) {

                    if (pt.length > 0) {
                        $scope.StoreList = pt;
                        $scope.filterCondition.StoreId = pt[0].Id.toString();
                        $scope.GetAdminRequsition();
                    }




                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load  Store data: ' + error.message;
                    console.log($scope.status);
                });
            }

            $scope.GetStores();


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


        }
    }
});