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
    public class BillingController : Controller
    {
        //private IRepository<Patient> _Repository;

        public BillingController()
        {
           // _Repository = new Repository<Patient>(new Context());
        }


        public JsonResult GetBillingIemByPatientId(long id)
        {
            List<PatientService> patientServiceItems;
            using (PatientServiceRepository repository = new PatientServiceRepository())
            {
                patientServiceItems = repository.GetServiceItemsByPatientId(id).ToList();
            }
            if (patientServiceItems == null)
            {
                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }

            List<PatientService> onlypatientServiceItems = new List<PatientService>();
            //  patients.ForEach(corePatient => onlyPatients.Add(MapToClientObject(corePatient)));
            patientServiceItems.ForEach(c => onlypatientServiceItems.Add(new PatientService
            {
                Id = c.Id,
                PatientID = c.PatientID,
                ItemID = c.ItemID,
                InvoiceID=c.InvoiceID,
                ServiceListPrice = c.ServiceListPrice,
                ServiceActualPrice = c.ServiceActualPrice,
                ServiceQuantity = c.ServiceQuantity,
                ServiceDate = c.ServiceDate,
                UserId = c.UserId,
                Discount = c.Discount,
                Refund =c.Refund,
                Billed =c.Billed,
                ReferralFee =c.ReferralFee,
                DeliveryDate =c.DeliveryDate,
                DeliveryTime =c.DeliveryTime

            }));

            return Json(onlypatientServiceItems, JsonRequestBehavior.AllowGet);




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
