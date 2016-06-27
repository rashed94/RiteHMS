
'use strict';


HmsApp.controller("BedSetupController", function ($scope, $routeParams, $window, $filter, $modal, BedSetupService, PatientService) {
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
    $scope.addPatientSuccess = 0;
    $scope.LabTestCategories = {};
    $scope.LabTestGroups = {};
    $scope.MeasureMentUnits = {};
    $scope.medicalTypeID = 64;
    $scope.LabItemEdit = false;

    $scope.isSamePatient = 0;



    $scope.$on('patientchange', function (event, args) {
        // console.log("patient changes");
        if ($routeParams.tab == "addlabtest") {

        }

        if ($routeParams.tab == "listlabtest") {

            $scope.GetItemsByMedicalType($scope.medicalTypeID);
        }


        if ($routeParams.tab == "summary") {


            //if ($scope.Patient) {
            //    if ($scope.Patient.Id != null) {
            //        if (!$scope.LabTestStatus) $scope.LabTestStatus = 0;

            //        $scope.GetInvoicesByMedicalType($scope.Patient.Id, $scope.LabTestStatus, $scope.medicalTypeID);
            //    }
            //}

        }
    });



    $scope.loaditembyCategory = function () {

        BedSetupService.GetItemsByMedicalType($scope.medicalTypeID, $scope.filterCondition.ItemCategoryId)
    .success(function (pt) {
        $scope.items = pt;
        // preparelabtestDataModel();
        //$scope.loadBedOccupancyByItemId(itemID);
        console.log(pt);
    })
    .error(function (error) {
        $scope.status = 'Unable to load bed item data: ' + error.message;
        console.log($scope.status);
    });


    }
    $scope.loadItems = function () {



        $scope.GetItemsByMedicalType($scope.medicalTypeID);



    }

    $scope.GetItemsByMedicalType = function (medicalType) {
        BedSetupService.GetItemsByMedicalType(medicalType)
            .success(function (pt) {
                $scope.items = pt;
                // preparelabtestDataModel();
                //$scope.loadBedOccupancyByItemId(itemID);
                console.log(pt);
            })
            .error(function (error) {
                $scope.status = 'Unable to load bed item data: ' + error.message;
                console.log($scope.status);
            });
    }



    $scope.loadLabTestCategories = function () {
        BedSetupService.loadLabTestCategories($scope.medicalTypeID)
            .success(function (pt) {
                //$scope.LabTestCategories = pt;
                $scope.LabTestCategories = pt;

                //$scope.filterCondition.ItemCategoryId = $scope.LabTestCategories[0].Id;

                console.log(pt);
            })
            .error(function (error) {
                $scope.status = 'Unable to load labtest category for lab test only data: ' + error.message;
                console.log($scope.status);
            });
    }



    $scope.loadItembyId = function (itemid) {

        BedSetupService.loadItembyId(itemid)
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


    $scope.filterCondition = {
        MeasurementUnitId: '62',
        ItemCategoryId: '0',
        LabReportGroupId: ""

    }

    $scope.LoadFilterCondition = function () {
        $scope.filterCondition.MeasurementUnitId = $scope.SingleLabItem.MeasurementUnitId.toString();
        $scope.filterCondition.ItemCategoryId = $scope.SingleLabItem.ItemCategoryId.toString();
        if ($scope.SingleLabItem.LabReportGroupId != null) {
            $scope.filterCondition.LabReportGroupId = $scope.SingleLabItem.LabReportGroupId.toString()
        };
    }




    $scope.saveItem = function () {

        $scope.SingleLabItem.MeasurementUnitId = $scope.filterCondition.MeasurementUnitId;
        $scope.SingleLabItem.ItemCategoryId = $scope.filterCondition.ItemCategoryId;
        $scope.SingleLabItem.LabReportGroupId = $scope.filterCondition.LabReportGroupId;


        BedSetupService.SaveItem($scope.SingleLabItem)
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

    
    // code added by zaber
    $scope.deleteBed = function (item) {


        if (item.BedOccupancies[0].ItemID != 0)
        {
            $window.alert('Cant Delete Item because already assigned to Patient');
        }
        else
        {
            BedSetupService.deleteBed(item.Id)
           .success(function (data) {

               $scope.GetItemsByMedicalType($scope.medicalTypeID);
               $scope.status = 'Delete Successful';


           })
           .error(function (error) {
               $scope.status = 'Unable to delete bed : ' + error.message;
               console.log($scope.status);
           });
        }
        
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

    }
    if ($routeParams.tab == "summary") {
        $scope.loadLabTestCategories();
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

    $scope.addPatient = function (bedItem)
    {
        $scope.PatientServiceItem = [];
        $scope.isSamePatient = 0;

        //Filter the Bed Item from Items model array

        //$scope.bedItem = $filter('filter')($scope.items, Id);

        $scope.serviceItem = {};

        if ($scope.Patient == undefined)
        {
            $window.alert("Please Enter a Patient Name");            
        }
        else
        {
            BedSetupService.loadBedOccupancyByPatientId($scope.Patient.Id)
        .success(function (data) {

            $scope.newbedItem = data;
            console.log(data);
            //$scope.isSamePatient = 1;

        })
            .error(function (error) {
                $scope.status = 'Unable to get Bed Occupancy data: ' + error.message;
                console.log($scope.status);
            });

            //angular.forEach($scope.newbedItem, function (value, index) {
            //    alert(value.PatientId);
            //})

            if ($scope.newbedItem.PatientId!=null) {
                $window.alert("This Patient has already been bedded");
            }
            else
            {
                $scope.serviceItem.PatientID = $scope.Patient.Id;
                $scope.serviceItem.ItemID = bedItem.Id;
                $scope.serviceItem.InvoiceID = 0;
                $scope.serviceItem.ServiceListPrice = bedItem.Amount;
                $scope.serviceItem.ServiceActualPrice = bedItem.SalePrice;
                $scope.serviceItem.ServiceQuantity = bedItem.Quantity;
                $scope.serviceItem.ServiceDate = $filter('date')(new Date(), 'MM/dd/yy hh:mm:ss');
                $scope.serviceItem.ServiceProviderId = bedItem.ServiceProviderId;


                if (bedItem.MedicalTypeId == "62") {
                    $scope.serviceItem.LabStatusId = 1;
                    $scope.serviceItem.ReferralFeePaid = 0;
                }
                else {
                    $scope.serviceItem.LabStatusId = null;
                    $scope.serviceItem.ReferralFeePaid = null;
                }
                $scope.serviceItem.UserId = '';
                $scope.serviceItem.Discount = '';
                $scope.serviceItem.Refund = '';
                $scope.serviceItem.Billed = '';
                $scope.serviceItem.ReferralFee = bedItem.ReferralFee;
                $scope.serviceItem.DeliveryDate = bedItem.Date;
                $scope.serviceItem.DeliveryTime = bedItem.ReportDeliveryTime;

                $scope.PatientServiceItem.push($scope.serviceItem);


                BedSetupService.SavePatientServiceItem($scope.PatientServiceItem)
                .success(function (data) {

                    console.log(data);
                    $scope.UpdateTopLink('billing');
                    //$window.location.href = '#/billing';
                    $scope.addPatientSuccess = 1;
                    $scope.serviceItemEmpty();
                    $scope.loadItems();

                })
                .error(function (error) {
                    $scope.status = 'Unable to save PatientServiceItem data: ' + error.message;
                    console.log($scope.status);
                });

                $scope.occupyBed(bedItem);


            }
            
        }
        
    }

    $scope.occupyBed=function(bedItem)
    {
        $scope.BedOccupancy = {};
        $scope.BedOccupancyCollection = [];

        $scope.BedOccupancy.ItemID = bedItem.Id;
        $scope.BedOccupancy.PatientId = $scope.Patient.Id;
        $scope.BedOccupancy.PatientName = $scope.Patient.Name;
        $scope.BedOccupancy.Occupied = 1;
        $scope.BedOccupancy.Active = 1;


        $scope.BedOccupancyCollection.push($scope.BedOccupancy);

        BedSetupService.SaveBedOccupancy($scope.BedOccupancyCollection)
            .success(function (data) {

                console.log(data);                
                $scope.serviceItemEmpty();

            })
            .error(function (error) {
                $scope.status = 'Unable to save Bed Occupancy: ' + error.message;
                console.log($scope.status);
            });

    }

    //$scope.loadBedOccupancyByItemId(itemID)
    //{
    //    BedSetupService.loadBedOccupancyByItemId(itemID)
    //        .success(function (data) {

    //            console.log(data);                

    //        })
    //        .error(function (error) {
    //            $scope.status = 'Unable to load Bed Occupancy data: ' + error.message;
    //            console.log($scope.status);
    //        });
    //}

    $scope.emptyBed = function (bedItem) {

        $scope.bedOccupancyItem = {};

        $scope.bedOccupancyItem.Id = bedItem.BedOccupancies[0].Id;
        $scope.bedOccupancyItem.ItemID = bedItem.Id;
        $scope.bedOccupancyItem.Occupied = 0;
        $scope.bedOccupancyItem.PatientId = '';
        $scope.bedOccupancyItem.PatientName = '';
        $scope.bedOccupancyItem.Active = 1;

        BedSetupService.emptyBed($scope.bedOccupancyItem)
            .success(function (data) {

                console.log(data);
                //$scope.serviceItemEmpty();
                $scope.GetItemsByMedicalType($scope.medicalTypeID);

            })
            .error(function (error) {
                $scope.status = 'Unable to Empty Bed Allocation: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.saveCategory = function () {
        BedSetupService.CreateCategory($scope.categoryName, $scope.medicalTypeID)
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

});