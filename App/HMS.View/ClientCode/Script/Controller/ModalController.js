'use strict';

HmsApp.controller("ModalController", function ($scope, $modalInstance, patient, PatientService) {
    $scope.Patient = patient;
    $scope.ok = function (file) {
        $modalInstance.close({Patient: $scope.Patient, File: file});
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

HmsApp.controller("ServiceProviderModalController", function ($scope, $modalInstance, serviceProvider, ConfigurationService) {
    $scope.ServiceProvider = serviceProvider;
    if ($scope.ServiceProvider.Contact.Gender == null)
    {
        $scope.ServiceProvider.Contact.Gender = false;
        $scope.ServiceProvider.ServiceProviderTypeId = 56;
        $scope.ServiceProvider.ServiceProviderType = { Id: 56 };
        $scope.ServiceProvider.DepartmentId = 205;
        $scope.ServiceProvider.Department = { Id: 205 }
    }

    $scope.ok = function (file) {
        $modalInstance.close({ ServiceProvider: $scope.ServiceProvider, File: file });
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});


HmsApp.controller("LabReportTemplateResultModalController", function ($scope, $http, $modalInstance, $filter, $window, isEdit, PatientServiceItem, LabTestItem, LabTestService) {

    $scope.InvoiceStatusUpdate=true;


    $scope.loadSavedData=function()
    {
        if (CKEDITOR.instances.editor1) {

            if(PatientServiceItem.ReportFormatName === null)
            {
                CKEDITOR.instances.editor1.setData("");


            }else
            {
                CKEDITOR.instances.editor1.setData(PatientServiceItem.ReportFormatName);
            }

        } 
    }
    $scope.LoadData=function()
    {
        if ($scope.labreportTemplates != null) {
            $scope.labreportSingleTemplate = $scope.labreportTemplates[0];

            richTextData = $scope.labreportSingleTemplate.RichContent;
            CKEDITOR.instances.editor1.setData(richTextData);
        }
    }


    if (isEdit=="false") {
        LabTestService.LoadLabReportbyId(PatientServiceItem.Item.Id)
            .success(function (pt) {
                console.log(pt);
                $scope.labreportTemplates = pt;
                $scope.LoadData();

            })
            .error(function (error) {
                $scope.status = 'Unable to load  lab report  ' + error.message;
                console.log($scope.status);
            });

    }



    $scope.ok = function (richTextData) {

        PatientServiceItem.LabStatusId = "2";
        PatientServiceItem.ReportFormatName = richTextData;
        PatientServiceItem.Staus = "Completed";

        angular.forEach(LabTestItem.PatientServices, function (item) {

            if (PatientServiceItem.Id != item.Id) {
                if (item.LabStatusId == "1") {
                    $scope.InvoiceStatusUpdate = false;
                } 
            }
        });

        if ($scope.InvoiceStatusUpdate) {
            LabTestItem.Staus = "Completed";
            LabTestItem.LabStatusId = "2";

        }

        LabTestService.UpdateLabStatus(PatientServiceItem, $scope.InvoiceStatusUpdate, PatientServiceItem.InvoiceID)
            .success(function (pt) {
            console.log(pt);
            $scope.labreportTemplates = pt;
            //$scope.LoadData();

            })
            .error(function (error) {
            $scope.status = 'Unable to load  lab report  ' + error.message;
            console.log($scope.status);
            });


        $modalInstance.dismiss('cancel');
    };


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };



});

HmsApp.controller("LabReportTemplateModalController", function ($scope, $http, $modalInstance, $filter, $window, isEdit, labReportID, LabTestService) {

    $scope.templateData = {};


        $scope.LoadLabReport=function()
        {
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

        if (isEdit=='true') {
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

HmsApp.controller("CommissionModalController", function ($scope, $http, $modalInstance, $filter, $window,LabTestService) {



    $scope.Referral ={};
    

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

 
            $scope.Referral.itemId= $scope.SingleLabItem.Id;
            $scope.Referral.ServiceProviderId=  $scope.Doctor.Id;
            $scope.Referral.ReferralFee=$scope.CommissionAmount;
      

            $scope.saveCommission();
           
      // $modalInstance.dismiss('cancel');
       
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };



    $scope.OnDocotorSelect=function($item)
    {
        $scope.Doctor.Name = $item.Contact.FirstName + " " + $item.Contact.LastName;
        $scope.Doctor.Id=$item.Id;
    }

    $scope.GetDoctorPartialName = function (name) {


        //return $http.get('/patient/getserviceproviderpartialname?name=' + name + "&itemid=" + itemid).then(function (response) {
        //    var data = response.data;
        //    return response.data;
        //});

        /*----------------------------  TypeId 56 means doctor --------------------------------------------------*/

        return $http.get('/patient/getdoctorbyname?name=' + name + "&typeId=" + 56).then(function (response) {
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

HmsApp.controller("InvoiceModalController", function ($scope, $modalInstance, $filter, $window, billingItems, singleInvoice, BillingService) {

    $scope.PatientServiceItem = [];
    $scope.InvoicePayments = [];
    $scope.TotalPaid = 0.00;
    $scope.isLabItem = false;

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
        UserId:null
    };

    $scope.InvoicePayment = {
        InvoiceId:0,
        Amount: 0.0,
        PaymentID: null,
        UserId:null


    };
    $scope.Payment = {

        Amount:0.0, 
        DeductionAmount:0.0,
        PaymentTypeId :101,
        PatientID:$scope.Patient.Id, 
        UserId:null,
        Date : $filter('date')(new Date(), 'MM/dd/yy hh:mm:ss')
       

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
        $scope.serviceItem.ItemID = item.ItemID;
        $scope.serviceItem.InvoiceID = 0;
        $scope.serviceItem.ServiceListPrice = item.ServiceListPriceAfterDiscount;
        $scope.serviceItem.ServiceActualPrice = item.ServiceActualPrice;
        $scope.serviceItem.ServiceQuantity = item.ServiceQuantity;
        $scope.serviceItem.ServiceDate = ToJavaScriptDate(item.ServiceDate);
        $scope.serviceItem.UserId = '';
        $scope.serviceItem.Discount = item.Discount;
        $scope.serviceItem.Refund = '';
        $scope.serviceItem.Billed = '';
        $scope.serviceItem.ReferralFee = item.ReferralAfterDiscount;
        $scope.serviceItem.DeliveryDate = ToJavaScriptDate(item.DeliveryDate);
        $scope.serviceItem.DeliveryTime = item.DeliveryTime;
        $scope.serviceItem.ReferralFeePaid = item.ReferralFeePaid;
        $scope.serviceItem.ServiceProviderId = item.ServiceProviderId;
        $scope.serviceItem.LabStatusId = item.LabStatusId;
        if (item.LabStatusId == 1)
        {
            $scope.isLabItem = true;
        }

        $scope.PatientServiceItem.push($scope.serviceItem);
    }

    $scope.saveInvoice = function () {
        BillingService.SaveInvoice($scope.Invoice, $scope.PatientServiceItem)
         .success(function (data) {

             console.log(data);
             $scope.Invoice = data;
             $scope.Invoice.InvoiceDate = ToJavaScriptDate($scope.Invoice.InvoiceDate);
             return data;
             

         })
            .error(function (error) {
                $scope.status = 'Unable to save PatientServiceItem data: ' + error.message;
                console.log($scope.status);
                return error;
            });
    }

    // first payment while invoice is not there
    if (singleInvoice.Id == null && billingItems.length>0) {
        angular.forEach(billingItems, function (item, key) {
            $scope.Invoice.TotalAmount += item.ServiceListPriceAfterDiscount * item.ServiceQuantity;
            $scope.Invoice.TotalDiscount += item.Discount * item.ServiceQuantity;
            $scope.GenerateServiceItem(item);

        });

        if ($scope.isLabItem) {
            $scope.Invoice.LabStatusId = 1;
        }
        else {
            $scope.Invoice.LabStatusId = null;
        }

        $scope.saveInvoice();



    } else // second payment while invoice is there
    {
        // console.log("need to load invoice");
        $scope.Invoice = singleInvoice;
        angular.forEach($scope.Invoice.InvoicePayments, function (item) {
            
            $scope.TotalPaid = $scope.TotalPaid + item.Amount;
            $scope.Invoice.PaymentAmount = parseFloat($scope.Invoice.TotalAmount) - parseFloat($scope.TotalPaid);
            
        });

    }



    $scope.ok = function () {



        if ($scope.Invoice.Id != null) {

            var paymentamount =0;
            var total = parseFloat($scope.TotalPaid);
            var recenpayment=parseFloat( $scope.Invoice.PaymentAmount);


            paymentamount = (total + recenpayment);

            if (paymentamount == $scope.Invoice.TotalAmount)
            {
                $scope.Invoice.InvoiceStatusId = "2";

            } else if (paymentamount > $scope.Invoice.TotalAmount)
            {
                $scope.Invoice.PaymentAmount = parseFloat($scope.Invoice.TotalAmount) - total;
                $scope.Invoice.InvoiceStatusId = "2";
            }



            $scope.Payment.Amount = $scope.Invoice.PaymentAmount;

            $scope.InvoicePayment.PatientInvoiceId = $scope.Invoice.Id;
            $scope.InvoicePayment.Amount = $scope.Invoice.PaymentAmount;
            $scope.InvoicePayments.push($scope.InvoicePayment);
            $scope.Payment.InvoicePayments = $scope.InvoicePayments;

            BillingService.SavePayment($scope.Payment)
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