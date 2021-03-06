﻿'use strict';

HmsApp.controller("LabTestController", function ($scope, $routeParams, $window, $filter, $modal, $route, LabTestService, IniService) {

    $scope.LabReportFormats = {};
    $scope.SingleLabItem = {
        id: 0,
        Name: "",
        GenericName: "",
        Code: "",
        ItemTypeId: "",
        MedicalTypeId: "",
        ItemCategoryId: "",
        MeasurementUnitId: "",
        SalePrice: "",
        BuyPrice: 0.00,
        ServiceProviderId: "",
        ReferralAllowed: 1,
        DefaultReferrarFee: "",
        LabReportGroupId: "",


    };
    $scope.SingleReagentItem = {
        id: 0,
        Name: "",
        GenericName: "",
        Code: "",
        ItemTypeId: "",
        MedicalTypeId: "",
        ItemCategoryId: "",
        MeasurementUnitId: "",
        SalePrice:0.00,
        BuyPrice: 0.00,
        ServiceProviderId: "",
        ReferralAllowed: 1,
        DefaultReferrarFee: "",
        LabReportGroupId: "",


    };
    
    $scope.saveSuccess = 0;
    $scope.LabTestCategories = {};
    $scope.ReagentCategories = {};
    $scope.LabTestGroups = {};
    $scope.MeasureMentUnits = {};
    $scope.medicalTypeID = "";
    $scope.LabItemEdit = false;
    $scope.patientSelection = 1;
    

    function init() {

        $scope.$on('patientchange', function (event, args) {


            if ($scope.Patient) {
                if ($scope.Patient.Id != null) {
                    // console.log("patient changes");
                    if ($routeParams.tab == "addlabtest") {


                        if ($routeParams.id) {
                            $scope.loadItembyId($routeParams.id);
                        }
                        $scope.loadLabTestCategories();
                        $scope.loadLabTestGroups();
                        $scope.loadMeasureMentUnits();

                    }

                    if ($routeParams.tab == "listlabtest") {

                        $scope.loadLabItems();
                        $scope.loadLabTestCategories();
                    }


                    if ($routeParams.tab == "summary") {


                        $scope.reloadlabtest();
                    }
                }
            }
        });


        $scope.MarkAsDelvered = function (labtestInvoice) {
            labtestInvoice.LabStatusId = 3;


            angular.forEach(labtestInvoice.PatientServices, function (PatientService) {

                if (!PatientService.Refund)
                    PatientService.LabStatusId = 3;

            });




            LabTestService.UpdateLabItem(labtestInvoice)
            .success(function (pt) {

                $scope.loadLabTest();



                console.log(pt);
            })
        .error(function (error) {
            $scope.status = 'Unable upadate status to mark as delivered: ' + error.message;
            console.log($scope.status);
        });



        }

        function preparelabtestDataModel() {
            angular.forEach($scope.labTestItems, function (item) {

                item.Paid = 0;
                item.InvoiceDate = ToJavaScriptDate(item.InvoiceDate);
                item.DueDate = ToJavaScriptDate(item.DueDate);

                //item.ServiceListPriceAfterDiscount = item.ServiceListPrice;





                angular.forEach(item.InvoicePayments, function (paymentitem) {

                    item.Paid = paymentitem.Amount + item.Paid;


                });


                angular.forEach(item.PatientServices, function (PatientService) {

                    if (PatientService.LabStatusId == 1) {
                        PatientService.Staus = "Pending";
                    } else if (PatientService.LabStatusId == 2) {
                        PatientService.Staus = "Completed";
                    } else if (PatientService.LabStatusId == 3) {
                        PatientService.Staus = "Delivered";
                    }
                    PatientService.DeliveryDate = ToJavaScriptDate(PatientService.DeliveryDate);
                    PatientService.ServiceDate = ToJavaScriptDate(PatientService.ServiceDate);

                    item.selectedIcon = true;
                    item.activePosition = false;

                });



                if (item.LabStatusId == 1) {
                    item.Staus = "Pending";
                } else if (item.LabStatusId == 2) {
                    item.Staus = "Completed";
                } else if (item.LabStatusId == 3) {
                    item.Staus = "Delivered";
                }

                if (item.IsRefunded) {
                    item.Staus = item.Staus + "  (Refunded)";
                }

                if (item.TotalAmount != item.Paid) {
                    item.Staus = item.Staus + ("(Due)");
                }

            });
            // console.log($scope.invocieslist);
        }




        //$scope.selectLabItem=function (LabItem)
        //{


        //    $('.tabs li').removeClass('active');
        //    $(".addlabtest").addClass('active');

        //    $('div.summary').addClass('hide');
        //    $('div.listlabtest').addClass('hide');

        //    $(".addlabtest").removeClass('hide');

        //    $scope.SingleLabItem = LabItem;
        //    $scope.LabItemEdit = true;

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

        $scope.loadLabItems = function () {



            $scope.GetLabItemsByMedicalType($scope.medicalTypeID);



        }

        $scope.GetLabItemsByMedicalType = function (medicalType) {
            LabTestService.GetLabItemsByMedicalType(medicalType, $scope.filterCondition.CategoryId)
                .success(function (pt) {
                    $scope.Labitems = pt;
                    // preparelabtestDataModel();
                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load lab item data: ' + error.message;
                    console.log($scope.status);
                });
        }

        $scope.GetInvoicesByMedicalType = function (patientId, labStatus, medicalType) {
            LabTestService.GetInvoicesByMedicalType(patientId, labStatus, medicalType, $scope.invoiceDateStart, $scope.invoiceDateEnd, $scope.invoiceId)
                .success(function (pt) {
                    $scope.labTestItems = pt;
                    preparelabtestDataModel();
                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load invoices for lab test only data: ' + error.message;
                    console.log($scope.status);
                });
        }



        $scope.ReloadPage = function () {
            if (!$routeParams.id) {
                // location.reload();
                $route.reload();
            }
        }

        $scope.loadLabTest = function () {
            if ($scope.Patient) {
                if ($scope.Patient.Id != null) {
                    if (!$scope.LabTestStatus) $scope.LabTestStatus = "0";

                    if ($scope.patientSelection == 1) {
                        $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.LabTestStatus, $scope.medicalTypeID);
                    } else {
                        $scope.GetInvoicesByMedicalType(0, $scope.LabTestStatus, $scope.medicalTypeID);
                    }

                }
            } else {
                if (!$scope.LabTestStatus) $scope.LabTestStatus = "0";
                if ($scope.patientSelection == 1) {
                    // $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.LabTestStatus, $scope.medicalTypeID);
                } else {
                    $scope.GetInvoicesByMedicalType(0, $scope.LabTestStatus, $scope.medicalTypeID);
                }


            }



        }

        $scope.reloadlabtest = function () {
            // if (!$scope.LabTestStatus) $scope.LabTestStatus = 0;
            if ($scope.Patient) {
                if ($scope.Patient.Id != null) {

                    if ($scope.patientSelection == 1) {
                        $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.LabTestStatus, $scope.medicalTypeID);

                    } else {
                        $scope.GetInvoicesByMedicalType(0, $scope.LabTestStatus, $scope.medicalTypeID);
                    }

                }
            } else {
                if ($scope.patientSelection == 1) {
                    $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.LabTestStatus, $scope.medicalTypeID);

                } else {
                    $scope.GetInvoicesByMedicalType(0, $scope.LabTestStatus, $scope.medicalTypeID);
                }
            }


        }







        $scope.loadLabTestCategories = function () {
            LabTestService.loadLabTestCategories($scope.medicalTypeID)
                .success(function (pt) {
                    //$scope.LabTestCategories = pt;
                    $scope.LabTestCategories = pt;

                    if (!$routeParams.id && $scope.LabTestCategories.length>0) {
                        $scope.filterCondition.ItemCategoryId = $scope.LabTestCategories[0].Id.toString();
                    }



                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load labtest category for lab test only data: ' + error.message;
                    console.log($scope.status);
                });
        }



        $scope.loadLabTestGroups = function () {
            LabTestService.loadLabTestGroups()
                .success(function (pt) {
                    $scope.LabTestGroups = pt;

                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load loadLabTestGroups for lab test only data: ' + error.message;
                    console.log($scope.status);
                });
        }


        $scope.loadMeasureMentUnits = function () {
            LabTestService.loadMeasureMentUnits()
                .success(function (pt) {
                    $scope.MeasureMentUnits = pt;

                    if (!$routeParams.id) {
                        if ($scope.MeasureMentUnits.length>0)
                        $scope.filterCondition.MeasurementUnitId = $scope.MeasureMentUnits[0].Id.toString();
                    }

                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load loadMeasureMentUnits for lab test only data: ' + error.message;
                    console.log($scope.status);
                });
        }
        $scope.LoadReportFomart = function (itemId) {

            LabTestService.LoadLabReportbyId(itemId)
                .success(function (pt) {
                    $scope.LabReportFormats = pt;


                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load  lab report  ' + error.message;
                    console.log($scope.status);
                });
        }

        $scope.LoadReportFomartByItemId = function (itemId) {

            LabTestService.LoadLabReportbyId(itemId)
                .success(function (pt) {
                    console.log(pt);
                    return pt;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load  lab report  ' + error.message;
                    console.log($scope.status);
                });
        }

        $scope.loadItembyId = function (itemid) {

            LabTestService.loadItembyId(itemid)
                .success(function (pt) {
                    $scope.SingleLabItem = pt;
                    $scope.LoadFilterCondition();

                    $scope.LoadReportFomart($scope.SingleLabItem.Id);

                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load single lab item ' + error.message;
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
            LabTestService.CreateCategory($scope.categoryName, $scope.medicalTypeID)
            .success(function (data) {

                $scope.loadLabTestCategories();
                $scope.resetpopupFiled();

                $('#popupCategory').css("visibility", "hidden");
                $('#popupCategory').css("opacity", 0);

            })
            .error(function (error) {
                $scope.status = 'Unable to save category data: ' + error.message;

            });

        }




        $scope.saveReportGroup = function () {
            LabTestService.CreateReportGroup($scope.reportGroupName)
            .success(function (data) {

                $scope.loadLabTestGroups();
                $scope.resetpopupFiled();

                $('#popupLabReportGroup').css("visibility", "hidden");
                $('#popupLabReportGroup').css("opacity", 0);

            })
            .error(function (error) {
                $scope.status = 'Unable to save category data: ' + error.message;

            });

        }
        $scope.filterCondition = {
            MeasurementUnitId: '',
            ItemCategoryId: '',
            LabReportGroupId: "",
            CategoryId: "0",
            ReagentItemCategoryId: '',
            ReagentCategoryId:"0"


        }

        $scope.LoadFilterCondition = function () {
          //  $scope.filterCondition.MeasurementUnitId = $scope.SingleLabItem.MeasurementUnitId.toString();
            $scope.filterCondition.ItemCategoryId = $scope.SingleLabItem.ItemCategoryId.toString();
            if ($scope.SingleLabItem.LabReportGroupId != null) {
                $scope.filterCondition.LabReportGroupId = $scope.SingleLabItem.LabReportGroupId.toString()
            };
        }

        $scope.saveMeasurementUnit = function () {
            LabTestService.CreateMeasurementUnit($scope.measurementUnitName)
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


        $scope.saveItem = function () {

            $scope.SingleLabItem.MeasurementUnitId = null;
            $scope.SingleLabItem.ItemCategoryId = $scope.filterCondition.ItemCategoryId;
            $scope.SingleLabItem.LabReportGroupId = $scope.filterCondition.LabReportGroupId;


            LabTestService.SaveItem($scope.SingleLabItem)
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




        $scope.DeleteReportFormat = function (labReportFormatID) {

            LabTestService.DeleteReportFormat(labReportFormatID)
                .success(function (data) {

                    $scope.loadItembyId($scope.SingleLabItem.Id);

                    console.log("delete lab report format successfull");

                })
                .error(function (error) {
                    $scope.status = 'Unable to lab report format  data: ' + error.message;

                });

        }
        // code added by zaber
        $scope.deleteLabTest = function (labitemId) {


            LabTestService.deleteLabTest(labitemId)
           .success(function (data) {

               //$scope.getDoctorWithReferrel();
               $scope.GetLabItemsByMedicalType($scope.medicalTypeID);
               $scope.status = 'Delete Successful';
               //$window.alert("Delete Successful!");
               //return;

           })
           .error(function (error) {
               $scope.status = 'Unable to delete referral comission: ' + error.message;
               console.log($scope.status);
           });

        }
        // end by zaber
        /*----------------------------------------delete end -----------------------------------------------*/

        //------------------------------- Modal open portion -------------------------------------------------------------


        $scope.openResultTemplate = function (size, isEdit, PatientServiceItem, labTestitem) {



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
               // $scope.loadLabTest();

            });

        };


        $scope.openTemplate = function (size, isEdit, labReportID) {


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
                        return labReportID;
                    }
                }
            });
            modalInstance.result.then(function (result) {

            }, function () {

                $scope.loadItembyId($scope.SingleLabItem.Id);
                console.log('Modal dismissed at: ' + new Date());

            });


        };

        $scope.CommissionModal = function (size, isEdit) {


            var modalInstance = $modal.open({
                templateUrl: '/ClientCode/Template/DoctorCommission.html',
                size: size,
                controller: 'CommissionModalController',
                scope: $scope,

            });
            modalInstance.result.then(function (result) {

            }, function () {

                console.log('Modal dismissed at: ' + new Date());

            });


        };


        $scope.ReagentModal = function (size, isEdit,item) {


            var modalInstance = $modal.open({
                templateUrl: '/ClientCode/Template/Reagent.html',
                size: size,
                controller: 'ReagentModalController',
                scope: $scope,
                resolve:
                        {
                            item: function () {
                                return item;
                            }
                        }
            });
            modalInstance.result.then(function (result) {

            }, function () {

                console.log('Modal dismissed at: ' + new Date());

            });


        };

        $scope.saveReagentCategory = function () {
            LabTestService.CreateCategory($scope.categoryName, $scope.MedicalTypeReagent)
            .success(function (data) {

                $scope.loadReagentCategories();
                $scope.resetpopupFiled();

                $('#popupCategoryReagent').css("visibility", "hidden");
                $('#popupCategoryReagent').css("opacity", 0);

            })
            .error(function (error) {
                $scope.status = 'Unable to save category data: ' + error.message;

            });

        }

        $scope.saveReagentItem = function () {

            $scope.SingleReagentItem.MeasurementUnitId = $scope.filterCondition.MeasurementUnitId;
            $scope.SingleReagentItem.ItemCategoryId = $scope.filterCondition.ReagentItemCategoryId;
           


            LabTestService.SaveItem($scope.SingleReagentItem)
            .success(function (data) {

                $scope.loadItembyId(data);
                $scope.saveSuccess = 1;
                console.log("Save successfull");

            })
            .error(function (error) {
                $scope.status = 'Unable to save category data: ' + error.message;

            });
        }


        $scope.loadReagentItems = function () {

            $scope.GetReagentItemsByMedicalType($scope.MedicalTypeReagent);

        }

        $scope.GetReagentItemsByMedicalType = function (medicalType) {
            LabTestService.GetLabItemsByMedicalType(medicalType, $scope.filterCondition.ReagentCategoryId)
                .success(function (pt) {
                    $scope.ReagentItems = pt;
                    // preparelabtestDataModel();
                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load lab item data: ' + error.message;
                    console.log($scope.status);
                });
        }


        $scope.loadReagentCategories = function () {
            LabTestService.loadLabTestCategories($scope.MedicalTypeReagent)
                 .success(function (pt) {
                     //$scope.TestCategories = pt;
                     $scope.ReagentCategories = pt;
                     if (!$routeParams.id && $scope.ReagentCategories.length > 0) {
                         $scope.filterCondition.ReagentItemCategoryId = $scope.ReagentCategories[0].Id.toString();
                     }

                     console.log(pt);
                 })
                 .error(function (error) {
                     $scope.status = 'Unable to load test category for  test only data: ' + error.message;
                     console.log($scope.status);
                 });
        }


        $scope.LoadReagentFilterCondition = function () {
            $scope.filterCondition.MeasurementUnitId = $scope.SingleReagentItem.MeasurementUnitId.toString();
            $scope.filterCondition.ReagentItemCategoryId = $scope.SingleReagentItem.ItemCategoryId.toString();
 
        }
        $scope.LoadReagentItembyId = function (itemid) {

            LabTestService.loadItembyId(itemid)
                .success(function (pt) {
                    $scope.SingleReagentItem = pt;
                    $scope.LoadReagentFilterCondition();



                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load single lab item ' + error.message;
                    console.log($scope.status);
                });
        }

        $scope.loadReagent = function () {
            if ($routeParams.tab == "addreagent") {

                //  $scope.LabTestCategories =  $scop
                // $scope.LabTestGroups = 
                // $scope.MeasureMentUnits = 

                /* $scope.loadLabTestGroups();
                $scope.loadMeasureMentUnits();*/

                $scope.loadReagentCategories();

                $scope.loadMeasureMentUnits();

                if ($routeParams.id) {
                    $scope.LoadReagentItembyId($routeParams.id);
                }

            }
        }

        //----------------------------------------------------------------------------------------------------




        if ($routeParams.tab == "addlabtest") {

            //  $scope.LabTestCategories =  $scop
            // $scope.LabTestGroups = 
            // $scope.MeasureMentUnits = 

            /* $scope.loadLabTestGroups();
            $scope.loadMeasureMentUnits();*/


            if ($routeParams.id) {
                $scope.loadItembyId($routeParams.id);
            }
            $scope.loadLabTestCategories();
            $scope.loadLabTestGroups();
            $scope.loadMeasureMentUnits();
        }
        if ($routeParams.tab == "listlabtest") {
            $scope.loadLabItems();
            $scope.loadLabTestCategories();
        }
        if ($routeParams.tab == "summary") {
            $scope.loadLabTest();
        }

        if ($routeParams.tab == "addreagent") {
            $scope.loadReagent();
        }
        if ($routeParams.tab == "listreagent") {
            $scope.loadReagentItems();
            $scope.loadReagentCategories();
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


                $scope.medicalTypeID = $scope.Configuration.Configuration.MedicalTypeLabTest.toString();
                $scope.SingleLabItem.MedicalTypeId = $scope.Configuration.Configuration.MedicalTypeLabTest;
                $scope.NonRegisterPatientId = $scope.Configuration.Configuration.NonRegisterPatientId;
                $scope.ServiceProviderType = $scope.Configuration.Configuration.DoctorTypeId;
                $scope.SingleLabItem.ItemTypeId = $scope.Configuration.Configuration.ServiceItem;
                $scope.medicalTypeIDLab = $scope.Configuration.Configuration.MedicalTypeLabTest.toString();
                $scope.MedicalTypeReagent = $scope.Configuration.Configuration.MedicalTypeReagent.toString();
                $scope.SingleReagentItem.MedicalTypeId = $scope.Configuration.Configuration.MedicalTypeReagent;
                $scope.SingleReagentItem.ItemTypeId = $scope.Configuration.Configuration.InventoryItem;
                $scope.Currency = $scope.Configuration.Configuration.Currency;
                $scope.LabTestStatus = "0";

                init();

            }).error(function (error) {

                $scope.status = 'Unable to Discharge Admission: ' + error.message;
                console.log($scope.status);

            });

    }

    $scope.GetConfiguration();

    /*------------------------- configuration end -------------------------*/

});