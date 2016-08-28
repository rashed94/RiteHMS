'use strict';
angular.module('HMS').directive('addStore', function () {
    return {
        templateUrl: "ClientCode/Template/AddStore.html",
        restrict: "E",
        scope: {
                storeId:'@'
        },
        controller: function ($scope, $routeParams, $http,$route, InventoryService) {

            $scope.filterCondition = {
                StoreTypeId: "0"
            }

            $scope.ShowLineManager = false;
            $scope.SaveSuccess = false;
            $scope.StoreType = {};

            $scope.Store = {
                Id: 0,
                Name: "",
                Address: "",
                PhoneNumber: "",
                Fax: "",
                Email: "",
                StoreKeeperId: "",
                ParentStoreId: "",
                StoreTypeId: "",
                ParentStore: {
                    Name:""
                }
            }
            $scope.LineManagerList = [];
            $scope.LineManager = {
                StoreId: "",
                LineManagerId: ""

            }
            $scope.StoreKeeperUser = {
                UserName:""
            }

            $scope.ParentStore = {
                StoreId: "0",
                StoreName:""
            };



            $scope.ReloadPage = function () {
                if (!$routeParams.id) {
                    // location.reload();
                    $route.reload();
                }
            }

           
            $scope.GetUserByPartialName = function (name) {

                return $http.get('/User/GetUserByPartialName?name=' + name).then(function (response) {
                    var data = response.data;
                    return response.data;
                });
            }

            $scope.DeleteLineManager = function (lineManager) {

                InventoryService.DeleteLineManager(lineManager)
                    .success(function (pt) {
                        $scope.LineManagerList = pt;
                        console.log(pt);
                    })
                    .error(function (error) {

                        $scope.status = 'Unable to Delete LineManager data: ' + error.message;
                        console.log($scope.status);
                    });
            }

            $scope.OnUserSelect = function (item) {

                $scope.Store.StoreKeeperId = item.Id;
                $scope.StoreKeeperUser.UserName = item.UserName;
            }

            $scope.OnLineManagerSelect = function (item) {
                $scope.LineManagerUser.UserName = "";

                $scope.LineManager.LineManagerId = item.Id;
                $scope.LineManager.StoreId = $scope.Store.Id;

                InventoryService.SaveLineManager($scope.LineManager)
                    .success(function (pt) {
                        $scope.LineManagerList = pt;
                        console.log(pt);
                    })
                    .error(function (error) {

                        $scope.status = 'Unable to Save LineManager data: ' + error.message;
                        console.log($scope.status);
                    });


            }
            $scope.GetStoreById=function(Id)
            {
                InventoryService.GetStoreById(Id)

                    .success(function (pt) {

                        $scope.Store = pt;
                        $scope.filterCondition.StoreTypeId = $scope.Store.StoreTypeId.toString();

                        $scope.StoreKeeperUser.UserName = $scope.Store.StoreKeeper.UserName;

                        $scope.LineManagerList = $scope.Store.StoreLineManagers;
                        $scope.ShowLineManager = true;
                        console.log("Get store successfully");
                        console.log($scope.Store);

                    }).error(function (error) {

                        $scope.status = 'Unable to load  store data: ' + error.message;
                        console.log($scope.status);

                    })
            }

            $scope.GetStoreType = function () {

                InventoryService.GetStoreType()
                .success(function (pt) {

                    $scope.StoreType = pt;

                    if ($scope.storeId == 0) { // if new store
                        if ($scope.StoreType.length > 0) {
                            $scope.filterCondition.StoreTypeId = $scope.StoreType[0].Id.toString();
                            $scope.GetParentStore();
                        }
                    } else // if editing existing store
                    {
                        $scope.GetStoreById($scope.storeId);
                       
                    }
                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load  StoreType data: ' + error.message;
                    console.log($scope.status);
                });
            }

            $scope.GetParentStore = function () {


                InventoryService.GetParentStore($scope.filterCondition.StoreTypeId)
                .success(function (pt) {

                    if(pt.StoreId!=null)
                    {
                        $scope.ParentStore = pt;
                    }

                    if($scope.ParentStore.StoreId>0) 
                    {
                        $scope.Store.ParentStoreId = $scope.ParentStore.StoreId;
                        $scope.Store.ParentStore.Name = $scope.ParentStore.StoreName;
                    }else
                    {
                        $scope.Store.ParentStoreId ="";
                        $scope.Store.ParentStore.Name ="";
                    }
                   

               
                })
                .error(function (error) {
                    $scope.status = 'Unable to Load Parent Store data: ' + error.message;
                    console.log($scope.status);
                });

            }

            $scope.SaveStore = function () {

                $scope.Store.StoreTypeId = $scope.filterCondition.StoreTypeId;

                InventoryService.SaveStore($scope.Store)
                .success(function (pt) {

                    $scope.SaveSuccess = true;
                    $scope.ShowLineManager = true;
                    $scope.Store = pt;
                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to Save  Store data: ' + error.message;
                    console.log($scope.status);
                });

                

            }

           
         
            $scope.GetStoreType();
            
            

            
        }
    }
});