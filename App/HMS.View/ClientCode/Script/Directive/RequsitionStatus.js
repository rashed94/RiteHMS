'use strict';
angular.module('HMS').directive('requsitionStatus', function () {
    return {
        templateUrl: "ClientCode/Template/RequsitionStatus.html",
        restrict: "E",
        scope: {
            storeId: '@',
            storeList: '='
        },

        controller: function ($scope, $http, InventoryService,IniService, requsition) {

            $scope.RequisitonList = [];
            $scope.State = requsition;
            var AccetAllStatus = false;
           
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

            $scope.PopUpExpireDate = function (reqItem,event) {
                $('#popupExpireDate').css("visibility", "visible");
                $('#popupExpireDate').css("opacity", 1);
                $(".popup").css({ position: "absolute", top: event.pageY - 360, left: event.pageX - 70, width: "300px" });
            }

            $scope.PopUpExpireDateClose=function()
            {
                $('#popupExpireDate').css("visibility", "hidden");
                $('#popupExpireDate').css("opacity", 0);
                $scope.ExpireDate = "";
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