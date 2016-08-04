'use strict';
HmsApp.controller("PharmacyController", function ($scope, $routeParams, $window, $filter, $route, $modal, ItemService, IniService) {
    $scope.ReportFormats = {};
    $scope.SingleItem = {
        id: 0,
        Name: "",
        GenericName: "",
        Code: "",
        ItemTypeId: 31,
        MedicalTypeId:'' ,
        ItemCategoryId: '',
        MeasurementUnitId: '',
        SalePrice: "",
        BuyPrice: 0.00,
        ServiceProviderId: "",
        ReferralAllowed: 0,
        DefaultReferrarFee: "",
        ReportGroupId: "",


    };
    $scope.saveSuccess = 0;
    $scope.TestCategories = {};
    $scope.TestGroups = {};
    $scope.MeasureMentUnits = {};
    $scope.medicalTypeID = '';
    $scope.ItemEdit = false;


    function init() {

        $scope.$on('patientchange', function (event, args) {
            // console.log("patient changes");



            if ($scope.Patient) {
                if ($scope.Patient.Id != null) {

                    if ($routeParams.tab == "summary") {
                        loadItems();
                        $scope.loadTestCategories();
                    }
                    if ($routeParams.tab == "addpharmacy") {
                        $scope.loadAddPharmacyItem();
                    }
                }
            }


        });


        function preparetestDataModel() {
            angular.forEach($scope.TestItems, function (item) {

                item.Paid = 0;
                item.InvoiceDate = ToJavaScriptDate(item.InvoiceDate);

                //item.ServiceListPriceAfterDiscount = item.ServiceListPrice;





                angular.forEach(item.InvoicePayments, function (paymentitem) {

                    item.Paid = paymentitem.Amount + item.Paid;
                    item.selectedIcon = true;
                    item.activePosition = false;

                });


                angular.forEach(item.PatientServices, function (PatientService) {

                    if (PatientService.StatusId == 1) {
                        PatientService.Staus = "Pending";
                    } else if (PatientService.StatusId == 2) {
                        PatientService.Staus = "Completed";
                    } else if (PatientService.StatusId == 3) {
                        PatientService.Staus = "Refunded";
                    }
                    PatientService.DeliveryDate = ToJavaScriptDate(PatientService.DeliveryDate);
                    PatientService.ServiceDate = ToJavaScriptDate(PatientService.ServiceDate);

                });



                if (item.StatusId == 1) {
                    item.Staus = "Pending";
                } else if (item.StatusId == 2) {
                    item.Staus = "Completed";
                } else if (item.StatusId == 3) {
                    item.Staus = "Refunded";
                }

                if (item.TotalAmount != item.Paid) {
                    item.Staus = item.Staus + ("(Due)");
                }

            });
            // console.log($scope.invocieslist);
        }




        //$scope.selectItem=function (Item)
        //{


        //    $('.tabs li').removeClass('active');
        //    $(".addtest").addClass('active');

        //    $('div.summary').addClass('hide');
        //    $('div.listtest').addClass('hide');

        //    $(".addtest").removeClass('hide');

        //    $scope.SingleItem = Item;
        //    $scope.ItemEdit = true;

        //}




        $scope.toggleDetail = function (item) {
            //$scope.isVisible = $scope.isVisible == 0 ? true : false;
            var postion = !item.activePosition;
            if (postion) {
                // $(event.target).addClass('fa fa-arrow-down fa-2x');
                item.selectedIcon = false;
                item.activePosition = true;
            } else {

                // $(event.target).addClass('fa fa-arrow-circle-right fa-2x');
                item.selectedIcon = true;
                item.activePosition = false;

            }
        };

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
                    $scope.status = 'Unable to load  item data: ' + error.message;
                    console.log($scope.status);
                });
        }

        $scope.GetInvoicesByMedicalType = function (patientId, Status, medicalType) {
            ItemService.GetInvoicesByMedicalType(patientId, Status, medicalType)
                .success(function (pt) {
                    $scope.TestItems = pt;
                    preparetestDataModel();
                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load invoices for  test only data: ' + error.message;
                    console.log($scope.status);
                });
        }





        $scope.loadTest = function () {
            if ($scope.Patient) {
                if ($scope.Patient.Id != null) {
                    if (!$scope.TestStatus) $scope.TestStatus = 0;

                    if ($scope.patientSelection == 0) {
                        $scope.GetInvoicesByMedicalType(0, $scope.TestStatus, $scope.medicalTypeID);

                    } else {
                        $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.TestStatus, $scope.medicalTypeID);

                    }
                }
            }


        }

        $scope.reloadtest = function () {
            // if (!$scope.TestStatus) $scope.TestStatus = 0;
            if ($scope.Patient) {
                if ($scope.Patient.Id != null) {
                    if ($scope.patientSelection == 0) {
                        $scope.GetInvoicesByMedicalType(0, $scope.TestStatus, $scope.medicalTypeID);

                    } else {
                        $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.TestStatus, $scope.medicalTypeID);

                    }
                }
            }


        }







        $scope.loadTestCategories = function () {
            ItemService.loadTestCategories($scope.medicalTypeID)
                 .success(function (pt) {
                     //$scope.TestCategories = pt;
                     $scope.TestCategories = pt;
                     if (!$routeParams.id) {
                         $scope.filterCondition.ItemCategoryId = $scope.TestCategories[0].Id.toString();
                     }

                     console.log(pt);
                 })
                 .error(function (error) {
                     $scope.status = 'Unable to load test category for  test only data: ' + error.message;
                     console.log($scope.status);
                 });
        }



        $scope.loadTestGroups = function () {
            ItemService.loadTestGroups()
                .success(function (pt) {
                    $scope.TestGroups = pt;

                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load loadTestGroups for  test only data: ' + error.message;
                    console.log($scope.status);
                });
        }


        $scope.loadMeasureMentUnits = function () {
            ItemService.loadMeasureMentUnits()
                .success(function (pt) {
                    $scope.MeasureMentUnits = pt;
                    if (!$routeParams.id) {
                        $scope.filterCondition.MeasurementUnitId = $scope.MeasureMentUnits[0].Id.toString();
                    }

                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load loadMeasureMentUnits for  test only data: ' + error.message;
                    console.log($scope.status);
                });
        }
        $scope.LoadReportFomart = function (itemId) {

            ItemService.LoadReportbyId(itemId)
                .success(function (pt) {
                    $scope.ReportFormats = pt;
                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load   report  ' + error.message;
                    console.log($scope.status);
                });
        }

        $scope.LoadReportFomartByItemId = function (itemId) {

            ItemService.LoadReportbyId(itemId)
                .success(function (pt) {
                    console.log(pt);
                    return pt;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load   report  ' + error.message;
                    console.log($scope.status);
                });
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


        $scope.resetpopupFiled = function () {

            $scope.categoryName = "";
            $scope.reportGroupName = "";
            $scope.measurementUnitName = "";
        }

        /******************************* save portion ***********************************************/



        $scope.saveCategory = function () {
            ItemService.CreateCategory($scope.categoryName, $scope.medicalTypeID)
            .success(function (data) {

                $scope.loadTestCategories();
                $scope.resetpopupFiled();

                $('#popupCategory').css("visibility", "hidden");
                $('#popupCategory').css("opacity", 0);

            })
            .error(function (error) {
                $scope.status = 'Unable to save category data: ' + error.message;

            });

        }




        $scope.saveReportGroup = function () {
            ItemService.CreateReportGroup($scope.reportGroupName)
            .success(function (data) {

                $scope.loadTestGroups();
                $scope.resetpopupFiled();

                $('#popupReportGroup').css("visibility", "hidden");
                $('#popupReportGroup').css("opacity", 0);

            })
            .error(function (error) {
                $scope.status = 'Unable to save category data: ' + error.message;

            });

        }
        $scope.filterCondition = {
            MeasurementUnitId: '62',
            ItemCategoryId: '41',
            ReportGroupId: "",
            CategoryId: "0"


        }

        $scope.LoadFilterCondition = function () {
            $scope.filterCondition.MeasurementUnitId = $scope.SingleItem.MeasurementUnitId.toString();
            $scope.filterCondition.ItemCategoryId = $scope.SingleItem.ItemCategoryId.toString();
            if ($scope.SingleItem.ReportGroupId != null) {
                $scope.filterCondition.ReportGroupId = $scope.SingleItem.ReportGroupId.toString()
            };
        }

        $scope.saveMeasurementUnit = function () {
            ItemService.CreateMeasurementUnit($scope.measurementUnitName)
            .success(function (data) {

                $scope.loadMeasureMentUnits();
                $scope.resetpopupFiled();

                $('#popupMeasurementUnit').css("visibility", "hidden");
                $('#popupMeasurementUnit').css("opacity", 0);

            })
            .error(function (error) {
                $scope.status = 'Unable to save category data: ' + error.message;

            });

        }
        $scope.ReloadPage = function () {
            if (!$routeParams.id) {
                // location.reload();
                $route.reload();
            }
        }

        $scope.saveItem = function () {

            $scope.SingleItem.MeasurementUnitId = $scope.filterCondition.MeasurementUnitId;
            $scope.SingleItem.ItemCategoryId = $scope.filterCondition.ItemCategoryId;
            $scope.SingleItem.ReportGroupId = $scope.filterCondition.ReportGroupId;


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



        /*----------------------------- save end ----------------------------------------------------*/


        /*---------------------------------------- delete ------------------------------------------------*/




        $scope.DeleteReportFormat = function (ReportFormatID) {

            ItemService.DeleteReportFormat(ReportFormatID)
                .success(function (data) {

                    $scope.loadItembyId($scope.SingleItem.Id);

                    console.log("delete  report format successfull");

                })
                .error(function (error) {
                    $scope.status = 'Unable to  report format  data: ' + error.message;

                });

        }
        // code added by zaber
        $scope.deletePharmacy = function (itemId) {


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
        $scope.validateInput = {
            submit: function (form) {
                if (form.$valid) {
                    $scope.valid = true;
                }
            }
        }
        // end by zaber
        /*----------------------------------------delete end -----------------------------------------------*/

        //------------------------------- Modal open portion -------------------------------------------------------------


        $scope.openResultTemplate = function (size, isEdit, PatientServiceItem, Testitem) {



            var modalInstance = $modal.open({
                templateUrl: '/ClientCode/Template/ReportTemplateResult.html',
                size: size,
                controller: 'LabReportTemplateResultModalController',
                scope: $scope,
                resolve:
                {
                    isEdit: function () {
                        return isEdit;
                    },
                    PatientServiceItem: function () {
                        return PatientServiceItem;
                    },
                    LabTestItem: function () {
                        return labTestitem;
                    }
                }
            });




            modalInstance.result.then(function (result) {

            }, function () {



                console.log('Modal dismissed at: ' + new Date());

            });

        };


        $scope.openTemplate = function (size, isEdit, ReportID) {


            var modalInstance = $modal.open({
                templateUrl: '/ClientCode/Template/ReportTemplate.html',
                size: size,
                controller: 'LabReportTemplateModalController',
                scope: $scope,
                resolve:
                {
                    isEdit: function () {
                        return isEdit;
                    },
                    labReportID: function () {
                        return ReportID;
                    }
                }
            });
            modalInstance.result.then(function (result) {

            }, function () {

                $scope.loadItembyId($scope.SingleItem.Id);
                console.log('Modal dismissed at: ' + new Date());

            });


        };

        $scope.StockModal = function (size, isEdit) {


            var modalInstance = $modal.open({
                templateUrl: '/ClientCode/Template/AddStock.html',
                size: size,
                controller: 'PharmacyStockModelController',
                scope: $scope
            });
            modalInstance.result.then(function (result) {

            }, function () {

                console.log('Modal dismissed at: ' + new Date());

            });


        };


        //----------------------------------------------------------------------------------------------------




        $scope.loadAddPharmacyItem = function () {
            if ($routeParams.tab == "addpharmacy") {

                //  $scope.LabTestCategories =  $scop
                // $scope.LabTestGroups = 
                // $scope.MeasureMentUnits = 

                /* $scope.loadLabTestGroups();
                $scope.loadMeasureMentUnits();*/


                if ($routeParams.id) {
                    $scope.loadItembyId($routeParams.id);
                }
                $scope.loadTestCategories();

                $scope.loadMeasureMentUnits();
            }
        }
        if ($routeParams.tab == "addpharmacy") {
            $scope.loadAddPharmacyItem();
        }

        if ($routeParams.tab == "summary") {
            $scope.loadItems();
            $scope.loadTestCategories();
        }


        var tabClass = ".summary";
        if ($routeParams.tab != null) {
            tabClass = "." + $routeParams.tab;
        }
        $('.tabs li').removeClass('active');
        $(tabClass).addClass('active');
        $(tabClass).removeClass('hide');

    }

    /*------------------------- configuration begin -------------------------*/

    $scope.GetConfiguration = function () {

        IniService.GetConfiguration()
            .success(function (data) {

                $scope.Configuration = data;


                $scope.medicalTypeID = $scope.Configuration.Configuration.MedicalTypeDrug.toString();
                $scope.SingleItem.MedicalTypeId = $scope.Configuration.Configuration.MedicalTypeDrug;
                $scope.NonRegisterPatientId = $scope.Configuration.Configuration.NonRegisterPatientId;
                $scope.ServiceProviderType = $scope.Configuration.Configuration.DoctorTypeId;
                $scope.SingleItem.ItemTypeId = $scope.Configuration.Configuration.ServiceItem;
                $scope.medicalTypeIDLab = $scope.Configuration.Configuration.MedicalTypeLabTest.toString();

                init();

            }).error(function (error) {

                $scope.status = 'Unable to Discharge Admission: ' + error.message;
                console.log($scope.status);

            });

    }

    $scope.GetConfiguration();

    /*------------------------- configuration end -------------------------*/
});