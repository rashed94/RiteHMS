'use strict';

HmsApp.controller("LabTestController", function ($scope, $routeParams, $window, $filter, $modal, LabTestService) {


    $scope.SingleLabItem = {

        Name: "",
        GenericName:"",
        Code:"",
        ItemTypeId:32,
        MedicalTypeId:62,
        ItemCategoryId:41,
        MeasurementUnitId:62,
        SalePrice:0.00,
        BuyPrice:0.00,
        ServiceProviderId:0,
        ReferralAllowed:1,
        DefaultReferrarFee:0.00,
        LabReportGroupId:0,


    };
    $scope.LabTestCategories = {};
    $scope.LabTestGroups = {};
    $scope.MeasureMentUnits = {};
    $scope.medicalTypeID = 62;
    $scope.LabItemEdit = false;

    $scope.$on('patientchange', function (event, args) {
        // console.log("patient changes");
        if ($routeParams.tab == "addlabtest") {

        }

        if ($routeParams.tab == "listlabtest") {

            $scope.GetLabItemsByMedicalType( $scope.medicalTypeID);
        }


        if ($routeParams.tab == "summary") {


            if ($scope.Patient) {
                if ($scope.Patient.Id != null) {
                    if (!$scope.LabTestStatus) $scope.LabTestStatus = 0;

                    $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.LabTestStatus,  $scope.medicalTypeID);
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

            });



            if (item.LabStatusId == 1) {
                item.Staus = "Pending";
            } else if (item.LabStatusId == 2) {
                item.Staus = "Completed";
            } else if (item.LabStatusId == 3) {
                item.Staus = "Refunded";
            }

            if (item.TotalAmount != item.Paid) {
                item.Staus = item.Staus+("(Due)");
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
       
         

                $scope.GetLabItemsByMedicalType( $scope.medicalTypeID);


       
    }

    $scope.GetLabItemsByMedicalType = function (medicalType) {
        LabTestService.GetLabItemsByMedicalType(medicalType)
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

    $scope.GetInvoicesByMedicalType = function (patientId, labStatus,medicalType) {
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





    $scope.loadLabTest=function()
    {
        if ($scope.Patient) {
            if ($scope.Patient.Id != null) {
                if (!$scope.LabTestStatus) $scope.LabTestStatus = 0;

                if ($scope.patientSelection == 0) {
                    $scope.GetInvoicesByMedicalType(0, $scope.LabTestStatus,  $scope.medicalTypeID);

                } else {
                    $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.LabTestStatus,  $scope.medicalTypeID);

                }
            }
        }

        
    }

    $scope.reloadlabtest = function () {
       // if (!$scope.LabTestStatus) $scope.LabTestStatus = 0;
        if ($scope.Patient) {
            if ($scope.Patient.Id != null) {
                if ($scope.patientSelection == 0) {
                    $scope.GetInvoicesByMedicalType(0, $scope.LabTestStatus,  $scope.medicalTypeID);

                } else {
                    $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.LabTestStatus,  $scope.medicalTypeID);

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

    $scope.loadItembyId= function(itemid)
    {

        LabTestService.loadItembyId(itemid)
            .success(function (pt) {
                $scope.SingleLabItem = pt;

            console.log(pt);
            })
            .error(function (error) {
            $scope.status = 'Unable to load single lab item ' + error.message;
            console.log($scope.status);
            });
    }




    if ($routeParams.tab == "addlabtest") {

      //  $scope.LabTestCategories =  $scop
       // $scope.LabTestGroups = 
        // $scope.MeasureMentUnits = 
     
        /* $scope.loadLabTestGroups();
        $scope.loadMeasureMentUnits();*/
       

        if($routeParams.id)
        {
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


});