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
using System.Security.Claims;

namespace HMS.Controllers
{
    public class BillingController : Controller
    {
        //private IRepository<Patient> _Repository;

        public BillingController()
        {
           // _Repository = new Repository<Patient>(new Context());
        }

        public void CreatePatientService(long invoiceID,IList<PatientService> patientServices)
        {

          
            {
                using (PatientServiceRepository repository = new PatientServiceRepository())
                {
                    foreach (PatientService patientervice in patientServices)
                    {
                        patientervice.InvoiceID = invoiceID;
                        repository.Insert(patientervice);

                    }
                    repository.Commit();
  
                }
            }
            
        }


        
        public JsonResult SaveInvoice(PatientInvoice invoice, IList<PatientService> patientServices)
        {
            using (PatientInvoiceRepository repository = new PatientInvoiceRepository())
            {

                invoice = repository.Insert(invoice);
                repository.Commit();
                CreatePatientService(invoice.Id, patientServices);
            }

            return Json("222");
        }

        public JsonResult GetBillingIemByPatientId(long id)
        {
            List<PatientService> patientServiceItems;
            List<PatientService> onlypatientServiceItems = new List<PatientService>();


            using (PatientServiceRepository repository = new PatientServiceRepository())
            {
                patientServiceItems = repository.GetServiceItemsByPatientId(id).ToList();

                foreach (PatientService c in patientServiceItems)
                {
                    PatientService patientstitem = new PatientService();
                    Item item = new Item();
                    patientstitem.Item = item;


                    patientstitem.Id = c.Id;
                    patientstitem.PatientID = c.PatientID;
                    patientstitem.ItemID = c.ItemID;
                    patientstitem.InvoiceID = c.InvoiceID;
                    patientstitem.ServiceListPrice = c.ServiceListPrice;
                    patientstitem.ServiceActualPrice = c.ServiceActualPrice;
                    patientstitem.ServiceQuantity = c.ServiceQuantity;
                    patientstitem.ServiceDate = c.ServiceDate;
                    patientstitem.UserId = c.UserId;
                    patientstitem.Discount = c.Discount;
                    patientstitem.Refund = c.Refund;
                    patientstitem.Billed = c.Billed;
                    patientstitem.ReferralFee = c.ReferralFee;
                    patientstitem.DeliveryDate = c.DeliveryDate;
                    patientstitem.DeliveryTime = c.DeliveryTime;
                    patientstitem.Item.Name = c.Item.Name;
                    patientstitem.Item.GenericName = c.Item.GenericName;
                    patientstitem.Item.ReferralAllowed = c.Item.ReferralAllowed;
                    onlypatientServiceItems.Add(patientstitem);

                }

            }
            if (patientServiceItems == null)
            {
                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }

           
            //  patients.ForEach(corePatient => onlyPatients.Add(MapToClientObject(corePatient)));
            //patientServiceItems.ForEach(c => onlypatientServiceItems.Add(new PatientService
            //{
            //    Id = c.Id,
            //    PatientID = c.PatientID,
            //    ItemID = c.ItemID,
            //    InvoiceID=c.InvoiceID,
            //    ServiceListPrice = c.ServiceListPrice,
            //    ServiceActualPrice = c.ServiceActualPrice,
            //    ServiceQuantity = c.ServiceQuantity,
            //    ServiceDate = c.ServiceDate,
            //    UserId = c.UserId,
            //    Discount = c.Discount,
            //    Refund =c.Refund,
            //    Billed =c.Billed,
            //    ReferralFee =c.ReferralFee,
            //    DeliveryDate =c.DeliveryDate,
            //    DeliveryTime =c.DeliveryTime

            //}));


            return Json(onlypatientServiceItems, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult CreateInvoice(PatientInvoice pinvoice)
        {
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;
           // var userId = claims.Where(r => r.Type == ClaimTypes.SerialNumber).FirstOrDefault().Value;

            using (Repository<PatientInvoice> repository = new Repository<PatientInvoice>())
            {
               // patientInvoice.UserId = Convert.ToInt32(userId);
               // patientInvoice.InvoiceStatusId = 1;
                repository.Insert(pinvoice);
                repository.Commit();


               // repository.Commit();
                
            }

            //using (PatientServiceRepository repository = new PatientServiceRepository())
            //{

            //    foreach (PatientService patientervice in patientServices)
            //    {
            //        patientervice.InvoiceID = pinvoice.Id;
            //        repository.Update(patientervice);

            //    }
            //    repository.Commit();
            //}


            return Json("200");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
            }
            base.Dispose(disposing);
        }
    }
}
