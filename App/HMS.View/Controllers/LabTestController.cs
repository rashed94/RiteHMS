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

        public JsonResult GetLabItemsByMedicalType(long medicalTypeID)
        {
            List<Item> onlyItemsforLabTest = new List<Item>();
            List<Item> itemsforLabTest;

            using (ItemRepository repository = new ItemRepository())
            {
                Expression<Func<Item, bool>> lambda;

                lambda = (x => x.MedicalTypeId == medicalTypeID && x.Active == true);

                itemsforLabTest = repository.GetByQuery(lambda).ToList();

                foreach (Item c in itemsforLabTest)
                {
                    Item LabTestItem = new Item();
                    ItemCategory LabTestItemCategory = new ItemCategory();
                    LabTestItem.ItemCategory = LabTestItemCategory;

                    LabTestItem.Id = c.Id;
                    LabTestItem.Name = c.Name;
                    LabTestItem.GenericName = c.GenericName;
                    LabTestItem.Code=c.Code;
                    LabTestItem.ItemTypeId=c.ItemTypeId;
                    LabTestItem.MedicalTypeId=c.MedicalTypeId;
                    LabTestItem.ItemCategoryId=c.ItemCategoryId;
                    LabTestItem.MeasurementUnitId = c.MeasurementUnitId;
                    LabTestItem.SalePrice = c.SalePrice;
                    LabTestItem.BuyPrice = c.BuyPrice;
                    LabTestItem.DefaultReferrarFee = c.DefaultReferrarFee;
                    LabTestItem.ReferralAllowed = c.ReferralAllowed;
                    LabTestItem.ServiceProviderId = c.ServiceProviderId;
                    LabTestItem.LabReportGroupId = c.LabReportGroupId;
                    LabTestItem.ItemCategory.Name = c.ItemCategory.Name;
                    onlyItemsforLabTest.Add(LabTestItem);
                }

                if (onlyItemsforLabTest == null)
                {
                    return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
                }




                return Json(onlyItemsforLabTest, JsonRequestBehavior.AllowGet);

            }

            
        }
        public JsonResult GetPatientInvoicebyMedicalType(long id, long statusid, long medicalTypeID)
        {

            List<PatientInvoice> onlypatientInvoices = new List<PatientInvoice>();
            List<PatientInvoice> patientInvoices;
            List<PatientService> PatientServices;

            using (PatientInvoiceRepository repository = new PatientInvoiceRepository())
            {

                patientInvoices = repository.GetPatientInvoicebyMedicalTypeOnlyLabItem(id, statusid, medicalTypeID).ToList();

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
                   onlyPatientInvoice.LabStatusId = pinvoice.LabStatusId;
                   onlyPatientInvoice.ItemDiscount = pinvoice.ItemDiscount;
                   onlyPatientInvoice.UserId = pinvoice.UserId;
                   onlyPatientInvoice.Patient.FirstName = pinvoice.Patient.FirstName;
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
                   using (PatientServiceRepository srepository = new PatientServiceRepository())
                   {
                       PatientServices = srepository.GetServiceItemsLabtestOnlyByPatientId(pinvoice.PatientID, pinvoice.Id).ToList();
                       foreach (PatientService c in PatientServices)
                       {
                           PatientService patientstitem = new PatientService();
                           Item item = new Item();
                           ServiceProvider serviceProdier = new ServiceProvider();
                           Contact contact = new Contact();
                           serviceProdier.Contact = contact;
                           patientstitem.Item = item;
                           patientstitem.ServiceProvider = serviceProdier;


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

                           patientstitem.ServiceProviderId = c.ServiceProviderId;
                           patientstitem.ReferralFeePaid = c.ReferralFeePaid;
                           patientstitem.ReportFormatName = c.ReportFormatName;
                           patientstitem.LabStatusId = c.LabStatusId;

                           patientstitem.Item.Name = c.Item.Name;
                           patientstitem.Item.GenericName = c.Item.GenericName;
                           patientstitem.Item.ReferralAllowed = c.Item.ReferralAllowed;


                           patientstitem.ServiceProvider.Contact.FirstName = c.ServiceProvider.Contact.FirstName;
                           patientstitem.ServiceProvider.Contact.LastName = c.ServiceProvider.Contact.LastName;

             

                           onlyPatientInvoice.PatientServices.Add(patientstitem);

                       }
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