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

namespace HMS.Controllers
{
    public class PatientController : Controller
    {
        private IRepository<Patient> _Repository;

        public PatientController()
        {
            _Repository = new Repository<Patient>();
        }

        // GET: Patients/GetPatients
        public JsonResult GetPatients()
        {
            List<Patient> Patients = _Repository.GetByQuery().ToList();
            if (Patients == null)
            {
                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }

            List<Patient> onlyPatients = new List<Patient>();
            //Patients.ForEach(c => onlyPatients.Add(new Patient
            //{
            //    Id = c.Id,
            //    FirstName = c.FirstName,
            //    LastName = c.LastName,
            //    PhoneNumber = c.PhoneNumber,
            //    Email = c.Email,
            //    City = c.City,
            //    Country = c.Country,
            //    Fax = c.Fax,
            //    Street = c.Street,
            //    IsCompany = c.IsCompany,
            //    Active = c.Active,
            //    Photo = c.Photo,
            //    WebSite = c.WebSite,
            //    Zip = c.Zip
            //}));

            return Json(onlyPatients, JsonRequestBehavior.AllowGet);
        }

        // GET: Patients/GetPatientById/5
        public JsonResult GetPatientById(long? id)
        {
            if (id == null)
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest), JsonRequestBehavior.AllowGet);
            }
            Patient c = _Repository.GetById(id.Value);
            if (c == null)
            {
                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }

            Patient patient = null;
            //patient = new Patient
            //{
            //    Id = c.Id,
            //    FirstName = c.FirstName,
            //    LastName = c.LastName,
            //    PhoneNumber = c.PhoneNumber,
            //    Email = c.Email,
            //    City = c.City,
            //    Country = c.Country,
            //    Fax = c.Fax,
            //    Street = c.Street,
            //    IsCompany = c.IsCompany,
            //    Active = c.Active,
            //    Photo = c.Photo,
            //    WebSite = c.WebSite,
            //    Zip = c.Zip
            //};
            return Json(patient, JsonRequestBehavior.AllowGet);
        }

        // GET: Patients/GetPatientByPhone/phoneNumber/01833353657
        public JsonResult GetPatientByPhone(string phoneNumber)
        {
            if (string.IsNullOrEmpty(phoneNumber))
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest), JsonRequestBehavior.AllowGet);
            }
            Patient patient = null;
            //Patient Patient = _Repository.GetByPhoneNumber(phoneNumber);
            if (patient == null)
            {
                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }
            return Json(patient, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult CreatePatient(Patient Patient)
        {
            if (ModelState.IsValid)
            {
                _Repository.Insert(Patient);
                //_Repository.SaveChanges();
            }
            return Json(Patient, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult UpdatePatient(Patient Patient)
        {
            if (ModelState.IsValid)
            {
                //_Repository.Entry(Patient).State = EntityState.Modified;
                //_Repository.SaveChanges();
            }
            return Json(Patient, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                //_Repository.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
