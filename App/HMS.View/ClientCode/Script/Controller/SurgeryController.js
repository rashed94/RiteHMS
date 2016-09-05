'use strict';


HmsApp.controller("SurgeryController", function ($scope, $routeParams, $window, $filter, $route, $modal, ItemService, IniService) {

    $scope.SingleItem = {
        id: 0,
        Name: "",
        GenericName: "",
        Code: "",
        ItemTypeId: '',
        MedicalTypeId: '',
        ItemCategoryId: '',
        MeasurementUnitId: '',
        SalePrice: "",
        BuyPrice: 0.00,
        ServiceProviderId: "",
        ReferralAllowed: 0,
        DefaultReferrarFee: "",
        ReportGroupId: "",


    };
    $scope.SurgeryCategories = [];
    $scope.saveSuccess = 0;


    $scope.filterCondition = {
        ItemCategoryId: '',
        CategoryId: "0"


    }

    function init() {


        var tabClass = ".summary";
        if ($routeParams.tab != null) {
            tabClass = "." + $routeParams.tab;
        }
        $('.tabs li').removeClass('active');
        $(tabClass).addClass('active');
        $(tabClass).removeClass('hide');


        $scope.ReloadPage = function () {
            if (!$routeParams.id) {
                // location.reload();
                $route.reload();
            }
        }

        $scope.DeleteItem = function (itemId) {


            ItemService.deleteItem(itemId)
           .success(function (data) {

               //$scope.getDoctorWithReferrel();
               $scope.GetItemsByMedicalType($scope.medicalTypeID);
               $scope.status = 'Delete Successful';
               //$window.alert("Delete Successful!");
               //return;

           })
           .error(function (error) {
               $scope.status = 'Unable to delete item: ' + error.message;
               console.log($scope.status);
           });

        }

        $scope.LoadFilterCondition = function () {
            $scope.filterCondition.ItemCategoryId = $scope.SingleItem.ItemCategoryId.toString();
        }

        $scope.loadItembyId = function (itemid) {

            ItemService.loadItembyId(itemid)
                .success(function (pt) {
                    $scope.SingleItem = pt;
                    $scope.LoadFilterCondition();

                    // $scope.LoadReportFomart($scope.SingleItem.Id);

                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load single  item ' + error.message;
                    console.log($scope.status);
                });
        }

        $scope.loadAddSurgeryItem = function () {
            if ($routeParams.tab == "addpsurgery") {

                //  $scope.LabTestCategories =  $scop
                // $scope.LabTestGroups = 
                // $scope.MeasureMentUnits = 

                /* $scope.loadLabTestGroups();
                $scope.loadMeasureMentUnits();*/


                if ($routeParams.id) {
                    $scope.loadItembyId($routeParams.id);
                }
               
            }
        }



        $scope.loadItems = function () {



            $scope.GetItemsByMedicalType($scope.medicalTypeID);



        }
        $scope.GetItemsByMedicalType = function (medicalType) {
            ItemService.GetItemsByMedicalType(medicalType, $scope.filterCondition.CategoryId)
                .success(function (pt) {
                    $scope.items = pt;
                    // preparelabtestDataModel();
                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load  Surgery item data: ' + error.message;
                    console.log($scope.status);
                });
        }

        $scope.LoadItemCategories = function () {
            ItemService.loadTestCategories($scope.medicalTypeID)
                 .success(function (pt) {
                     //$scope.TestCategories = pt;
                     $scope.SurgeryCategories = pt;
                     if (!$routeParams.id && $scope.SurgeryCategories.length>0) {
                         $scope.filterCondition.ItemCategoryId = $scope.SurgeryCategories[0].Id.toString();
                     }

                     console.log(pt);
                 })
                 .error(function (error) {
                     $scope.status = 'Unable to load Surgery category    data: ' + error.message;
                     console.log($scope.status);
                 });
        }

        $scope.saveItem = function () {

            $scope.SingleItem.ItemCategoryId = $scope.filterCondition.ItemCategoryId;


            ItemService.SaveItem($scope.SingleItem)
            .success(function (data) {

                $scope.loadItembyId(data);
                $scope.saveSuccess = 1;
                console.log("Save successfull");

            })
            .error(function (error) {
                $scope.status = 'Unable to save category data: ' + error.message;

            });
        }


        $scope.resetpopupFiled = function () {

            $scope.categoryName = "";
            //$scope.reportGroupName = "";
           // $scope.measurementUnitName = "";
        }

        $scope.saveCategory = function () {
            ItemService.CreateCategory($scope.categoryName, $scope.medicalTypeID)
            .success(function (data) {

                $scope.LoadItemCategories();
                $scope.resetpopupFiled();

                $('#popupCategory').css("visibility", "hidden");
                $('#popupCategory').css("opacity", 0);

            })
            .error(function (error) {
                $scope.status = 'Unable to save category data: ' + error.message;

            });

        }


        if ($routeParams.tab == "addpsurgery") {
            $scope.loadAddSurgeryItem();
            $scope.LoadItemCategories();
        }

        if ($routeParams.tab == "summary") {
            $scope.loadItems();
            $scope.LoadItemCategories();
        }


    }
    /*------------------------- configuration begin -------------------------*/

    $scope.GetConfiguration = function () {

        IniService.GetConfiguration()
            .success(function (data) {

                $scope.Configuration = data;


                $scope.medicalTypeID = $scope.Configuration.Configuration.MedicalTypeSurgery.toString();
                $scope.SingleItem.MedicalTypeId = $scope.Configuration.Configuration.MedicalTypeSurgery;
                $scope.NonRegisterPatientId = $scope.Configuration.Configuration.NonRegisterPatientId;
                $scope.ServiceProviderType = $scope.Configuration.Configuration.DoctorTypeId;
                $scope.SingleItem.ItemTypeId = $scope.Configuration.Configuration.ServiceItem;
                $scope.medicalTypeIDLab = $scope.Configuration.Configuration.MedicalTypeLabTest.toString();
                $scope.Currency = $scope.Configuration.Configuration.Currency;

                init();

            }).error(function (error) {

                $scope.status = 'Unable to Discharge Admission: ' + error.message;
                console.log($scope.status);

            });

    }

    $scope.GetConfiguration();

    /*------------------------- configuration end -------------------------*/
});