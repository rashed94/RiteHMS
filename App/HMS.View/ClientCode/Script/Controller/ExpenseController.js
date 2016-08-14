'use strict';


HmsApp.controller("ExpenseController", function ($scope, $routeParams, $window, $filter, $route, $modal,ExpenseService, IniService) {



    $scope.filterCondition = {
       
        CategoryId: "0",
       

    }
    $scope.Expense = {

        Id:null,
        ExpenseCategoryId: "",
        Amount: "",
        ExpenseDate: $filter('date')(new Date(), 'yyyy-MM-dd'),
        ModifiedDate:null,
        Description:""
    }

    function init() {




        var tabClass = ".summary";
        if ($routeParams.tab != null) {
            tabClass = "." + $routeParams.tab;
        }
        $('.tabs li').removeClass('active');
        $(tabClass).addClass('active');
        $(tabClass).removeClass('hide');


        function prepareExpenseDataModel()
        {
            angular.forEach($scope.Items, function (obj) {

                obj.ExpenseDate = ToJavaScriptDate(obj.ExpenseDate);
                if(obj.ModifiedDate!=null)
                {
                    obj.ModifiedDate = ToJavaScriptDate(obj.ModifiedDate);
                }

            });
        }


        $scope.LoadItems = function () {
            ExpenseService.LoadItems($scope.filterCondition.CategoryId, $scope.ExpenseDateStart, $scope.ExpenseDateEnd)
                .success(function (pt) {
                    $scope.Items = pt;
                     prepareExpenseDataModel();
                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load  Surgery item data: ' + error.message;
                    console.log($scope.status);
                });
        }

        $scope.DeleteItem = function (expense)
        {


            ExpenseService.DeleteItem(expense)
            .success(function (data) {

                   console.log("delete successfull");
                   $scope.LoadItems();
            })
            .error(function (error) {
                $scope.status = 'Unable to delete data: ' + error.message;

            });

        }
        $scope.SaveItem = function () {

            $scope.Expense.ExpenseCategoryId = $scope.filterCondition.CategoryId;
            if ($scope.Expense.Id != null)
            {
                $scope.Expense.ModifiedDate = $filter('date')(new Date(), 'yyyy-MM-dd');
            }


            ExpenseService.SaveItem($scope.Expense)
            .success(function (data) {

                $scope.Expense=data;
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


        $scope.LoadCategories = function () {
            ExpenseService.LoadCategories()
                 .success(function (pt) {
                     //$scope.TestCategories = pt;
                     $scope.Categories = pt;

                     if($routeParams.tab == "addexpense") 
                         {
                             if (!$routeParams.id && $scope.Categories.length > 0) {
                                 $scope.filterCondition.CategoryId = $scope.Categories[0].Id.toString();
                             }else
                             {
                                 $scope.filterCondition.CategoryId = $scope.Expense.ExpenseCategoryId.toString();
                             }
                         }

                     console.log(pt);
                 })
                 .error(function (error) {
                     $scope.status = 'Unable to load expense category    data: ' + error.message;
                     console.log($scope.status);
                 });
        }

        $scope.ReloadPage = function () {
            if (!$routeParams.id) {
                // location.reload();
                $route.reload();
            }
        }

        $scope.SaveCategory = function () {
            ExpenseService.CreateCategory($scope.categoryName)
            .success(function (data) {

                $scope.LoadCategories();
                $scope.resetpopupFiled();

                $('#popupCategory').css("visibility", "hidden");
                $('#popupCategory').css("opacity", 0);

            })
            .error(function (error) {
                $scope.status = 'Unable to save category data: ' + error.message;

            });

        }
        $scope.LoadSingleExpenseItem=function()
        {
            if ($routeParams.id)
            {
                ExpenseService.LoadSingleExpenseItem($routeParams.id)
                .success(function(pt){
                    $scope.Expense = pt;
                    $scope.Expense.ExpenseDate = ToJavaScriptDate($scope.Expense.ExpenseDate);

                    if ($scope.Expense.ModifiedDate != null)
                    {
                        $scope.Expense.ModifiedDate = ToJavaScriptDate($scope.Expense.ModifiedDate)
                    }

                    console.log("Successfully load single expense data");

                })
                .error(function (error) {
                    $scope.status = 'Unable to load Single expense     data: ' + error.message;
                    console.log($scope.status);
                });

            }
        }

        if ($routeParams.tab == "addexpense") {
            $scope.LoadSingleExpenseItem();
            $scope.LoadCategories();
        }

        if ($routeParams.tab == "summary") {

            $scope.LoadItems();
            $scope.LoadCategories();
        }


    }
    /*------------------------- configuration begin -------------------------*/

    $scope.GetConfiguration = function () {

        IniService.GetConfiguration()
            .success(function (data) {

                $scope.Configuration = data;


                $scope.medicalTypeDrugId = $scope.Configuration.Configuration.MedicalTypeDrug.toString();
                // $scope.SingleItem.MedicalTypeId = $scope.Configuration.Configuration.MedicalTypeDrug;
                $scope.NonRegisterPatientId = $scope.Configuration.Configuration.NonRegisterPatientId;
                $scope.ServiceProviderType = $scope.Configuration.Configuration.DoctorTypeId;
                // $scope.SingleItem.ItemTypeId = $scope.Configuration.Configuration.ServiceItem;
                $scope.medicalTypeIdLab = $scope.Configuration.Configuration.MedicalTypeLabTest.toString();

                init();

            }).error(function (error) {

                $scope.status = 'Unable to Discharge Admission: ' + error.message;
                console.log($scope.status);

            });

    }

    $scope.GetConfiguration();

    /*------------------------- configuration end -------------------------*/
});