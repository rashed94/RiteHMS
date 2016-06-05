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
using System.Linq.Expressions;
using System.Data.Entity;

namespace HMS.Controllers
{
    public class LabTestController : Controller
    {
        //private IRepository<Patient> _Repository;

        public LabTestController()
        {
            // _Repository = new Repository<Patient>(new Context());
        }
        public JsonResult GetPatientInvoicebyMedicalType(long id, long statusid, long medicalTypeID)
        {

            List<PatientInvoice> onlypatientInvoices = new List<PatientInvoice>();
            List<PatientInvoice> patientInvoices;

            using (PatientInvoiceRepository repository = new PatientInvoiceRepository())
            {

                patientInvoices = repository.GetPatientInvoicebyMedicalType(id, statusid, medicalTypeID).ToList();

               foreach (PatientInvoice pinvoice in patientInvoices)
               {
                   PatientInvoice onlyPatientInvoice = new PatientInvoice();
                   Patient patient = new Patient();
                   onlyPatientInvoice.Patient = patient;

                   onlyPatientInvoice.Id = pinvoice.Id;
                   onlyPatientInvoice.InvoiceDate = pinvoice.InvoiceDate;
                   onlyPatientInvoice.DueDate = pinvoice.DueDate;
                   onlyPatientInvoice.PatientID = pinvoice.PatientID;
                   onlyPatientInvoice.TotalAmount = pinvoice.TotalAmount;
                   onlyPatientInvoice.TotalDiscount = pinvoice.TotalDiscount;
                   onlyPatientInvoice.InvoiceStatusId = pinvoice.InvoiceStatusId;
                   onlyPatientInvoice.ItemDiscount = pinvoice.ItemDiscount;
                   onlyPatientInvoice.UserId = pinvoice.UserId;
                   onlyPatientInvoice.Patient.FatherName = pinvoice.Patient.FirstName;
                   onlyPatientInvoice.Patient.LastName = pinvoice.Patient.LastName;

                   foreach (InvoicePayment invoicepayment in pinvoice.InvoicePayments)
                   {
                       InvoicePayment invoicePayment = new InvoicePayment();

                       invoicePayment.Id = invoicepayment.Id;
                       invoicePayment.PatientInvoiceId = invoicepayment.PatientInvoiceId;
                       invoicePayment.Amount = invoicepayment.Amount;
                       invoicePayment.PaymentID = invoicepayment.PaymentID;
                       invoicePayment.UserId = invoicepayment.UserId;
                       onlyPatientInvoice.InvoicePayments.Add(invoicePayment);

                   }

                   foreach (PatientService c in pinvoice.PatientServices)
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
                       onlyPatientInvoice.PatientServices.Add(patientstitem);

                   }
                   onlypatientInvoices.Add(onlyPatientInvoice);



               }

               if (onlypatientInvoices == null)
               {
                   return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
               }




               return Json(onlypatientInvoices, JsonRequestBehavior.AllowGet);
               

            }
           
        }
    }
}