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

namespace HMS.Controllers
{
    public class PatientController : Controller
    {
        //private IRepository<Patient> _Repository;
        static readonly string _PhotoLocation = ConfigurationManager.AppSettings["PhotoLocation"];

        public PatientController()
        {
            //_Repository = new PatientRepository();
        }


        public JsonResult GetItembyMedicalPartialName(long id,string name)
        {
            List<Item> item;
            using (ItemRepository repository = new ItemRepository())
            {
                item = repository.GetItembyMedicalPartialName(id,name).ToList();
            }
            if (item == null)
            {
                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }

            List<Item> onlyItems = new List<Item>();
            //  patients.ForEach(corePatient => onlyPatients.Add(MapToClientObject(corePatient)));
            item.ForEach(c => onlyItems.Add(new Item
            {
                Id = c.Id,
                Name = c.Name,
                GenericName = c.GenericName,
                Code=c.Code,
                ItemTypeId=c.ItemTypeId,
                MedicalTypeId=c.MedicalTypeId,
                ItemCategoryId=c.ItemCategoryId,
                MeasurementUnitId=c.MeasurementUnitId,
                SalePrice=c.SalePrice,
                BuyPrice=c.BuyPrice,
                DefaultReferrarFee=c.DefaultReferrarFee,
                ReferralAllowed=c.ReferralAllowed
                


            }));

            return Json(onlyItems, JsonRequestBehavior.AllowGet);


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

            //if (ModelState.IsValid)
            {
                using (PatientServiceRepository repository = new PatientServiceRepository())
                {
                    foreach (PatientService patientervice in patientServices)
                    {
                        repository.Insert(patientervice);
                        
                    }
                    repository.Commit();
                   // repository.Insert(patientService);
                   // repository.Commit();
                   // patient = repository.GetByPhoneNumber(patient.PhoneNumber);
                }
            }
            return Json("200");
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult CreatePatient(Patient patient)
        {
          
            //if (ModelState.IsValid)
            {
                using (PatientRepository repository = new PatientRepository())
                {
                    repository.Insert(patient);
                    repository.Commit();
                    patient = repository.GetByPhoneNumber(patient.PhoneNumber);
                }
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
