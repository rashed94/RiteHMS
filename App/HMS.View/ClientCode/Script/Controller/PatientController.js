﻿'use strict';

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

HmsApp.controller("PatientController", function ($scope, $routeParams, $timeout, $window, $modal,$location, $filter, $http, PatientService) {
    //$scope.calculateAge = function (birthday) { // birthday is a date
    //    var ageDifMs = Date.now() - birthday.getTime();
    //    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    //    return Math.abs(ageDate.getUTCFullYear() - 1970);
    //}

    $scope.Items = [];
    $scope.Patient = {};
    $scope.Patient.Photo = "";
    $scope.IsPatientLoaded = "";


    $scope.$watch('Patient', function () {

        if ($scope.Patient) {
            if ($scope.Patient.Id != null) {
                sessionStorage.PatientService = angular.toJson($scope.Patient);
                $scope.Patient.Name = $scope.Patient.FirstName + " " + $scope.Patient.LastName;

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
        
        $scope.$broadcast('patientchange', { "val": '' });
    });

    $scope.CancelAppointment = function (doctorAppointmentId) {
        PatientService.CancelAppointment(doctorAppointmentId)
            .success(function (doctorAppointments) {
                $.each(doctorAppointments, function (index, doctorAppointment) {
                    if (doctorAppointment.Id == doctorAppointmentId) {
                        doctorAppointment.remove();
                    }
                });
            })
            .error(function (error) {
                $scope.status = 'Unable to load Appointment data: ' + error.message;
                console.log($scope.status);
            });
    };

    $scope.Patient = angular.fromJson(sessionStorage.PatientService);

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
            $item.ServiceProviderId = 0;
            angular.forEach($scope.Items, function (obj) {
                // obj.push($item);
                if (obj.Id == $item.Id) {

                    obj.ReferralFee = obj.DefaultReferrarFee;

                }
            });
        }
    }
    $scope.serviceItemSave=function()
    {
        $scope.PatientServiceItem = [];
      
        
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
            $scope.serviceItem.PatientID = $scope.Patient.Id;
            $scope.serviceItem.ItemID = obj.Id;
            $scope.serviceItem.InvoiceID = 0;
            $scope.serviceItem.ServiceListPrice = obj.Amount;
            $scope.serviceItem.ServiceActualPrice = obj.SalePrice;
            $scope.serviceItem.ServiceQuantity = obj.Quantity;
            $scope.serviceItem.ServiceDate = $filter('date')(new Date(), 'MM/dd/yy hh:mm:ss');
            $scope.serviceItem.ServiceProviderId = obj.ServiceProviderId;

          
            if (obj.MedicalTypeId == "62") {
                $scope.serviceItem.LabStatusId = 1;
                $scope.serviceItem.ReferralFeePaid = 0;
            }
            else
            {
                $scope.serviceItem.LabStatusId = null;
                $scope.serviceItem.ReferralFeePaid =null;
            }
            $scope.serviceItem.UserId = '';
            $scope.serviceItem.Discount = '';
            $scope.serviceItem.Refund = '';
            $scope.serviceItem.Billed = '';
            $scope.serviceItem.ReferralFee = obj.ReferralFee;
            $scope.serviceItem.DeliveryDate = obj.Date;
            $scope.serviceItem.DeliveryTime = obj.ReportDeliveryTime;

            $scope.PatientServiceItem.push($scope.serviceItem);
            
        });

        PatientService.SavePatientServiceItem($scope.PatientServiceItem)
        .success(function (data) {
                
            console.log(data);
            $scope.UpdateTopLink('billing');
            $window.location.href = '#/billing';
           
        })
        .error(function (error) {
            $scope.status = 'Unable to save PatientServiceItem data: ' + error.message;
            console.log($scope.status);
        });


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



    $scope.OnDocotorSelect = function ($item,serviceitem) {


        if ($item.ReferralFee > 0) {
            serviceitem.ReferralFee = $item.ReferralFee;

            var found = $filter('filter')($scope.Items, { Id: serviceitem.Id }, true);
            if (!found.length) {
                $scope.Items.push(serviceitem);
            }
        }else
        {
            serviceitem.ReferralFee = serviceitem.DefaultReferrarFee;
        }
        serviceitem.ServiceProviderId = $item.Id;

        //  console.log($item.Id);

    }



    $scope.OnPatientSelect = function ($item, $model, $label) {
        $scope.Patient = $item;
        $scope.Patient.Name = $item.FirstName + " " + $item.LastName;
       // $scope.Patient.Name = $item.FirstName + "  " + $item.LastName;
        if ($scope.Patient.DOB != null) {
            $scope.AgeCalculate();
        }
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

    $scope.UpdateTopLink = function (link) {
        if (link.indexOf("patient")>-1) {
        $('.site_navigation li a').removeClass('selected');
        $('.site_navigation li.patientinfo a').addClass('selected');
            // $location.path = $location.path(link);
      //  $window.location.href = '#/patient';
        }
        else if( link.indexOf("billing")>-1)
        {
            $('.site_navigation li a').removeClass('selected');
            $('.site_navigation li.billing a').addClass('selected');
          
          //  $window.location.href = '#/billing';
        }
        else if (link.indexOf("labtest")>-1) {
            $('.site_navigation li a').removeClass('selected');
            $('.site_navigation li.labtest a').addClass('selected');

            //  $window.location.href = '#/billing';
        }
        else if ( link.indexOf("appointment")>-1) {
            $('.site_navigation li a').removeClass('selected');
            $('.site_navigation li.appointment a').addClass('selected');

            //  $window.location.href = '#/billing';
        }
        else if ( link.indexOf("configuration")>-1) {
            $('.site_navigation li a').removeClass('selected');
            $('.site_navigation li.configuration a').addClass('selected');

            //  $window.location.href = '#/billing';
        }
        else if (link.indexOf("pharmacy") > -1) {
            $('.site_navigation li a').removeClass('selected');
            $('.site_navigation li.pharmacy a').addClass('selected');

            //  $window.location.href = '#/billing';
        }

        else if (link.indexOf("bedsetup") > -1) {
            $('.site_navigation li a').removeClass('selected');
            $('.site_navigation li.bedsetup a').addClass('selected');

            //  $window.location.href = '#/billing';
        }
        else {
            $('.site_navigation li a').removeClass('selected');
            $('.site_navigation li.patientinfo a').addClass('selected');

        }

    }
    $scope.isEmpty = function (obj) {
        for (var i in obj) if (obj.hasOwnProperty(i)) return false;
        return true;
    };

    if ($location.path() != null) {

        $scope.UpdateTopLink($location.path());
    }


    if ($routeParams.id != null) {
        $scope.GetPatientById($routeParams.id);
    }
    else {
        //$scope.Patient = {};
    }
});