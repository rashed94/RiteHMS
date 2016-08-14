using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using HMS.DAL;
using HMS.Model.Core;
using HMS.DAL.Repository;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using System.IO;
using System.Configuration;
using System.Collections;
using System.Linq.Expressions;

namespace HMS.Controllers
{
    public class PatientController : BaseController
    {
        //private IRepository<Patient> _Repository;

        public PatientController()
        {
            //_Repository = new PatientRepository();
        }


        public JsonResult GetItembyMedicalPartialName(long id,string name)
        {
            List<Item> item;
            using (ItemRepository repository = new ItemRepository())
            {
                item = repository.GetItembyMedicalPartialName(id, name).ToList();

                if (item == null)
                {
                    return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
                }

                List<Item> onlyItems = new List<Item>();
                //  patients.ForEach(corePatient => onlyPatients.Add(MapToClientObject(corePatient)));

                /*item.ForEach(c => onlyItems.Add(new Item
                {
                    Id = c.Id,
                    Name = c.Name,
                    GenericName = c.ItemCategory.Name.ToString(),
                    Code=c.Code,
                    ItemTypeId=c.ItemTypeId,
                    MedicalTypeId=c.MedicalTypeId,
                    ItemCategoryId=c.ItemCategoryId,
                    MeasurementUnitId=c.MeasurementUnitId,
                    SalePrice=c.SalePrice,
                    BuyPrice=c.BuyPrice,
                    DefaultReferrarFee=c.DefaultReferrarFee,
                    ReferralAllowed=c.ReferralAllowed,
                    ServiceProviderId=c.ServiceProviderId
                }));*/
                foreach (Item sitem in item)
                {
                    Item addItem = new Item();
                    ItemCategory icategory = new ItemCategory();
                    addItem.ItemCategory = icategory;
                    addItem.Id = sitem.Id;
                    addItem.Name = sitem.Name;
                   

                    if (sitem.ItemCategory != null)
                    {
                        ItemCategory itemCategory = new ItemCategory();
                        addItem.ItemCategory = itemCategory;
                        addItem.ItemCategory.Name = sitem.ItemCategory.Name;
                        addItem.GenericName = sitem.ItemCategory.Name;
                    }

                    addItem.Code = sitem.Code;
                    addItem.ItemTypeId = sitem.ItemTypeId;
                    addItem.MedicalTypeId = sitem.MedicalTypeId;
                    addItem.ItemCategoryId = sitem.ItemCategoryId;
                    addItem.MeasurementUnitId = sitem.MeasurementUnitId;
                    addItem.SalePrice = sitem.SalePrice;
                    addItem.BuyPrice = sitem.BuyPrice;
                    addItem.DefaultReferrarFee = sitem.DefaultReferrarFee;
                    addItem.ReferralAllowed = sitem.ReferralAllowed;
                    addItem.ServiceProviderId = sitem.ServiceProviderId;
                    onlyItems.Add(addItem);
                }

                return Json(onlyItems, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMedicalType()
        {
            List<MedicalType> medicaltype;
            using (MedicalTypeRepository repository = new MedicalTypeRepository())
            {
                medicaltype = repository.GetAll().ToList();
            }
            if (medicaltype == null)
            {
                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }

            List<MedicalType> onlyMedicalType = new List<MedicalType>();
          //  patients.ForEach(corePatient => onlyPatients.Add(MapToClientObject(corePatient)));
            medicaltype.ForEach(c => onlyMedicalType.Add(new MedicalType
            {
                Id = c.Id,
                Name =c.Name,
            
            }));

            return Json(onlyMedicalType, JsonRequestBehavior.AllowGet);
        }

        // GET: Patient/GetPatients
        public JsonResult GetPatientsByName(string name)
        {
            List<Patient> patients;
            using (PatientRepository repository = new PatientRepository())
            {
                patients = repository.GetByName(name).ToList();
            }
            if (patients == null)
            {
                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }

            List<Patient> onlyPatients = new List<Patient>();
            patients.ForEach(corePatient => onlyPatients.Add(MapToClientObject(corePatient)));

            return Json(onlyPatients, JsonRequestBehavior.AllowGet);
        }

        // GET: Patient/GetPatientById/5
        public JsonResult GetPatientById(long? id)
        {
            if (id == null)
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest), JsonRequestBehavior.AllowGet);
            }
            Patient corePatient = null;
            using (PatientRepository repository = new PatientRepository())
            {
                corePatient = repository.GetById(id.Value);
            }
            if (corePatient == null)
            {
                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }

            Patient patient = MapToClientObject(corePatient);
            var jsondata= Json(patient, JsonRequestBehavior.AllowGet);
            return jsondata;
        }

