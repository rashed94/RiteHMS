//'use strict';
//HmsApp.controller("BedSetupController", function ($scope, $routeParams, $window, $filter, $modal, BillingService) {

//    var tabClass = ".summary";
//    if ($routeParams.tab != null) {
//        tabClass = "." + $routeParams.tab;
//    }
//    $('.tabs li').removeClass('active');
//    $(tabClass).addClass('active');
//    $(tabClass).removeClass('hide');


//});

'use strict';
HmsApp.controller("BedSetupController", function ($scope, $routeParams, $window, $filter, $modal, LabTestService) {
    $scope.LabReportFormats = {};
    $scope.SingleLabItem = {
        id: 0,
        Name: "",
        GenericName: "",
        Code: "",
        ItemTypeId: 31,
        MedicalTypeId: 64,
        ItemCategoryId: 38,
        MeasurementUnitId: 62,
        SalePrice: "",
        BuyPrice: 0.00,
        ServiceProviderId: "",
        ReferralAllowed: 0,
        DefaultReferrarFee: "",
        LabReportGroupId: "",


    };
    $scope.saveSuccess = 0;
    $scope.LabTestCategories = {};
    $scope.LabTestGroups = {};
    $scope.MeasureMentUnits = {};
    $scope.medicalTypeID = 64;
    $scope.LabItemEdit = false;

    $scope.$on('patientchange', function (event, args) {
        // console.log("patient changes");
        if ($routeParams.tab == "addlabtest") {

        }

        if ($routeParams.tab == "listlabtest") {

            $scope.GetLabItemsByMedicalType($scope.medicalTypeID);
        }


        if ($routeParams.tab == "summary") {


            if ($scope.Patient) {
                if ($scope.Patient.Id != null) {
                    if (!$scope.LabTestStatus) $scope.LabTestStatus = 0;

                    $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.LabTestStatus, $scope.medicalTypeID);
                }
            }

        }
    });


    function preparelabtestDataModel() {
        angular.forEach($scope.labTestItems, function (item) {

            item.Paid = 0;
            item.InvoiceDate = ToJavaScriptDate(item.InvoiceDate);

            //item.ServiceListPriceAfterDiscount = item.ServiceListPrice;





            angular.forEach(item.InvoicePayments, function (paymentitem) {

                item.Paid = paymentitem.Amount + item.Paid;
                item.selectedIcon = true;
                item.activePosition = false;

            });


            angular.forEach(item.PatientServices, function (PatientService) {

                if (PatientService.LabStatusId == 1) {
                    PatientService.Staus = "Pending";
                } else if (PatientService.LabStatusId == 2) {
                    PatientService.Staus = "Completed";
                } else if (PatientService.LabStatusId == 3) {
                    PatientService.Staus = "Refunded";
                }
                PatientService.DeliveryDate = ToJavaScriptDate(PatientService.DeliveryDate);
                PatientService.ServiceDate = ToJavaScriptDate(PatientService.ServiceDate);

            });



            if (item.LabStatusId == 1) {
                item.Staus = "Pending";
            } else if (item.LabStatusId == 2) {
                item.Staus = "Completed";
            } else if (item.LabStatusId == 3) {
                item.Staus = "Refunded";
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

    $scope.loadItems = function () {



        $scope.GetLabItemsByMedicalType($scope.medicalTypeID);



    }

    $scope.GetLabItemsByMedicalType = function (medicalType) {
        LabTestService.GetLabItemsByMedicalType(medicalType)
            .success(function (pt) {
                $scope.items = pt;
                // preparelabtestDataModel();
                console.log(pt);
            })
            .error(function (error) {
                $scope.status = 'Unable to load lab item data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.GetInvoicesByMedicalType = function (patientId, labStatus, medicalType) {
        LabTestService.GetInvoicesByMedicalType(patientId, labStatus, medicalType)
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





    $scope.loadLabTest = function () {
        if ($scope.Patient) {
            if ($scope.Patient.Id != null) {
                if (!$scope.LabTestStatus) $scope.LabTestStatus = 0;

                if ($scope.patientSelection == 0) {
                    $scope.GetInvoicesByMedicalType(0, $scope.LabTestStatus, $scope.medicalTypeID);

                } else {
                    $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.LabTestStatus, $scope.medicalTypeID);

                }
            }
        }


    }

    $scope.reloadlabtest = function () {
        // if (!$scope.LabTestStatus) $scope.LabTestStatus = 0;
        if ($scope.Patient) {
            if ($scope.Patient.Id != null) {
                if ($scope.patientSelection == 0) {
                    $scope.GetInvoicesByMedicalType(0, $scope.LabTestStatus, $scope.medicalTypeID);

                } else {
                    $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.LabTestStatus, $scope.medicalTypeID);

                }
            }
        }


    }







    $scope.loadLabTestCategories = function () {
        LabTestService.loadLabTestCategories($scope.medicalTypeID)
            .success(function (pt) {
                //$scope.LabTestCategories = pt;
                $scope.LabTestCategories = pt

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
        MeasurementUnitId: '62',
        ItemCategoryId: '41',
        LabReportGroupId: ""


    }

    $scope.LoadFilterCondition = function () {
        $scope.filterCondition.MeasurementUnitId = $scope.SingleLabItem.MeasurementUnitId.toString();
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

        $scope.SingleLabItem.MeasurementUnitId = $scope.filterCondition.MeasurementUnitId;
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
    $scope.deletePharmacy = function (labitemId) {


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
            templateUrl: '/ClientCode/Template/AddStock.html',
            size: size,
            controller: 'CommissionModalController',
            scope: $scope
        });
        modalInstance.result.then(function (result) {

        }, function () {

            console.log('Modal dismissed at: ' + new Date());

        });


    };


    //----------------------------------------------------------------------------------------------------




    if ($routeParams.tab == "addbed") {

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
    var tabClass = ".summary";
    if ($routeParams.tab != null) {
        tabClass = "." + $routeParams.tab;
    }
    $('.tabs li').removeClass('active');
    $(tabClass).addClass('active');
    $(tabClass).removeClass('hide');

    $scope.cancel=function()
    {
        $window.location.href = '#/bedsetup/summary';
    }


});