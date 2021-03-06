﻿'use strict';

HmsApp.controller("ModalController", function ($scope, $modalInstance, patient, PatientService) {

    $scope.Patient = patient;
    if (!$scope.Patient.Country) {
        $scope.Patient.Country = "BD";
    }
    $scope.ok = function (file) {
        $modalInstance.close({ Patient: $scope.Patient, File: file });
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

HmsApp.controller("StockModelController", function ($scope, $modalInstance, $filter, singleItem, storeId, storeType, InventoryService, IniService) {

            $scope.PharmacyItemName = singleItem.Name;
            $scope.filterCondition={
                StoreId: "",
                ShelfId:"",
                BinId:""
            }

           

            $scope.StoreList = [];
            $scope.ShelfList = [];
            $scope.BinList = [];
            $scope.InventoryItemList = [];
            $scope.SaveInventory = false;
            $scope.SaveInventoryItem = false;

             $scope.Inventory = {

                id:"",
                ItemID: singleItem.Id,
                InventoryId:"",
                StoreID :$scope.filterCondition.StoreId,
                Quantity :0,
                ReorderLevel :"",
                ShelfId:"",
                BinId:"",
                MeasurementUnitId: singleItem.MeasurementUnitId,
                LastModifiedDate: $filter('date')(new Date(), 'yyyy-MM-dd')
             }

             $scope.InventoryItem = {

                 id:"",
                 ItemId: singleItem.Id,
                 InventoryId: $scope.Inventory.Id,
                 StoreId: $scope.filterCondition.StoreId,
                 Quantity: "",
                 MeasurementUnitId: singleItem.MeasurementUnitId,
                 ExpiryDate: "",
                 BuyPrice: "",
                 ModifiedDate: $filter('date')(new Date(), 'yyyy-MM-dd')

             }
        
             var closeShelf=function()
             {
                 $('#popupShelf').css("visibility", "hidden");
                 $('#popupShelf').css("opacity", 0);
                 $scope.ShelfName = "";
             }
             var closeBin = function () {
                 $('#popupBin').css("visibility", "hidden");
                 $('#popupBin').css("opacity", 0);
                 $scope.BinName = "";
             }

             $scope.CreateSelf=function()
             {
                 var shelf = {
                     Name: $scope.ShelfName,
                     StoreId:$scope.filterCondition.StoreId
                 }
                 InventoryService.CreateSelf(shelf)

                    .success(function (pt) {

                        closeShelf()
                        
                        $scope.ShelfList.push(pt);
                        $scope.filterCondition.ShelfId = pt.Id.toString();
                        console.log("Successfully Careate Shelf data");
                        console.log(pt);
                        $scope.GetBin();
                    })
                    .error(function (error) {

                        $scope.status = 'Unable to Create  Shelf data: ' + error.message;
                        console.log($scope.status);
                    });
             }

             $scope.CreateBin = function () {
                 var bin = {
                     Name: $scope.BinName,
                     ShelfId: $scope.filterCondition.ShelfId
                 }
                 InventoryService.CreateBin(bin)

                    .success(function (pt) {

                        closeBin()

                        $scope.BinList.push(pt);
                        $scope.filterCondition.BinId = pt.Id.toString();
                        console.log("Successfully Careate bin data");
                        console.log(pt);
                    })
                    .error(function (error) {

                        $scope.status = 'Unable to Create  bin data: ' + error.message;
                        console.log($scope.status);
                    });
             }

             $scope.GetShelf=function()
             {

                 InventoryService.GetShelf($scope.filterCondition.StoreId)
                .success(function (pt) {

                    $scope.ShelfList = pt;
                    if ($scope.ShelfList.length > 0)
                    {
                        if($scope.Inventory.ShelfId)
                        {
                            $scope.filterCondition.ShelfId = $scope.Inventory.ShelfId.toString();
                            
                        }else
                        {
                            $scope.filterCondition.ShelfId = "";
                        }
                    } else
                    {
                        $scope.filterCondition.ShelfId = "";
                    }
                    $scope.GetBin();
                    console.log("Successfully get Shelf data");
                    console.log(pt);
                })
                .error(function (error) {

                    $scope.status = 'Unable to load  Shelf data: ' + error.message;
                    console.log($scope.status);
                });

             }

             $scope.GetBin=function()
             {

                 InventoryService.GetBin($scope.filterCondition.ShelfId)
                .success(function (pt) {

                    $scope.BinList = pt;

                    if ($scope.BinList.length > 0) {
                        if ($scope.Inventory.BinId > 0) {
                            $scope.filterCondition.BinId = $scope.Inventory.BinId.toString();
                           
                        }
                    } else
                    {
                        $scope.filterCondition.BinId = "";
                    }
                    
                    console.log("Successfully get Bin data");
                    console.log(pt);
                })
                .error(function (error) {

                    $scope.status = 'Unable to load  Bin data: ' + error.message;
                    console.log($scope.status);
                });

             }
            
             $scope.CreateInventoryWithInventoryItem=function()
             {

                 $scope.Inventory.ShelfId = $scope.filterCondition.ShelfId;
                 $scope.Inventory.BinId = $scope.filterCondition.BinId;
                 $scope.Inventory.LastModifiedDate = $filter('date')(new Date(), 'yyyy-MM-dd');
                 $scope.SaveInventory = false;
                 $scope.SaveInventoryItem = false;

                var data= InventoryService.CreateInventory($scope.Inventory)
                 .success(function (pt) {

                     $scope.SaveInventory = true;
                     $scope.Inventory = pt;
                     console.log("Successfully Create inventory data");
                     console.log(pt);
                 })
                 .error(function (error) {

                     $scope.status = 'Unable to Create  Inventory data: ' + error.message;
                     console.log($scope.status);
                 });

                return { data: data };
             }


             $scope.CreateInventory = function () {

                 $scope.Inventory.ShelfId = $scope.filterCondition.ShelfId;
                 $scope.Inventory.BinId = $scope.filterCondition.BinId;
                 $scope.Inventory.LastModifiedDate = $filter('date')(new Date(), 'yyyy-MM-dd');
                 $scope.SaveInventory = false;
                 $scope.SaveInventoryItem = false;

                  InventoryService.CreateInventory($scope.Inventory)
                  .success(function (pt) {

                      $scope.SaveInventory = true;
                      $scope.Inventory = pt;
                      console.log("Successfully Create inventory data");
                      console.log(pt);
                  })
                  .error(function (error) {

                      $scope.status = 'Unable to Create  Inventory data: ' + error.message;
                      console.log($scope.status);
                  });

                 
             }



             $scope.PrepareAndSaveInventoryItem=function()
             {
                 if ($scope.Inventory.Id == 0) {

                     $scope.Inventory.Quantity = parseInt($scope.InventoryItem.Quantity) + parseInt($scope.Inventory.Quantity);

                     $scope.CreateInventoryWithInventoryItem().data.success(function (pt) {


                             $scope.InventoryItem.InventoryId = $scope.Inventory.Id;
                             $scope.InventoryItem.ModifiedDate = $filter('date')(new Date(), 'yyyy-MM-dd');


                             $scope.CreateInventoryItem();
                         })
                        .error(function (error) {

                            alert("Error occurred ...Updating inventory ..please try again");

                        });

                 } else {

                     $scope.InventoryItem.InventoryId = $scope.Inventory.Id;
                     $scope.Inventory.Quantity = parseInt($scope.InventoryItem.Quantity) + parseInt($scope.Inventory.Quantity);
                     $scope.CreateInventoryWithInventoryItem().data.success(function (pt) {

                         $scope.CreateInventoryItem();
                         })
                        .error(function (error) {

                            alert("Error occurred ...Updating inventory ..please try again");

                        });
                     
                 }
                 
             }
             $scope.ClearInventoryItem=function()
             {
                 $scope.InventoryItem.Quantity = "";
                 $scope.InventoryItem.BuyPrice = ""
                 $scope.InventoryItem.ExpiryDate = "";
             }
             $scope.CreateInventoryItem=function()
             {
                 //StoreID: $scope.filterCondition.StoreId,
                 $scope.InventoryItem.StoreId = $scope.filterCondition.StoreId;
                 InventoryService.CreateInventoryItem($scope.InventoryItem)
                 .success(function (pt) {

                     $scope.SaveInventoryItem = true;
                     pt.ExpiryDate=ToJavaScriptDate(pt.ExpiryDate);
                     $scope.InventoryItemList.push(pt);

                     $scope.ClearInventoryItem();                     
                     console.log("Successfully Careate Stock data");

                     console.log(pt);
                 })
                 .error(function (error) {

                     $scope.status = 'Unable to Create  Stock data: ' + error.message;
                     console.log($scope.status);
                 });
             }


             $scope.GetInventoryByItem=function()
             {
                 $scope.InventoryItemList = [];
                 InventoryService.GetInventoryByItem(singleItem.Id, $scope.filterCondition.StoreId)
                 .success(function (pt) {

                     $scope.Inventory = pt;
                     if ($scope.Inventory.Id == 0) {
                         $scope.Inventory.StoreID = $scope.filterCondition.StoreId;
                         $scope.Inventory.ItemID = singleItem.Id;
                         $scope.Inventory.Quantity = 0;
                         $scope.Inventory.MeasurementUnitId = singleItem.MeasurementUnitId;
                         $scope.Inventory.LastModifiedDate = $filter('date')(new Date(), 'yyyy-MM-dd');
                         
                     }
                     $scope.GetShelf();
                     console.log("Successfully get inventory data");
                     console.log(pt);
                 })
                 .error(function (error) {

                     $scope.status = 'Unable to load  Inventory data: ' + error.message;
                     console.log($scope.status);
                 });

             }
            $scope.GetStores = function () {

                InventoryService.GetStores(storeType)
                .success(function (pt) {

                    if (pt.length > 0) {
                        $scope.StoreList = pt;
                        $scope.filterCondition.StoreId = pt[0].Id.toString();
                    }
                    if (storeId)
                    {
                        $scope.filterCondition.StoreId = storeId.toString();
                    }

                    $scope.GetInventoryByItem();
                    

                    console.log(pt);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load  Store data: ' + error.message;
                    console.log($scope.status);
                });
            }

            $scope.GetStores();




    /*------------------------- configuration begin -------------------------*/

            $scope.GetConfiguration = function () {

                IniService.GetConfiguration()
                    .success(function (data) {

                        $scope.Configuration = data;
                        $scope.Currency = $scope.Configuration.Configuration.Currency;

                        

                    }).error(function (error) {

                        $scope.status = 'Unable get currency ' + error.message;
                        console.log($scope.status);

                    });

            }

            $scope.GetConfiguration();

            $scope.ok = function () {
                $modalInstance.close();
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };



});


HmsApp.controller("HospitalAmissionModalController", function ($scope, $modalInstance, $http, $filter, ConfigurationService, PatientService) {



    $scope.Admission = {
        PatientId: $scope.Patient.Id,
        AdmissionDate: $filter('date')(new Date(), 'yyyy-MM-dd'),
        DischargeDate:null,
        ServiceProviderId: "",
        RefererId: "",
        DepartmentId: "",
        BedId: null,
        IsReleased: false,
        Notes:""

    }
    


    ConfigurationService.GetDepartments()
    .success(function (departments) {
        $scope.Departments = departments;
        $scope.Admission.DepartmentId = 205;
        $scope.Admission.DepartmentId = $scope.Departments[0].Id;
        
       
    })
    .error(function (error) {
        $scope.status = 'Unable to load Departments data: ' + error.message;
        console.log($scope.status);
    });


    $scope.OnRDocotorSelect = function ($item) {
        $scope.RDoctor.Name = $item.Contact.FirstName + " " + $item.Contact.LastName;
        $scope.Admission.RefererId = $item.Id;
    }

    $scope.OnSDocotorSelect = function ($item) {
        $scope.SDoctor.Name = $item.Contact.FirstName + " " + $item.Contact.LastName;
        $scope.Admission.ServiceProviderId = $item.Id;
    }

    

    $scope.GetDoctorPartialName = function (name) {


        //return $http.get('/patient/getserviceproviderpartialname?name=' + name + "&itemid=" + itemid).then(function (response) {
        //    var data = response.data;
        //    return response.data;
        //});

        /*----------------------------  TypeId 56 means doctor --------------------------------------------------*/

        return $http.get('/patient/getdoctorbyname?name=' + name + "&typeId=" + $scope.ServiceProviderType).then(function (response) {
            var data = response.data;
            return response.data;
        });


    }


    $scope.ok = function () {

        PatientService.SaveAdmission($scope.Admission, $scope.InititalSetupId)
        .success(function (data) {

            console.log(data);
            $scope.Patient.AdmissionId = data.Id;
            $modalInstance.close();


        })
        .error(function (error) {
            $scope.status = 'Unable to save Admission data: ' + error.message;
        
            console.log($scope.status);

        });

       
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});



HmsApp.controller("OtherServicesModalController", function ($scope, $modalInstance,item,ItemService) {



    $scope.OtherService = {
        id: 0,
        Name: "",
        GenericName: "",
        Code: "",
        ItemTypeId: 31,
        MedicalTypeId: $scope.medicalTypeID,
        ItemCategoryId: null,
        MeasurementUnitId: null,
        SalePrice: "",
        BuyPrice: 0.00,
        ServiceProviderId: "",
        ReferralAllowed: 0,
        Description: "",
        DefaultReferrarFee: "",
        LabReportGroupId: "",


    };

    if (item.Id != null) {
        $scope.OtherService = item;
    }

    $scope.ok = function () {

        $scope.OtherService.BedOccupancies = null;
        $scope.OtherService.ItemCategory = null;
        ItemService.SaveItem($scope.OtherService)
        .success(function (data) {

            //$scope.loadItembyId(data);
            $scope.saveSuccess = 1;
            console.log("Save successfull");
            $modalInstance.close();

        })
        .error(function (error) {
            $scope.status = 'Unable to save category data: ' + error.message;

        });


        
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
   
});



HmsApp.controller("TreatmentModalController", function ($scope, $modalInstance, item, ItemService) {



    $scope.Treatment = {
        id: 0,
        Name: "",
        GenericName: "",
        Code: "",
        ItemTypeId: 31,
        MedicalTypeId: $scope.medicalTypeIDTreatment,
        ItemCategoryId: null,
        MeasurementUnitId: null,
        SalePrice: "",
        BuyPrice: 0.00,
        ServiceProviderId: "",
        ReferralAllowed: 0,
        Description: "",
        DefaultReferrarFee: "",
        LabReportGroupId: "",


    };

    $scope.ItemCategories = {};
    $scope.filterCondition={
        ItemCategoryId:""
        }
    $scope.InsertedDataId = null

    $scope.saveCategory = function () {
        ItemService.CreateCategory($scope.categoryName, $scope.medicalTypeIDTreatment)
        .success(function (data) {

            $scope.loadTreatMentCategories();
           // $scope.resetpopupFiled();
            $scope.InsertedDataId = data.Id.toString();
            $('#popupCategory').css("visibility", "hidden");
            $('#popupCategory').css("opacity", 0);

        })
        .error(function (error) {
            $scope.status = 'Unable to save category data: ' + error.message;

        });

    }

    $scope.loadTreatMentCategories = function () {
        ItemService.loadTestCategories($scope.medicalTypeIDTreatment)
             .success(function (pt) {
                 //$scope.TestCategories = pt;
                 $scope.ItemCategories = pt;
                 if ($scope.ItemCategories.length > 0) {
                     $scope.filterCondition.ItemCategoryId = $scope.ItemCategories[0].Id.toString();
                 }
                 if ($scope.InsertedDataId != null)
                 {
                     $scope.filterCondition.ItemCategoryId = $scope.InsertedDataId;
                     $scope.InsertedDataId = null;
                 }
                 if (item.Id != null)
                 {
                     $scope.filterCondition.ItemCategoryId = $scope.Treatment.ItemCategoryId.toString();
                 }

                 console.log(pt);
             })
             .error(function (error) {
                 $scope.status = 'Unable to load test category for  test only data: ' + error.message;
                 console.log($scope.status);
             });
    }

    $scope.loadTreatMentCategories();

    if (item.Id != null) {
        $scope.Treatment = item;
        
    }

    $scope.ok = function () {

        $scope.Treatment.BedOccupancies = null;
        $scope.Treatment.ItemCategory = null;
        $scope.Treatment.ItemCategoryId = $scope.filterCondition.ItemCategoryId;
        ItemService.SaveItem($scope.Treatment)
        .success(function (data) {

            //$scope.loadItembyId(data);
            $scope.saveSuccess = 1;
            console.log("Save successfull");
            $modalInstance.close();

        })
        .error(function (error) {
            $scope.status = 'Unable to save category data: ' + error.message;

        });



    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});



HmsApp.controller("PrintInvoiceModalController", function ($scope, $modalInstance, singleInvoice) {

    $scope.singleinvoice = singleInvoice;



    $scope.ok = function (file) {
        $modalInstance.close();
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});


HmsApp.controller("PrintReceiptModalController", function ($scope, $modalInstance, receipt) {

    $scope.Receipt = receipt;



    $scope.ok = function (file) {
        $modalInstance.close();
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});


HmsApp.controller("ServiceProviderModalController", function ($scope, $modalInstance, serviceProvider,editMode, ConfigurationService) {
    $scope.ServiceProvider = serviceProvider;
    if ($scope.ServiceProvider.Contact.Gender == null) {
        $scope.ServiceProvider.Contact.Gender = false;
        $scope.ServiceProvider.ServiceProviderTypeId = $scope.SelectedServiceProviderType.Id;
       
        $scope.ServiceProvider.ServiceProviderType = { Id: $scope.SelectedServiceProviderType.Id };
       
        $scope.ServiceProvider.Department = { Id: $scope.Departments[0].Id }
    }
    $scope.IsNull = "null";
    $scope.ok = function (file) {
        $modalInstance.close({ ServiceProvider: $scope.ServiceProvider, File: file });
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});



HmsApp.controller("LabReportTemplateResultModalController", function ($scope, $http, $modalInstance, $filter, $window, isEdit, PatientServiceItem, LabTestItem, LabTestService) {

    $scope.InvoiceStatusUpdate = true;
    $scope.Edit = true;

    $scope.loadSavedData = function () {
        if (CKEDITOR.instances.editor1) {

            if (PatientServiceItem.ReportFormatName === null) {
                CKEDITOR.instances.editor1.setData("");


            } else {
               CKEDITOR.instances.editor1.setData(PatientServiceItem.ReportFormatName);
            }

        }
    }
    $scope.LoadData = function (temnplate) {
        if ($scope.labreportTemplates != null) {
            $scope.labreportSingleTemplate = temnplate;

            richTextData = $scope.labreportSingleTemplate.RichContent;
            CKEDITOR.instances.editor1.setData(richTextData);

            $(".chooseTemplate").addClass('hide');
            $(".editor").removeClass('hide');
        }
    }


    if (!isEdit) {
        $scope.Edit = false;
        LabTestService.LoadLabReportbyId(PatientServiceItem.Item.Id)
            .success(function (pt) {
                console.log(pt);
                $scope.labreportTemplates = pt;
                // $scope.LoadData();
                $(".editor").addClass('hide');
                $(".chooseTemplate").removeClass('hide');

            })
            .error(function (error) {
                $scope.status = 'Unable to load  lab report  ' + error.message;
                console.log($scope.status);
            });

    } else {

        $scope.Edit = true;

    }

    $scope.Back=function()
    {
        $(".editor").addClass('hide');
        $(".chooseTemplate").removeClass('hide');
        angular.forEach($scope.labreportTemplates, function (item) {

            item.Select = false;

        });
    }

    $scope.ok = function (richTextData) {

        PatientServiceItem.LabStatusId = "2";
        PatientServiceItem.ReportFormatName = richTextData;
        PatientServiceItem.Staus = "Completed";

        angular.forEach(LabTestItem.PatientServices, function (item) {

            if (PatientServiceItem.Id != item.Id) {
                if (item.LabStatusId == "1" && !item.Refund) {
                    $scope.InvoiceStatusUpdate = false;
                }
            }
        });

        if ($scope.InvoiceStatusUpdate) {
            LabTestItem.Staus = "Completed";
            LabTestItem.LabStatusId = "2";

        }


        if (LabTestItem.LabStatusId == 1) {
            LabTestItem.Staus = "Pending";
        } else if (LabTestItem.LabStatusId == 2) {
            LabTestItem.Staus = "Completed";
        } else if (LabTestItem.LabStatusId == 3) {
            LabTestItem.Staus = "Delivered";
        }


        if (LabTestItem.IsRefunded) {
            LabTestItem.Staus = LabTestItem.Staus + "  (Reunded)";
        }

        if (LabTestItem.TotalAmount != LabTestItem.Paid) {
            LabTestItem.Staus = LabTestItem.Staus + ("(Due)");
        }

        LabTestService.UpdateLabStatus(PatientServiceItem, $scope.InvoiceStatusUpdate, PatientServiceItem.InvoiceID)
            .success(function (pt) {
                console.log(pt);
               // $scope.labreportTemplates = pt;
                //$scope.LoadData();

                $modalInstance.dismiss('cancel');

            })
            .error(function (error) {
                $scope.status = 'Unable to load  lab report  ' + error.message;
                console.log($scope.status);
                $modalInstance.dismiss('cancel');
            });


    };


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };



});

HmsApp.controller("LabReportTemplateModalController", function ($scope, $http, $modalInstance, $filter, $window, isEdit, labReportID, LabTestService) {

    $scope.templateData = {};


    $scope.LoadLabReport = function () {
        LabTestService.LoadLabReport(labReportID)
        .success(function (data) {

            console.log(data);
            //$modalInstance.dismiss('cancel');
            $scope.templateData = data;
            $scope.reportName = $scope.templateData.Name;
            richTextData = $scope.templateData.RichContent;
            CKEDITOR.instances.editor1.setData(richTextData);



        })
        .error(function (error) {
            $scope.status = 'Unable to load LabReportTemplate data: ' + error.message;
            console.log($scope.status);
        });

    }

    if (isEdit == 'true') {
        $scope.LoadLabReport();
    }

    $scope.ok = function (richTextData) {

        console.log(richTextData);


        $scope.templateData.Name = $scope.reportName;
        $scope.templateData.RichContent = richTextData;
        $scope.templateData.ItemId = $scope.SingleLabItem.Id;
        if (isEdit) {
            $scope.templateData.Id = labReportID;
        }

        LabTestService.SaveLabReportTemplate($scope.templateData)
            .success(function (data) {

                console.log(data);
                $modalInstance.dismiss('cancel');


            })
            .error(function (error) {
                $scope.status = 'Unable to save LabReportTemplate data: ' + error.message;
                console.log($scope.status);
            });



    };


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


});

HmsApp.controller("ReagentModalController", function ($scope, $http, $modalInstance, $filter, $window, item, LabTestService, ItemService) {


    $scope.Reagent = {
        InvestigationId: item.Id,
        ReagentId: "",
        Quantity: "",
        MeasurementUnitId: ""
    }
    $scope.SingleReagent={
        Name : ""
    }
    $scope.ReagentList = [];
    

    $scope.OnReagentSelect = function ($item) {

        $scope.SingleReagent.Name = $item.Name;
        $scope.Reagent.ReagentId = $item.Id;
        $scope.Reagent.MeasurementUnitId = $item.MeasurementUnitId;

    }

    $scope.GetReagentByPartialName = function (name) {
        return $http.get('/Patient/GetItembyMedicalPartialName?id=' + $scope.SingleReagentItem.MedicalTypeId + '&name=' + name).then(function (response) {
            return response.data;
        });
    }

    $scope.LoadReagent=function()
    {
        ItemService.GetReagents(item.Id)
          .success(function (pt) {

              $scope.ReagentList = pt;
              console.log("Successfully Load Reagent");
              console.log(pt);
          })
          .error(function (error) {
              $scope.status = 'Unable to load Reagent item for Lab Test ' + error.message;
              console.log($scope.status);
          });
    }

    // init
    $scope.LoadReagent();

    $scope.DeletReagent=function(reagent)
    {
        ItemService.DeletReagent(reagent)
        .success(function (pt) {

            $scope.ReagentList = pt.Data;
            console.log("Successfully Delete Reagent");
            console.log(pt);
        })
        .error(function (error) {
            $scope.status = 'Unable to Delete Reagent item for Lab Test ' + error.message;
            console.log($scope.status);
        });
    }
    $scope.ok = function () {

        $scope.SingleReagent.Name = "";
        $scope.SingleReagent.Quantity = "";
        ItemService.SaveReagentForInvestigation($scope.Reagent)
        .success(function (pt) {

            $scope.ReagentList = pt.Data;
            console.log("Successfully Save Reagent");
            console.log(pt);
        })
        .error(function (error) {
            $scope.status = 'Unable to Save Reagent item for Lab Test ' + error.message;
            console.log($scope.status);
        });
      //  $modalInstance.close();
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});

HmsApp.controller("CommissionModalController", function ($scope, $http, $modalInstance, $filter, $window, LabTestService) {



    $scope.Referral = {};


    $scope.saveCommission = function () {
        LabTestService.saveDoctorsCommission($scope.Referral)
        .success(function (data) {

            console.log(data);
            $scope.getDoctorWithReferrel();


        })
        .error(function (error) {
            $scope.status = 'Unable to save PatientServiceItem data: ' + error.message;
            console.log($scope.status);
        });
    }


    $scope.getDoctorWithReferrel = function () {
        LabTestService.getDoctorWithReferrel($scope.SingleLabItem.Id)
         .success(function (data) {

             $scope.Referrals = data;
             console.log(data);



         })
            .error(function (error) {
                $scope.status = 'Unable to load reffer doctor for this item: ' + error.message;
                console.log($scope.status);
            });
    }



    $scope.ok = function () {


        $scope.Referral.itemId = $scope.SingleLabItem.Id;
        $scope.Referral.ServiceProviderId = $scope.Doctor.Id;
        $scope.Referral.ReferralFee = $scope.CommissionAmount;


        $scope.saveCommission();

        // $modalInstance.dismiss('cancel');

    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };



    $scope.OnDocotorSelect = function ($item) {
        $scope.Doctor.Name = $item.Contact.FirstName + " " + $item.Contact.LastName;
        $scope.Doctor.Id = $item.Id;
    }

    $scope.GetDoctorPartialName = function (name) {


        //return $http.get('/patient/getserviceproviderpartialname?name=' + name + "&itemid=" + itemid).then(function (response) {
        //    var data = response.data;
        //    return response.data;
        //});

        /*----------------------------  TypeId 56 means doctor --------------------------------------------------*/

        return $http.get('/patient/getdoctorbyname?name=' + name + "&typeId=" + $scope.ServiceProviderType).then(function (response) {
            var data = response.data;
            return response.data;
        });


    }

    $scope.deleteCommission = function (referralId) {


        LabTestService.deleteCommission(referralId)
       .success(function (data) {

           $scope.getDoctorWithReferrel();



       })
       .error(function (error) {
           $scope.status = 'Unable to delete referral comission: ' + error.message;
           console.log($scope.status);
       });






    }


    $scope.getDoctorWithReferrel();
});

HmsApp.controller("ReceiptModalController", function ($scope, $modalInstance, $filter, $window, $localStorage, billingItems, receipt, isDisplayAddress,NonRegisterPatientId, BillingService) {


    $scope.IsDisplayAddress = isDisplayAddress;

    $scope.PatientServiceItem = [];
    $scope.Receipt = {
        Id: null,
        ReceiptDate: $filter('date')(new Date(), 'MM/dd/yy'),
        PatientId: $scope.Patient.Id,
        PaymentId: null,
        TotalAmount: 0.0,
        //PaidAmount: 0.0,
        //PaymentAmount: 0.0,
        //PaymentMethod: 'Cash',
        //CoPayerAmount: 0.0,
        //ReconcileAmount: 0.0,
        TotalDiscount: 0.0,
        IsRefunded: 0,
        UserId: null
    };
   

    $scope.PaymentMethod = "1";
    $scope.Payment = {

        Amount: 0.0,
        DeductionAmount: 0.0,
        PaymentTypeId: 102,
        PatientId: $scope.Patient.Id,
        UserId: null,
        Date: $filter('date')(new Date(), 'MM/dd/yy hh:mm:ss'),
        PaymentMethodId: $scope.PaymentMethod,
        CardNumber: null

    };

    $scope.GenerateServiceItem = function (item) {
        $scope.serviceItem = {};

        $scope.serviceItem.Item = {};
        /*   var serviceItem = {
                PatientID: $scope.Patient.Id,
                ItemID: obj.Id,
                InvoiceID: '',
                ServiceListPrice: obj.Amount,
                ServiceActualPrice: obj.SalePrice,
                ServiceQuantity: obj.Quantity,
                ServiceDate: Date.now(),
                UserId: '',
                Discount: '',
                Refund: '',
                Billed: '',
                ReferralFee: obj.ReferralFee,
                DeliveryDate: obj.Date,
                DeliverTime:obj.ReportDeliveryTime
            };*/
        $scope.serviceItem.Id = item.Id;
        $scope.serviceItem.PatientId = item.PatientID;
        $scope.serviceItem.ItemId = item.ItemId;
        $scope.serviceItem.InvoiceID = null;


        if (receipt.Id == null) {
            $scope.serviceItem.ReceiptId = null;
            $scope.serviceItem.ServiceListPrice = item.ServiceListPriceAfterDiscount;
        } else
        {
            $scope.serviceItem.ReceiptId = receipt.Id;
            $scope.serviceItem.ServiceListPrice = item.ServiceListPrice;
        }
        if (item.PatientAdmissionId == null) {
            $scope.serviceItem.PatientAdmissionId = $scope.Patient.AdmissionId;
        } else {
            $scope.serviceItem.PatientAdmissionId = item.PatientAdmissionId;
        }
        $scope.serviceItem.ServiceActualPrice = item.ServiceActualPrice;
        $scope.serviceItem.ServiceQuantity = item.ServiceQuantity;
        $scope.serviceItem.ServiceDate = ToJavaScriptDate(item.ServiceDate);
        $scope.serviceItem.UserId = '';
        $scope.serviceItem.Discount = item.Discount;
        $scope.serviceItem.Refund = '';
        $scope.serviceItem.Billed = false;
        
        $scope.serviceItem.ReferralFee = item.ReferralAfterDiscount;
        $scope.serviceItem.DeliveryDate = ToJavaScriptDate(item.DeliveryDate);
        $scope.serviceItem.DeliveryTime = item.DeliveryTime;
        $scope.serviceItem.ReferralFeePaid = item.ReferralFeePaid;
        $scope.serviceItem.ServiceProviderId = item.ServiceProviderId;
        $scope.serviceItem.LabStatusId = item.LabStatusId;

        $scope.serviceItem.Item.Name = item.Item.Name;
        $scope.serviceItem.Item.MedicalTypeId = item.Item.MedicalTypeId;
        $scope.serviceItem.Item.GenericName = item.Item.ItemCategory.Name;

        $scope.PatientServiceItem.push($scope.serviceItem);
    }

    angular.forEach(billingItems, function (item, key) {

        if (receipt.Id == null) {
            $scope.Receipt.TotalAmount += item.ServiceListPriceAfterDiscount;
            $scope.Receipt.TotalDiscount += parseFloat(item.Discount);
        } else {

            $scope.Receipt.TotalAmount += item.ServiceListPrice;
            $scope.Receipt.TotalDiscount += parseFloat(item.Discount);
        }
       // $scope.Receipt.TotalPrice += item.ServiceActualPrice * item.ServiceQuantity;

        $scope.GenerateServiceItem(item);

    });

    $scope.PaymentAmount = parseFloat($scope.Receipt.TotalAmount);


    $scope.SaveReceipt=function()
    {
        BillingService.SaveReciept($scope.Receipt, $scope.PatientServiceItem)
         .success(function (data) {

             console.log(data);
             $scope.Receipt = data;
             $scope.Receipt.ReceiptDate = ToJavaScriptDate($scope.Receipt.ReceiptDate);
             
             angular.forEach(billingItems, function (item, key) {

                 $scope.BillingItem.splice($scope.BillingItem.indexOf(item), 1);

             });
             if ($scope.Patient.Id == NonRegisterPatientId) {
                 $localStorage.BillingItem = $scope.BillingItem;
             }
             

         })
            .error(function (error) {
                $scope.status = 'Unable to save reciept data: ' + error.message;
                console.log($scope.status);

            });
    }

    if (receipt.Id == null) {

        $scope.SaveReceipt();
        
    } else
    {
        $scope.Receipt = receipt;
       
    }

   


    $scope.ok = function () {

        $scope.Payment.Amount = $scope.PaymentAmount;

        $scope.Receipt.PatientServices = $scope.PatientServiceItem;

        //  set payment method & card number
        $scope.Payment.PaymentMethodId = $scope.PaymentMethod;
        if ($scope.Payment.PaymentMethodId != "1") {
            $scope.Payment.CardNumber = $scope.CardNumber;
        }

        $scope.Receipt.Payment = $scope.Payment;


        angular.forEach($scope.Receipt.PatientServices, function (item, key) {

            item.Billed = true;
            item.ReceiptId = $scope.Receipt.Id;
        });


        BillingService.SaveRecieptPayment($scope.Receipt)
        .success(function (data) {

            console.log(data);
           // $scope.Receipt = data;
            

            $("div.payment").addClass('hide');
            $("div.print").removeClass('hide');

        })
            .error(function (error) {

                $scope.status = 'Unable to save reciept Payment data: ' + error.message;
                console.log($scope.status);

       });



        //$modalInstance.close();

        

    };

    $scope.cancel = function () {

        $modalInstance.dismiss('cancel');
    };


});

HmsApp.controller("InvoiceModalController", function ($scope, $modalInstance, $filter, $window, billingItems, singleInvoice, advancePayment, BillingService) {

    $scope.PatientServiceItem = [];
    $scope.InvoicePayments = [];
    $scope.TotalPaid = 0.00;
    $scope.ReconcileAmount = 0.00;
    $scope.PaymentMethod = "1";
    $scope.PaymentFlag = true;

   

    $scope.Invoice = {
        Id: null,
        InvoiceDate: $filter('date')(new Date(), 'MM/dd/yy'),
        DueDate: $filter('date')(new Date(), 'MM/dd/yy'),
        PatientID: $scope.Patient.Id,
        TotalAmount: 0.0,
        //PaidAmount: 0.0,
        //PaymentAmount: 0.0,
        //PaymentMethod: 'Cash',
        //CoPayerAmount: 0.0,
        //ReconcileAmount: 0.0,
        TotalDiscount: 0.0,
        InvoiceStatusId: 1,
        ItemDiscount: "",
        IsRefunded: 0,
        UserId: null,
        PaymentAmount: 0.0
    };

    $scope.InvoicePayment = {
        InvoiceId: 0,
        Amount: 0.0,
        PaymentID: null,
        UserId: null


    };
    $scope.Payment = {

        Amount: 0.0,
        DeductionAmount: 0.0,
        PaymentTypeId: 101,
        PatientID: $scope.Patient.Id,
        UserId: null,
        Date: $filter('date')(new Date(), 'MM/dd/yy hh:mm:ss'),
        PaymentMethodId: $scope.PaymentMethod,
        CardNumber: null

    };





    function ConvertJsonDateString(jsonDate) {
        var shortDate = null;
        if (jsonDate) {
            var regex = /-?\d+/;
            var matches = regex.exec(jsonDate);
            var dt = new Date(parseInt(matches[0]));
            var month = dt.getMonth() + 1;
            var monthString = month > 9 ? month : '0' + month;
            var day = dt.getDate();
            var dayString = day > 9 ? day : '0' + day;
            var year = dt.getFullYear();
            shortDate = monthString + '/' + dayString + '/' + year;
        }
        return shortDate;
    };

    function parseJsonDate(jsonDateString) {
        return new Date(parseInt(jsonDateString.replace('/Date(', '')));
    }



    $scope.GenerateServiceItem = function (item) {
        $scope.serviceItem = {};

        /*   var serviceItem = {
                PatientID: $scope.Patient.Id,
                ItemID: obj.Id,
                InvoiceID: '',
                ServiceListPrice: obj.Amount,
                ServiceActualPrice: obj.SalePrice,
                ServiceQuantity: obj.Quantity,
                ServiceDate: Date.now(),
                UserId: '',
                Discount: '',
                Refund: '',
                Billed: '',
                ReferralFee: obj.ReferralFee,
                DeliveryDate: obj.Date,
                DeliverTime:obj.ReportDeliveryTime
            };*/
        $scope.serviceItem.Id = item.Id;
        $scope.serviceItem.PatientId = item.PatientID;
        $scope.serviceItem.ItemId = item.ItemId;
        $scope.serviceItem.InvoiceID = null;
        if (item.PatientAdmissionId == null) {
            $scope.serviceItem.PatientAdmissionId = $scope.Patient.AdmissionId;
        } else {
            $scope.serviceItem.PatientAdmissionId = item.PatientAdmissionId;
        }
        $scope.serviceItem.ServiceListPrice = item.ServiceListPriceAfterDiscount;
        $scope.serviceItem.ServiceActualPrice = item.ServiceActualPrice;
        $scope.serviceItem.ServiceQuantity = item.ServiceQuantity;
        $scope.serviceItem.ServiceDate = ToJavaScriptDate(item.ServiceDate);
        $scope.serviceItem.UserId = '';
        $scope.serviceItem.Discount = item.Discount;
        $scope.serviceItem.Refund = item.Refund;
        $scope.serviceItem.Billed = item.Billed;
        $scope.serviceItem.ReferralFee = item.ReferralAfterDiscount;
        $scope.serviceItem.DeliveryDate = ToJavaScriptDate(item.DeliveryDate);
        $scope.serviceItem.DeliveryTime = item.DeliveryTime;
        $scope.serviceItem.ReferralFeePaid = item.ReferralFeePaid;
        $scope.serviceItem.ServiceProviderId = item.ServiceProviderId;
        $scope.serviceItem.LabStatusId = item.LabStatusId;
        if (item.LabStatusId == 1) {
            $scope.isLabItem = true;
        }

        $scope.PatientServiceItem.push($scope.serviceItem);
    }

    $scope.GenerateServiceItemAfterInvoice = function (item) {
        $scope.serviceItem = {};

        /*   var serviceItem = {
                PatientID: $scope.Patient.Id,
                ItemID: obj.Id,
                InvoiceID: '',
                ServiceListPrice: obj.Amount,
                ServiceActualPrice: obj.SalePrice,
                ServiceQuantity: obj.Quantity,
                ServiceDate: Date.now(),
                UserId: '',
                Discount: '',
                Refund: '',
                Billed: '',
                ReferralFee: obj.ReferralFee,
                DeliveryDate: obj.Date,
                DeliverTime:obj.ReportDeliveryTime
            };*/
        $scope.serviceItem.Id = item.Id;
        $scope.serviceItem.PatientId = item.PatientID;
        $scope.serviceItem.ItemId = item.ItemId;
        $scope.serviceItem.InvoiceID = null;
        if (item.PatientAdmissionId == null) {
            $scope.serviceItem.PatientAdmissionId = $scope.Patient.AdmissionId;
        } else {
            $scope.serviceItem.PatientAdmissionId = item.PatientAdmissionId;
        }
        $scope.serviceItem.ServiceListPrice = item.ServiceListPrice;
        $scope.serviceItem.ServiceActualPrice = item.ServiceActualPrice;
        $scope.serviceItem.ServiceQuantity = item.ServiceQuantity;
        $scope.serviceItem.ServiceDate = ToJavaScriptDate(item.ServiceDate);
        $scope.serviceItem.UserId = '';
        $scope.serviceItem.Discount = item.Discount;
        $scope.serviceItem.Refund = item.Refund;
        $scope.serviceItem.Billed = item.Billed;
        $scope.serviceItem.ReferralFee = item.ReferralFee;
        $scope.serviceItem.ReferralFeePaid = $scope.serviceItem.ReferralFeePaid;
        $scope.serviceItem.DeliveryDate = ToJavaScriptDate(item.DeliveryDate);
        $scope.serviceItem.DeliveryTime = item.DeliveryTime;
        $scope.serviceItem.ReferralFeePaid = item.ReferralFeePaid;
        $scope.serviceItem.ServiceProviderId = item.ServiceProviderId;
        $scope.serviceItem.LabStatusId = item.LabStatusId;
        if (item.LabStatusId == 1) {
            $scope.isLabItem = true;
        }

        $scope.PatientServiceItem.push($scope.serviceItem);
    }

   function saveInvoice()  {
        BillingService.SaveInvoice($scope.Invoice, $scope.PatientServiceItem)
         .success(function (data) {

             console.log(data);
             $scope.Invoice = data;
             $scope.Invoice.InvoiceDate = ToJavaScriptDate($scope.Invoice.InvoiceDate);

             if ($scope.PaymentFlag) {
                 $scope.Invoice.PaymentAmount = parseFloat($scope.Invoice.TotalAmount);
             }else
             {
                 $scope.Invoice.PaymentAmount = $scope.PaymentAmount;
             }
             


         })
            .error(function (error) {
                $scope.status = 'Unable to save PatientServiceItem data: ' + error.message;
                console.log($scope.status);
                
            });
    }

    // first payment while invoice is not there
    if (singleInvoice.Id == null && billingItems.length > 0) {
        angular.forEach(billingItems, function (item, key) {
            $scope.Invoice.TotalAmount += item.ServiceListPriceAfterDiscount;
            $scope.Invoice.TotalDiscount += parseFloat(item.Discount);

            $scope.GenerateServiceItem(item);

        });

        if ($scope.isLabItem) {
            $scope.Invoice.LabStatusId = 1;
        }
        else {
            $scope.Invoice.LabStatusId = null;
        }

      saveInvoice();



    } else // second payment while invoice is there
    {
        // console.log("need to load invoice");
        $scope.Invoice = singleInvoice;


        if (singleInvoice.Id != null && billingItems.length > 0) {
            angular.forEach(billingItems, function (item, key) {

                $scope.GenerateServiceItemAfterInvoice(item);

            });
        }

        if ($scope.Invoice.InvoicePayments.length > 0) {
            angular.forEach($scope.Invoice.InvoicePayments, function (item) {

                $scope.TotalPaid = $scope.TotalPaid + item.Amount;
                $scope.Invoice.PaymentAmount = parseFloat($scope.Invoice.TotalAmount) - parseFloat($scope.TotalPaid);

            });
        } else {

            $scope.Invoice.PaymentAmount = parseFloat($scope.Invoice.TotalAmount);
        }

    }

    /* ---------------------------------------------------------------------------------------------*/

    /***************************************  reconcile amount adjust begin *******************************/

    /*----------------------------------------------------------------------------------------------------*/

    

    var advanceAmount = 0;
    var keepGoing = true;
    $scope.TotalPayableAmount = 0;

    var totalPayableAmount = $scope.Invoice.TotalAmount - $scope.TotalPaid;

    $scope.InvoicePaymentList = [];

    angular.forEach(advancePayment, function (item) {

        $scope.InvoicePayment = {
            InvoiceId: 0,
            Amount: 0.0,
            PaymentID: null,
            UserId: null


        };

        if (keepGoing) {

            /* update invoice payment begin */

            $scope.InvoicePayment.PaymentID = item.Id;

            var itemAdvanceAmount = (item.Amount - item.DeductionAmount);

            advanceAmount = advanceAmount + itemAdvanceAmount;

            /*---------------- defination ---------------------*/

            // totalPayableAmount == total amount client need to pay

            //$scope.TotalPayableAmount  ==  summation of amount client paid from advance amount

            //itemAdvanceAmount  ==  advance amount per item

            //  advanceAmount == summation of advance amount of items

            /*-----------------------end defination-------------------------*/

            if (totalPayableAmount >= advanceAmount) {
                item.DeductionAmount = item.DeductionAmount + itemAdvanceAmount;

                /* update invoice payment begin */

                $scope.InvoicePayment.Amount = itemAdvanceAmount;
                $scope.TotalPayableAmount += itemAdvanceAmount;

                $scope.InvoicePaymentList.push($scope.InvoicePayment);

                /* update invoice payment end */


                if (totalPayableAmount == advanceAmount) {
                    keepGoing = false;
                }

            } else {
                /*  var tempDeduction = $scope.Invoice.TotalAmount - advanceAmount;
      
                  if (tempDeduction > 0) {
                      item.DeductionAmount = item.Amount - tempDeduction;
                  } else {
      
                      item.DeductionAmount = item.Amount + tempDeduction;
                      advanceAmount = advanceAmount - tempDeduction;
                  }
                  */
                var itemPayableAmount = totalPayableAmount - $scope.TotalPayableAmount;

                item.DeductionAmount = item.DeductionAmount + itemPayableAmount;


                /* update invoice payment begin */


                $scope.InvoicePayment.Amount = itemPayableAmount;
                $scope.TotalPayableAmount += itemPayableAmount;

                $scope.InvoicePaymentList.push($scope.InvoicePayment);

                /* update invoice payment end */


                keepGoing = false;
            }
        }



    });

    if ($scope.InvoicePaymentList.length > 0) {
        $scope.ReconcileAmount = $scope.TotalPayableAmount;


        $scope.Invoice.PaymentAmount = $scope.Invoice.TotalAmount - $scope.ReconcileAmount - $scope.TotalPaid;
        $scope.PaymentFlag = false;
        $scope.PaymentAmount = $scope.Invoice.PaymentAmount;

    }

    console.log(advancePayment);



    /* ---------------------------------------------------------------------------------------------*/

    /*************************************** reconcile amound adjust end *******************************/

    /*----------------------------------------------------------------------------------------------------*/



    $scope.CheckReconcileAmount = function () {
        var totalPayableAmount = $scope.Invoice.TotalAmount - $scope.TotalPaid;
        var restPaidAmount = totalPayableAmount - $scope.TotalPayableAmount;

        if ($scope.Invoice.PaymentAmount > restPaidAmount) {
            $window.alert("Please endter correct amount");
            $scope.Invoice.PaymentAmount = restPaidAmount;
        }

    }

    $scope.ok = function () {

        $scope.InvoicePayment = {
            InvoiceId: 0,
            Amount: 0.0,
            PaymentID: null,
            UserId: null


        };


        if ($scope.InvoicePaymentList.length > 0) {
            angular.forEach($scope.InvoicePaymentList, function (item) {
                item.PatientInvoiceId = $scope.Invoice.Id;

            });
        }


        //  set payment method & card number
        $scope.Payment.PaymentMethodId = $scope.PaymentMethod;
        if ($scope.CardNumber != "1") {
            $scope.Payment.CardNumber = $scope.CardNumber;
        }


        if ($scope.Payment.PaymentMethodId != "1") {
            $scope.Payment.CardNumber = $scope.CardNumber;
        }

        if ($scope.Invoice.Id != null) {

            var paymentamount = 0;
            var total = parseFloat($scope.TotalPaid);
            var recenpayment = parseFloat($scope.Invoice.PaymentAmount);


            paymentamount = (total + recenpayment);



            if (paymentamount == $scope.Invoice.TotalAmount) {
                $scope.Invoice.InvoiceStatusId = "2";

            } else if (paymentamount > $scope.Invoice.TotalAmount) {
                $scope.Invoice.PaymentAmount = parseFloat($scope.Invoice.TotalAmount) - total;
                $scope.Invoice.InvoiceStatusId = "2";
            }


            if (($scope.ReconcileAmount + recenpayment) == ($scope.Invoice.TotalAmount - $scope.TotalPaid))
            {
                $scope.Invoice.InvoiceStatusId = "2";
            }





            $scope.Payment.Amount = $scope.Invoice.PaymentAmount;

            $scope.InvoicePayment.PatientInvoiceId = $scope.Invoice.Id;
            $scope.InvoicePayment.Amount = $scope.Invoice.PaymentAmount;
            $scope.InvoicePayments.push($scope.InvoicePayment);
            $scope.Payment.InvoicePayments = $scope.InvoicePayments;


            angular.forEach(advancePayment, function (item) {
                item.Date =ToJavaScriptDate(item.Date);

            });

          
            BillingService.SavePayment($scope.Payment, $scope.InvoicePaymentList, advancePayment, $scope.ReconcileAmount)
            .success(function (data) {

                console.log(data);
                // $scope.Invoice.Id = data;
                // $modalInstance.close({ Invoice: $scope.Invoice, });

                $scope.Invoice.DueDate = ToJavaScriptDate($scope.Invoice.DueDate);
                $scope.Invoice.InvoiceDate = ToJavaScriptDate($scope.Invoice.InvoiceDate);

               BillingService.SaveInvoice($scope.Invoice, $scope.PatientServiceItem)
                    .success(function (data) {

                        console.log(data);
                        $scope.Invoice = data;
                        $scope.Invoice.InvoiceDate = ToJavaScriptDate($scope.Invoice.InvoiceDate);
                        $modalInstance.dismiss('cancel');


                    })
                    .error(function (error) {
                        $scope.status = 'Unable to save PatientServiceItem data: ' + error.message;
                        console.log($scope.status);

                    });










            })
            .error(function (error) {
                $scope.status = 'Unable to save Payment data: ' + error.message;
                console.log($scope.status);
            });
            
        }





    };
    $scope.cancel = function () {

        $modalInstance.dismiss('cancel');
    };



});


HmsApp.controller("AdvancePaymentModalController", function ($scope, $modalInstance, $filter, BillingService) {


    $scope.PaymentMethod = "1";

    $scope.Payment = {

        Amount: 0.0,
        DeductionAmount: 0.0,
        PaymentTypeId: 103,
        PatientID: $scope.Patient.Id,
        UserId: null,
        Date: $filter('date')(new Date(), 'MM/dd/yy hh:mm:ss'),
        PaymentMethodId: $scope.PaymentMethod,
        CardNumber: null



    };


    $scope.ok = function (file) {

        //  set payment method & card number
        $scope.Payment.PaymentMethodId = $scope.PaymentMethod;
        if ($scope.CardNumber != "1") {
            $scope.Payment.CardNumber = $scope.CardNumber;
        }




        BillingService.SaveAdvancePayment($scope.Payment)
                .success(function (data) {


                    $modalInstance.dismiss('cancel');


                }).error(function (error) {
                    $scope.status = 'Unable to save Avance payment data: ' + error.message;
                    console.log($scope.status);

                });



        //$modalInstance.close();
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


});