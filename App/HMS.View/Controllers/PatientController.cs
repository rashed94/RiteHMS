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

namespace HMS.Controllers
{
    public class PatientController : Controller
    {
        //private IRepository<Patient> _Repository;

        public PatientController()
        {
            //_Repository = new PatientRepository();
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

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult CreatePatient(Patient patient, string filePath)
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