        // GET: Patient/GetPatientByPhone/phoneNumber/01833353657
        public JsonResult GetPatientByPhone(string phoneNumber)
        {
            if (string.IsNullOrEmpty(phoneNumber))
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest), JsonRequestBehavior.AllowGet);
            }
            Patient corePatient = null;
            using (PatientRepository repository = new PatientRepository())
            {
                corePatient = repository.GetByPhoneNumber(phoneNumber);
            }
            if (corePatient == null)
            {
                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }
            return Json(MapToClientObject(corePatient), JsonRequestBehavior.AllowGet);
        }

        // GET: Patient/SearchPatientByPartialName/ras
        public JsonResult SearchPatientByPartialName(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest), JsonRequestBehavior.AllowGet);
            }
            List<Patient> corePatients = null;
            using (PatientRepository repository = new PatientRepository())
            {
                corePatients = repository.GetByPartialName(name).ToList();
            }
            if (corePatients == null)
            {
                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }

            List<Patient> patients = new List<Patient>();
            corePatients.ForEach(corePatient => patients.Add(MapToClientObject(corePatient)));

            return new CustomJsonResult {Data=patients} ;
        }



        public JsonResult getdoctorbyname(string name, long typeId)
        {
            // long typid = 56; // retturn only doctor

            List<ServiceProvider> serviceProviders = null;
            List<ServiceProvidedWithReferrerFee> onlyserviceProviders = new List<ServiceProvidedWithReferrerFee>();

            using (ServiceProviderRepository repository = new ServiceProviderRepository())
            {
                serviceProviders = repository.GetServiceProviderPartialName(name, typeId).ToList();

                foreach (ServiceProvider item in serviceProviders)
                {

                    ServiceProvidedWithReferrerFee serviceProvider = new ServiceProvidedWithReferrerFee();
                    Contact contact = new Contact();
                    serviceProvider.Contact = contact;

                    serviceProvider.Contact.FirstName = item.Contact.FirstName;
                    serviceProvider.Contact.LastName = item.Contact.LastName;
                    serviceProvider.Id = item.Id;
                    serviceProvider.Speciality = item.Speciality;
                    serviceProvider.DepartmentName = item.Department.Name;

                    onlyserviceProviders.Add(serviceProvider);
                }
            }

            return Json(onlyserviceProviders, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getdoctorpartialname(string name, long typeId, long itemid)
        {
           // long typid = 56; // retturn only doctor

            List<ServiceProvider> serviceProviders = null;
            List<ServiceProvidedWithReferrerFee> onlyserviceProviders = new List<ServiceProvidedWithReferrerFee>();

            using (ServiceProviderRepository repository = new ServiceProviderRepository())
            {
                serviceProviders = repository.GetServiceProviderPartialName(name, typeId).ToList();

                foreach (ServiceProvider item in serviceProviders)
                {
                 
                    ServiceProvidedWithReferrerFee serviceProvider = new ServiceProvidedWithReferrerFee();
                    Contact contact = new Contact();
                    serviceProvider.Contact = contact;

                    serviceProvider.Contact.FirstName = item.Contact.FirstName;
                    serviceProvider.Contact.LastName = item.Contact.LastName;
                    serviceProvider.Id = item.Id;
                    serviceProvider.Speciality = item.Speciality;

                    Referral referral = new Referral();

                    using (ReferralRepository referrerrepository = new ReferralRepository())
                    {
                        referral = referrerrepository.GetReferrer(serviceProvider.Id, itemid);
                        serviceProvider.ReferralFee = referral.ReferralFee;                      
                    }

                    onlyserviceProviders.Add(serviceProvider);
                }
            }

            return Json(onlyserviceProviders, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getDoctorByID(long serviceProviderID, long typeId, long itemid)
        {
            // long typid = 56; // retturn only doctor

            ServiceProvider serviceProviders = null;
            ServiceProvidedWithReferrerFee onlyserviceProviders = new ServiceProvidedWithReferrerFee();

            using (ServiceProviderRepository repository = new ServiceProviderRepository())
            {
                    
                    serviceProviders = repository.GetById(serviceProviderID);



                    ServiceProvidedWithReferrerFee serviceProvider = new ServiceProvidedWithReferrerFee();
                    Contact contact = new Contact();
                    serviceProvider.Contact = contact;

                    serviceProvider.Contact.FirstName = serviceProviders.Contact.FirstName;
                    serviceProvider.Contact.LastName = serviceProviders.Contact.LastName;
                    serviceProvider.Id = serviceProviders.Id;
                    serviceProvider.Speciality = serviceProviders.Speciality;

                    Referral referral = new Referral();

                    using (ReferralRepository referrerrepository = new ReferralRepository())
                    {
                        referral = referrerrepository.GetReferrer(serviceProvider.Id, itemid);
                        serviceProvider.ReferralFee = referral.ReferralFee;
                    }

                    onlyserviceProviders=serviceProvider;
                
            }

            return Json(onlyserviceProviders, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetServiceProviderPartialName(string name,long itemid)
        {
            //List<ServiceProvider> serviceProviders = null;
            //List<ServiceProvider> onlyserviceProviders = new List<ServiceProvider>();
            //Contact contact = new Contact();

            //using (ServiceProviderRepository repository = new ServiceProviderRepository())
            //{
            //    serviceProviders = repository.GetServiceProviderPartialName(name,itemid).ToList();

            //    ServiceProvider serviceProvider = new ServiceProvider();
            //    serviceProvider.Contact = contact;

            //    foreach (ServiceProvider item in serviceProviders)
            //    {
            //        serviceProvider.Id = item.Id;
            //        serviceProvider.ContactId = item.ContactId;

            //        serviceProvider.Contact.FirstName = item.Contact.FirstName;
            //        serviceProvider.Contact.LastName = item.Contact.LastName;
            //        onlyserviceProviders.Add(serviceProvider);
            //    }

            //    return Json(onlyserviceProviders, JsonRequestBehavior.AllowGet);
            //    //serviceProviders.ForEach(c => onlyserviceProviders.Add(new ServiceProvider()
            //    //{
            //    //    Id = c.Id,
            //    //    Contact.FirstName = c.Contact.FirstName
            //    //}));
            //}

            List<Referral> referrals = null;
            List<Referral> onlyReferrals = new List<Referral>();

            using (ReferralRepository repository = new ReferralRepository())
            {
                referrals = repository.GetServiceProviderPartialName(name, itemid).ToList();
                
                foreach (Referral item in referrals)
                {
                    Referral referral = new Referral();
                    ServiceProvider serviceProvider = new ServiceProvider();
                    Contact contact = new Contact();
                    serviceProvider.Contact = contact;
                    referral.ServiceProvider = serviceProvider;

                    referral.Id = item.Id;
                    referral.ItemId=item.ItemId;
                    referral.ReferralFee = item.ReferralFee;
                    referral.ServiceProviderId = item.ServiceProviderId;
                    referral.ServiceProvider.Contact.FirstName = item.ServiceProvider.Contact.FirstName;
                    referral.ServiceProvider.Contact.LastName = item.ServiceProvider.Contact.LastName;
                    referral.ServiceProvider.Speciality = item.ServiceProvider.Speciality;
                    onlyReferrals.Add(referral);
                    
                }
                return Json(onlyReferrals, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult GetReferralFeeByDoctor(string doctorId)
        {
            return Json("200");
        }

        [System.Web.Mvc.HttpPost]
        public JsonResult UploadImage()
        {
            var fName = "";
            if (Request.Files.Count > 0)
            {
                HttpPostedFileBase file = Request.Files[0];
                fName = Path.Combine(_PhotoLocation, string.Format("{0}{1}", Request.Form["Id"], Path.GetExtension(file.FileName)));
                file.SaveAs(fName);
            }
            return Json(new
            {
                FileName = fName
            });
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult CreatePatientService(IList<PatientService> patientServices)
        {
            List<PatientService> PatientServiceList =new List<PatientService>();
            //if (ModelState.IsValid)
            {
                using (PatientServiceRepository repository = new PatientServiceRepository())
                {
                    
                    foreach (PatientService patientervice in patientServices)
                    {
                        PatientService PatientService = new PatientService();
                     

                        patientervice.UserId = GetLoggedinUserInfo().UserId;
                        PatientService=repository.Insert(patientervice);
                        PatientServiceList.Add(PatientService);
                    }
                    repository.Commit();
                   // repository.Insert(patientService);
                   // repository.Commit();
                   // patient = repository.GetByPhoneNumber(patient.PhoneNumber);
                }


                foreach (PatientService patientervice in PatientServiceList)
                {
                    using (ItemRepository itemRepository = new ItemRepository())
                    {

                        Item item = new Item();
                        patientervice.Item = item;

                        Item cItem = itemRepository.GetById(patientervice.ItemId);

                        patientervice.Item.Id = cItem.Id;
                        patientervice.Item.Name = cItem.Name;
                        patientervice.Item.MedicalTypeId = cItem.MedicalTypeId;
                        if (cItem.ItemCategory != null)
                        {
                            patientervice.Item.GenericName = cItem.ItemCategory.Name;

                            patientervice.Item.ItemCategory = new ItemCategory();
                            patientervice.Item.ItemCategory.Name = cItem.ItemCategory.Name;
                        }
                        patientervice.Item.ReferralAllowed = cItem.ReferralAllowed;
                    }
                    
                }
            }
            return Json(PatientServiceList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult DischagePatient(PatientAdmission patientAdmission,bool isAdmin)
        {
            patientAdmission.Patient = null;
            patientAdmission.Department = null;
            patientAdmission.Item = null;

            using (Repository<PatientAdmission> Repository = new Repository<PatientAdmission>())
            {

                if(!isAdmin)patientAdmission.UserId = GetLoggedinUserInfo().UserId;

                if (isAdmin) patientAdmission.ApprovedUserId = GetLoggedinUserInfo().UserId;
                if(patientAdmission.IsReleased) patientAdmission.Active = false;

                Repository.Update(patientAdmission);
                Repository.Commit();
            }
            if (patientAdmission.IsReleased)
            {
                using (Repository<BedOccupancy> repository = new Repository<BedOccupancy>())
                {
                    Expression<Func<BedOccupancy, bool>> lambda;

                    lambda = (x => x.Occupied == true && x.Active == true && x.AdmissioinId == patientAdmission.Id);

                    List<BedOccupancy> bedlist = new List<BedOccupancy>();
                    bedlist = repository.GetByQuery(lambda).ToList();

                    if (bedlist.Count > 0)
                    {
                        BedOccupancy bed = new BedOccupancy();
                        bed = bedlist[0];
                        bed.UserId = GetLoggedinUserInfo().UserId;
                        bed.Occupied = false;
                        bed.Active = false;
                        repository.Update(bed);
                        repository.Commit();
                    }


                }
            }
            return Json("Discharge successfull", JsonRequestBehavior.AllowGet);
        }
        
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult SaveAdmission(PatientAdmission Admission, long InititalSetupId)
        {
            PatientAdmission onlyAdmission;
            using(Repository<PatientAdmission> Repository =new Repository<PatientAdmission> ())
            {
                Admission.UserId = GetLoggedinUserInfo().UserId;
                onlyAdmission= Repository.Insert(Admission);
                Repository.Commit();
            }

            using (Repository<InitialSetupItem> Repository = new Repository<InitialSetupItem>())
            {
                Expression<Func<InitialSetupItem, bool>> lambda;
                lambda = (x => x.InitialSetupId == InititalSetupId  && x.Active == true);

                List<InitialSetupItem> onlyAdmissionItemList = Repository.GetByQuery(lambda).ToList();

                

                foreach (InitialSetupItem initalsetupitem in onlyAdmissionItemList)
                {
                    PatientService sItem =new PatientService();

                    sItem.PatientID = Admission.PatientId;
                    sItem.PatientAdmissionId = onlyAdmission.Id;
                    sItem.ItemId = initalsetupitem.ItemId;
                    sItem.ServiceActualPrice = initalsetupitem.Item.SalePrice;
                    sItem.ServiceListPrice = initalsetupitem.Item.SalePrice;
                    sItem.ServiceQuantity = 1;
                    sItem.ServiceDate = DateTime.Now;
                    sItem.Discount = 0;

                    using (Repository<PatientService> psRepository = new Repository<PatientService>())
                   {
                       psRepository.Insert(sItem);
                       psRepository.Commit();
                   }

                }
                
            }


            if (onlyAdmission == null)
            {
                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }else
            {
                return Json(onlyAdmission, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetPatientAdmissionForApproval()
        {
            PatientAdmission onlyAdmission = null;
            List<PatientAdmission> onlyAdmissionList =new List<PatientAdmission> ();
            List<PatientAdmission> outPutAdmissionList = new List<PatientAdmission>();
            using (Repository<PatientAdmission> Repository = new Repository<PatientAdmission>())
            {
                Expression<Func<PatientAdmission, bool>> lambda;
                lambda = (x =>  x.DischargeApprovalStatusId==101 && x.IsReleased == false && x.Active == true);

                onlyAdmissionList = Repository.GetByQuery(lambda).ToList();

                if (onlyAdmissionList != null)
                {
                    foreach (PatientAdmission item in onlyAdmissionList)
                    {
                        onlyAdmission = new PatientAdmission();
                        onlyAdmission.Id = item.Id;
                        onlyAdmission.PatientId = item.PatientId;
                        onlyAdmission.AdmissionDate = item.AdmissionDate;
                        onlyAdmission.ServiceProviderId = item.ServiceProviderId;
                        onlyAdmission.RefererId = item.RefererId;
                        onlyAdmission.DepartmentId = item.DepartmentId;
                        onlyAdmission.BedId = item.BedId;
                        onlyAdmission.IsReleased = item.IsReleased;
                        onlyAdmission.DischargeApprovalStatusId = item.DischargeApprovalStatusId;
                        onlyAdmission.DischargeNote = item.DischargeNote;
                        onlyAdmission.ApprovedUserId = item.ApprovedUserId;
                        onlyAdmission.Notes = item.Notes;
                        onlyAdmission.UserId = item.UserId;
                        onlyAdmission.Active = item.Active;

                        onlyAdmission.Patient = new Patient();
                        onlyAdmission.Patient.FirstName = item.Patient.FirstName;
                        onlyAdmission.Patient.LastName = item.Patient.LastName;

                        onlyAdmission.Department = new Department();

                        onlyAdmission.Department.Name = item.Department.Name;

                        if (item.Item != null)
                        {
                            onlyAdmission.Item = new Item();

                            onlyAdmission.Item.Name = item.Item.Name;
                        }

                        outPutAdmissionList.Add(onlyAdmission);



                    }
                }

            }


            return Json(outPutAdmissionList, JsonRequestBehavior.AllowGet);
          
        }

        public JsonResult GetAdmission(long PatientId)
        {
            PatientAdmission onlyAdmission=null;
            List<PatientAdmission> onlyAdmissionList;
            using (Repository<PatientAdmission> Repository = new Repository<PatientAdmission>())
            {
                Expression<Func<PatientAdmission, bool>> lambda;
                lambda=(x=>x.PatientId==PatientId && x.IsReleased==false && x.Active==true);

                onlyAdmissionList = Repository.GetByQuery(lambda).ToList();

                if (onlyAdmissionList != null)
                {
                    foreach (PatientAdmission item in onlyAdmissionList)
                    {
                        onlyAdmission = new PatientAdmission();
                        onlyAdmission.Id=item.Id;
                        onlyAdmission.PatientId = item.PatientId;
                        onlyAdmission.AdmissionDate = item.AdmissionDate;
                        onlyAdmission.ServiceProviderId = item.ServiceProviderId;
                        onlyAdmission.RefererId = item.RefererId;
                        onlyAdmission.DepartmentId = item.DepartmentId;
                        onlyAdmission.BedId = item.BedId;
                        onlyAdmission.IsReleased = item.IsReleased;
                        onlyAdmission.DischargeApprovalStatusId = item.DischargeApprovalStatusId;
                        onlyAdmission.DischargeNote = item.DischargeNote;
                        onlyAdmission.ApprovedUserId = item.ApprovedUserId;
                        onlyAdmission.Notes = item.Notes;
                        onlyAdmission.UserId = item.UserId;
                        onlyAdmission.Active = item.Active;

                       /* onlyAdmission.Patient = new Patient();
                        onlyAdmission.Patient.FirstName = item.Patient.FirstName;
                        onlyAdmission.Patient.LastName = item.Patient.LastName;

                        onlyAdmission.Department = new Department();

                        onlyAdmission.Department.Name = item.Department.Name;

                        onlyAdmission.Item = new Item();

                        onlyAdmission.Item.Name = item.Item.Name;*/

                        

                    }
                }
                
            }
            if (onlyAdmission == null)
            {

                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                
                return Json(onlyAdmission, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult CreatePatient(Patient patient)
        {
            using (PatientRepository repository = new PatientRepository())
            {
                if (Request.Files.Count > 0)
                {
                    HttpPostedFileBase file = Request.Files[0];
                    string fileName = string.Concat(Guid.NewGuid().ToString(), Path.GetExtension(file.FileName));
                    string fileNameWithPath = Path.Combine(_PhotoLocation, fileName);
                    file.SaveAs(fileNameWithPath);
                    patient.Photo = fileName;
                }
                patient.UserId = GetLoggedinUserInfo().UserId;
                repository.Insert(patient);
                repository.Commit();
                patient = repository.GetByPhoneNumber(patient.PhoneNumber);
            }
            return Json(MapToClientObject(patient), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult UpdatePatient(Patient patient)
        {
            //if (ModelState.IsValid)
            {
                using (PatientRepository repository = new PatientRepository())
                {
                    if (Request.Files.Count > 0)
                    {
                        HttpPostedFileBase file = Request.Files[0];
                        string fileName = string.Concat(Guid.NewGuid().ToString(), Path.GetExtension(file.FileName));
                        string fileNameWithPath = Path.Combine(_PhotoLocation, fileName);
                        file.SaveAs(fileNameWithPath);
                        if (patient.Photo != null)
                        {
                            System.IO.File.Delete(Path.Combine(_PhotoLocation, patient.Photo));
                        }
                        patient.Photo = fileName;
                    }
                    patient.UserId = GetLoggedinUserInfo().UserId;
                    repository.Update(patient);
                    repository.Commit();
                    patient = repository.GetByPhoneNumber(patient.PhoneNumber);
                }
            }
            return Json(MapToClientObject(patient), JsonRequestBehavior.AllowGet);
        }

        private Patient MapToClientObject(Patient corePatient)
        {
            return new Patient
            {
                Id = corePatient.Id,
                FirstName = corePatient.FirstName,
                LastName = corePatient.LastName,
                PhoneNumber = corePatient.PhoneNumber,
                Email = corePatient.Email,
                City = corePatient.City,
                Country = corePatient.Country,
                FatherName = corePatient.FatherName,
                Gender = corePatient.Gender,
                BloodGroup = corePatient.BloodGroup,
                DOB = corePatient.DOB,
                NationalId = corePatient.NationalId,
                Occupation = corePatient.Occupation,
                Photo = corePatient.Photo,
                Street = corePatient.Street,
                Zip = corePatient.Zip
            };
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                
            }
            base.Dispose(disposing);
        }
    }



    public class CustomJsonResult : JsonResult
    {
        private const string _dateFormat = "MM/dd/yyyy";

        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }

            HttpResponseBase response = context.HttpContext.Response;

            if (!String.IsNullOrEmpty(ContentType))
            {
                response.ContentType = ContentType;
            }
            else
            {
                response.ContentType = "application/json";
            }
            if (ContentEncoding != null)
            {
                response.ContentEncoding = ContentEncoding;
            }
            if (Data != null)
            {
                // Using Json.NET serializer
                var isoConvert = new IsoDateTimeConverter();
                isoConvert.DateTimeFormat = _dateFormat;
                response.Write(JsonConvert.SerializeObject(Data, isoConvert));
            }
        }
    }

}
