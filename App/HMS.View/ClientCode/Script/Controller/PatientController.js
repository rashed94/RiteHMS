'use strict';

//HmsApp.directive('datepickerAuto', function () {
//    return {
//        require: ['ngModel'],
//        restrict: 'E',
//        template: '<input class="input form-control" datepicker-popup="MM/dd/yyyy" show-weeks="false"' +
//            ' is-open="autoIsOpen" ng-focus="autoIsOpen = true" ng-click="autoIsOpen = true"'
//            + ' type="text" ng-model="ngModel" ng-model-options="{\'updateOn\': \'blur\'}"/>',
//        link: function (scope) {
//            scope.autoIsOpen = false;
//        },
//        scope: {
//            ngModel: '='
//        }

//    };
//});

HmsApp.controller("PatientController", function ($scope, $routeParams, $timeout, $window, $modal,$location, $filter, $http,$localStorage, PatientService) {
    //$scope.calculateAge = function (birthday) { // birthday is a date
    //    var ageDifMs = Date.now() - birthday.getTime();
    //    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    //    return Math.abs(ageDate.getUTCFullYear() - 1970);
    //}

    $scope.Items = [];
    $scope.Patient = {};
    $scope.Patient.Photo = "";
    $scope.IsPatientLoaded = "";
    $scope.ServiceProviderType = 56;  // which is doctor
    $scope.LabratoryItemCategoryId = 62;
    $scope.NonRegisterPatientId = 10212;
    $scope.PatientAdmission = {

        Id:null,
        PatientId: $scope.Patient.Id,
        AdmissionDate: null,
        DischargeDate: null,
        ServiceProviderId: "",
        RefererId: "",
        DepartmentId: "",
        BedId: null,
        IsReleased: true,
        Notes:""
    };
   
   
    
  /*  $scope.getRandomSpan = function () {
        return Math.floor((Math.random() * 60) + 1);
    }

    console.log($scope.getRandomSpan());*/

    $scope.getAppointment = function () {
        if ($scope.Patient) {
            if ($scope.Patient.Id != null) {

                PatientService.GetDoctorAppointmentsByPatientId($scope.Patient.Id)
                .success(function (doctorAppointments) {
                    $.each(doctorAppointments, function (index, doctorAppointment) {
                        doctorAppointment.AppointmentDate = new Date(parseInt(doctorAppointment.AppointmentDate.substring(6, doctorAppointment.AppointmentDate.length - 2)));
                    });
                    $scope.DoctorAppointments = doctorAppointments;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load Patient Appointment data: ' + error.message;
                    console.log($scope.status);
                });
            }
        }
    }
    $scope.$watch('Patient', function () {

        if ($scope.Patient) {
            if ($scope.Patient.Id != null) {
                sessionStorage.Patient = angular.toJson($scope.Patient);
                $scope.Patient.Name = $scope.Patient.FirstName + " " + $scope.Patient.LastName;
                $scope.getAppointment();

            }
        }
        
        $scope.$broadcast('patientchange', { "val": '' });
    });

    $scope.CancelAppointment = function (ItemsAppointments,doctorAppointmentId,index) {
        PatientService.CancelAppointment(doctorAppointmentId)
            .success(function (doctorAppointments) {
                ItemsAppointments.splice(index, 1);
                //var index = -1;
                //$.each(doctorAppointments, function (i, doctorAppointment) {
                //    if (doctorAppointment.Id == doctorAppointmentId) {
                //        index = i;
                //    }
                //});
                //if (index > -1) {
                //    $scope.DoctorAppointments.splice(index, 1);
                //}
            })
            .error(function (error) {
                $scope.status = 'Unable to load Appointment data: ' + error.message;
                console.log($scope.status);
            });
    };

    $scope.Patient = angular.fromJson(sessionStorage.Patient);

    $scope.initDatePicker=function () {
        $('.reportdeliverydate').datepicker({
            format: "mm/dd/yyyy"
        }).on('changeDate', function (ev) {
            $(this).blur();
            $(this).datepicker('hide');
        });
        
    }
    $scope.AgeCalculate = function () {

        $scope.Patient.DOB = ToJavaScriptDate($scope.Patient.DOB);
        $scope.Patient.Age = calculateAge($scope.Patient.DOB);



    }

    $scope.GetPatients = function () {
        PatientService.GetPatients()
            .success(function (cts) {
                $scope.Patients = cts;
               
            })
            .error(function (error) {
                $scope.status = 'Unable to load Patient data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.GetPatientById = function (id) {
        PatientService.GetPatientById(id)
            .success(function (pt) {
                $scope.Patient = pt;
                $scope.Patient.Name = pt.FirstName + " " + pt.LastName;
                if ($scope.Patient.DOB != null) {
                    $scope.AgeCalculate();
                }
                //$scope.$broadcast('update_child_controller', $scope.Patient);
                console.log($scope.Patient);
               // $scope.IsPatientLoaded = $scope.Patient.Id;
            })
            .error(function (error) {
                $scope.status = 'Unable to load Patient data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.GetPatientByPhone = function (phone) {
        PatientService.GetPatientByPhone(phone)
            .success(function (pt) {
                $scope.Patient = pt;
                $scope.Patient.Name = pt.FirstName + " " + pt.LastName;
                console.log($scope.Patient);
               // $scope.IsPatientLoaded = $scope.Patient.Id;
            })
            .error(function (error) {
                $scope.status = 'Unable to load Patient data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.GetPatientsByName = function (name) {
        PatientService.GetPatientsByName(name)
            .success(function (pt) {
                $scope.Patients = pt;
                console.log($scope.Patients);
               // $scope.IsPatientLoaded = $scope.Patient.Id;
            })
            .error(function (error) {
                $scope.status = 'Unable to load Patient data: ' + error.message;
                console.log($scope.status);
            });
    }

    $scope.updateItem=function($item)
    {
        angular.forEach($scope.Items, function (obj) {
            // obj.push($item);
            if (obj.Id == $item.Id) {

                obj.Amount = obj.SalePrice * $item.Quantity;

            }
        });
    }

    $scope.updateReferrerItem = function ($item,doctor) {
        if (doctor == '')
        {
           
            angular.forEach($scope.Items, function (obj) {
                // obj.push($item);
                

                    obj.ReferralFee = obj.DefaultReferrarFee;
                    obj.ServiceProviderId = 0;
                    obj.Doctor = "";
               
            });
        }
    }
    $scope.serviceItemSave=function()
    {
        $scope.PatientServiceItem = [];
      
        if (typeof $scope.Patient === "undefined") {


            alert("Please Select a Patient");

        } else {


            angular.forEach($scope.Items, function (obj) {

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
                if ($scope.Patient) {
                    if ($scope.Patient.Id != null) {
                        $scope.serviceItem.PatientID = $scope.Patient.Id;
                    }
                }
                $scope.serviceItem.ItemId = obj.Id;
                $scope.serviceItem.InvoiceID = null;
                $scope.serviceItem.PatientAdmissionId = $scope.Patient.AdmissionId;
                $scope.serviceItem.ServiceListPrice = obj.Amount;
                $scope.serviceItem.ServiceActualPrice = obj.SalePrice;
                $scope.serviceItem.ServiceQuantity = obj.Quantity;
                $scope.serviceItem.ServiceDate = $filter('date')(new Date(), 'MM/dd/yy hh:mm:ss');
                $scope.serviceItem.ServiceProviderId = obj.ServiceProviderId;


                if (obj.MedicalTypeId == $scope.LabratoryItemCategoryId) {
                    $scope.serviceItem.LabStatusId = 1;
                    $scope.serviceItem.ReferralFeePaid = 0;
                }
                else {
                    $scope.serviceItem.LabStatusId = null;
                    $scope.serviceItem.ReferralFeePaid = null;
                }
                $scope.serviceItem.UserId = '';
                $scope.serviceItem.Discount = 0;
                $scope.serviceItem.Refund = '';
                $scope.serviceItem.Billed = '';
                $scope.serviceItem.ReferralFee = obj.ReferralFee;
                $scope.serviceItem.DeliveryDate = obj.Date;
                $scope.serviceItem.DeliveryTime = obj.ReportDeliveryTime;

                $scope.PatientServiceItem.push($scope.serviceItem);


            });

            PatientService.SavePatientServiceItem($scope.PatientServiceItem)
            .success(function (data) {

                var peviousBillingItem = [];
                if ($scope.NonRegisterPatientId == $scope.Patient.Id) {

                     
                     peviousBillingItem = $localStorage.BillingItem;
                    if (peviousBillingItem.length > 0)
                    {
                        angular.forEach(data, function (item) {
                            peviousBillingItem.push(item);
                        });
                     } else
                    {
                        peviousBillingItem = data;
                    }
                    $localStorage.BillingItem = peviousBillingItem;
                }
                console.log(data);
                // $scope.UpdateTopLink('billing');
                // $window.location.href = '#/billing/summary';
                $location.path('/billing/summary');
                $scope.serviceItemEmpty();

            })
            .error(function (error) {
                $scope.status = 'Unable to save PatientServiceItem data: ' + error.message;
                console.log($scope.status);
            });
        }

    }
    $scope.serviceItemEmpty=function()
    {
        $scope.Items = [];
    }
  

    //$scope.deleteItem = function ($item) {
    //    angular.forEach($scope.Items, function (obj) {
    //        // obj.push($item);
    //        if (obj.Id == $item.Id) {

    //            $scope.ite

    //        }
    //    });
    //}

    $scope.updateAllReferellFee = function ($item, serviceitem)
    {
        if ($item.ReferralFee > 0) {
            serviceitem.ReferralFee = $item.ReferralFee;

            var found = $filter('filter')($scope.Items, { Id: serviceitem.Id }, true);
            if (!found.length) {
                $scope.Items.push(serviceitem);
            }
        } else {
            serviceitem.ReferralFee = serviceitem.DefaultReferrarFee;
        }
        serviceitem.ServiceProviderId = $item.Id;
    }

    $scope.OnDocotorSelect = function ($item,serviceitem) {

        angular.forEach($scope.Items, function (obj) {

            if (obj.ReferralAllowed) {

                obj.Doctor = $item.Contact.FirstName + ' ' + $item.Contact.LastName;

                //var currentItem=GetServiceProviderPartialName($item.Contact.FirstName, obj.Id)

                $http.get('/patient/getDoctorByID?serviceProviderID=' + $item.Id + "&typeId=" + $scope.ServiceProviderType + "&itemId=" + obj.Id).then(function (response) {
                     var data = response.data;
                     $scope.updateAllReferellFee(data, obj);
                    
                });

                
            }

        });

        
        //  console.log($item.Id);

    }



    $scope.OnPatientSelect = function ($item, $model, $label) {
        $scope.Patient = $item;
        $scope.Patient.Name = $item.FirstName + " " + $item.LastName;
       // $scope.Patient.Name = $item.FirstName + "  " + $item.LastName;
        if ($scope.Patient.DOB != null) {
            $scope.AgeCalculate();
        }
        $scope.getPatientAdmission();
       

       // $scope.$broadcast('patientchange', { "val": '' });
    };

    $scope.SearchPatientsByPartialName = function (name) {
        return $http.get('/Patient/SearchPatientByPartialName?name=' + name).then(function (response) {
           // $scope.Patient = response.data;
            return response.data;
        });
    }

    $scope.FormatInput = function ($model) {
        var inputLabel = '';
        angular.forEach($scope.Patients, function (patient) {
            if ($model === patient.Id) {
                inputLabel = patient.FirstName + " " + patient.LastName;
            }
        });
        return inputLabel;
    }

    $scope.SavePatient = function (file) {
        PatientService.SavePatient($scope, file);
    }

    $scope.PatientModal = function (size, isEdit) {
        var patient = {

        };
        var modalInstance = $modal.open({
            templateUrl: '/ClientCode/Template/EditPatient.html',
            size: size,
            controller: 'ModalController',
            scope: $scope,
            resolve: {
                patient: function () {
                    return isEdit ? $scope.Patient : patient;
                }
            }
        });
        modalInstance.result.then(function (result) {
            $scope.Patient = result.Patient;
           
            $scope.SavePatient(result.File);
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };


    

    if ($scope.Patient) {
        if ($scope.Patient.Id != null) {
            $scope.getAppointment();
        }
    }

    $scope.isEmpty = function (obj) {
        for (var i in obj) if (obj.hasOwnProperty(i)) return false;
        return true;
    };




    if ($routeParams.id != null) {
        $scope.GetPatientById($routeParams.id);
    }
    else {
        //$scope.Patient = {};
    }


    $scope.OpenAdmissionModal = function (size) {

        

        var modalInstance = $modal.open({
            templateUrl: '/ClientCode/Template/AdmitToHospital.html',
            size: size,
            controller: 'HospitalAmissionModalController',
            scope: $scope,
            resolve:{}
            
        });
        modalInstance.result.then(function (result) {

            if ($scope.Patient) {

                if ($scope.Patient.Id != null) {

                    // $scope.
                    $scope.getPatientAdmission();
                    $window.location.href = '#/bedsetup/summary';
                }

            }

            

            console.log('Modal ok at: ' + new Date());
           
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.getPatientAdmission=function()
    {
        if ($scope.Patient) {
            if ($scope.Patient.Id != null) {
                PatientService.GetAdmission($scope.Patient.Id)
                .success(function (data) {

                    console.log(data);
                    if (data.StatusCode == 404) {
                        $scope.PatientAdmission = {

                            Id: null,
                            PatientId: $scope.Patient.Id,
                            AdmissionDate: null,
                            DischargeDate: null,
                            ServiceProviderId: "",
                            RefererId: "",
                            DepartmentId: "",
                            BedId: null,
                            IsReleased: true
                        };

                        $scope.Patient.AdmissionId = null;

                    } else {
                        $scope.PatientAdmission = data;
                        $scope.Patient.AdmissionId = $scope.PatientAdmission.Id;
                    }


                })
                .error(function (error) {

                    $scope.status = 'Unable to get Admission data: ' + error.message;
                    console.log($scope.status);

                });
            }
        }
    }

    $scope.DischagePatient=function()
    {
        $scope.PatientAdmission.DischargeDate = $filter('date')(new Date(), 'MM/dd/yy');
        $scope.PatientAdmission.IsReleased = true;
        $scope.PatientAdmission.AdmissionDate=ToJavaScriptDate($scope.PatientAdmission.AdmissionDate);
        PatientService.DischagePatient( $scope.PatientAdmission)
                .success(function (data) {

                    console.log("Discharge successful");
                    $scope.getPatientAdmission();

                })
                .error(function (error) {

                            $scope.status = 'Unable to Discharge Admission: ' + error.message;
                            console.log($scope.status);

                });


    }
    $scope.getPatientAdmission();

});